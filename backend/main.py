"""FastAPI Server & Real-Time SSE Bus for Autonomous Supply Chain Exception Handler (AMD ACT III)."""
from __future__ import annotations

import asyncio
import json
import os
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles

from backend.agents.rfq_agent import simulate_vendor_replies
from backend.agents.workflow import (
    ACTIVE_WORKFLOWS,
    WORKFLOW_STREAMS,
    process_human_decision,
    resolve_clarification,
    run_workflow_until_gate,
    start_disruption_workflow,
)
from backend.config import settings
from backend.core.llm import get_system_inference_telemetry
from backend.database.db import PRESET_SCENARIOS, get_connection, init_and_seed_db
from backend.schemas import (
    AuditEntry,
    CarrierWebhookInput,
    ClarificationInput,
    DisruptionSignal,
    DisruptionStatus,
    EmailSignalInput,
    HumanDecisionInput,
    SignalSource,
    WorkflowStateSnapshot,
)


async def _seed_initial_golden_workflow() -> WorkflowStateSnapshot:
    """Create and execute the Golden Scenario (Scenario 1) so the Command Center is pre-populated."""
    preset = PRESET_SCENARIOS["SCENARIO_1_STEEL_DELAY"]
    signal = DisruptionSignal(
        disruption_id="DISRUPT-SC1-GOLDEN",
        source=SignalSource.EMAIL,
        sender=preset["sender"],
        subject=preset["subject"],
        raw_text=preset["body"],
        received_at=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC"),
        po_hint=preset.get("po_hint"),
        shipped_qty_override=preset.get("shipped_qty_override"),
    )
    snapshot = WorkflowStateSnapshot(
        disruption_id=signal.disruption_id,
        status=DisruptionStatus.INGESTED,
        started_at=datetime.now(timezone.utc).isoformat(),
        elapsed_ms=0,
        signal=signal,
        thought_stream=[
            f"Disruption alert ingested from {signal.sender}: '{signal.subject}'",
        ],
        audit_log=[
            AuditEntry(
                timestamp=datetime.now(timezone.utc).isoformat(),
                actor="System Ingestion",
                action="SIGNAL_INGESTED",
                details=f"Source={signal.source.value}, Sender={signal.sender}",
            )
        ],
    )
    ACTIVE_WORKFLOWS[signal.disruption_id] = snapshot
    WORKFLOW_STREAMS.setdefault(signal.disruption_id, [])
    await run_workflow_until_gate(signal.disruption_id)
    return ACTIVE_WORKFLOWS[signal.disruption_id]


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_and_seed_db()
    await _seed_initial_golden_workflow()
    yield


app = FastAPI(
    title="Autonomous Supply Chain Exception Handler — AMD ACT III",
    description="Multi-Agent Procurement & Shift Re-Sequencing Command Center powered by AMD ROCm & Gemma-2",
    version="3.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Mount compiled Vite static assets if present
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
dist_assets_dir = os.path.join(frontend_dir, "dist", "assets")
os.makedirs(dist_assets_dir, exist_ok=True)
app.mount("/assets", StaticFiles(directory=dist_assets_dir), name="assets")


@app.get("/", response_class=HTMLResponse)
async def serve_command_center():
    """Serve the single-page React Supply Chain Command Center UI (Vite dist bundle with fallback)."""
    dist_index = os.path.join(frontend_dir, "dist", "index.html")
    if os.path.exists(dist_index):
        return FileResponse(dist_index, media_type="text/html")
    standalone_path = os.path.join(frontend_dir, "index.standalone.html")
    if os.path.exists(standalone_path):
        return FileResponse(standalone_path, media_type="text/html")
    index_path = os.path.join(frontend_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path, media_type="text/html")
    return HTMLResponse("<h1>Frontend index.html not found</h1>", status_code=404)


@app.get("/styles.css")
async def serve_styles_css():
    """Serve the dedicated design system stylesheet."""
    css_path = os.path.join(frontend_dir, "styles.css")
    if os.path.exists(css_path):
        return FileResponse(css_path, media_type="text/css")
    raise HTTPException(status_code=404, detail="styles.css not found")


@app.get("/api/system/inference")
async def get_inference_status() -> dict[str, Any]:
    """Return live AMD Instinct MI300X / ROCm / Gemma-2 inference telemetry."""
    conn = get_connection()
    try:
        return get_system_inference_telemetry(conn)
    finally:
        conn.close()


@app.get("/api/erp/snapshot")
async def get_erp_snapshot() -> dict[str, Any]:
    """Return current ERP materials, open POs, production orders, shifts, presets, and AMD telemetry."""
    conn = get_connection()
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM materials ORDER BY id")
        materials = [dict(r) for r in cur.fetchall()]

        cur.execute("SELECT * FROM purchase_orders ORDER BY id")
        purchase_orders = [dict(r) for r in cur.fetchall()]

        cur.execute("SELECT * FROM production_orders ORDER BY scheduled_start_day")
        production_orders = [dict(r) for r in cur.fetchall()]

        cur.execute("SELECT * FROM suppliers WHERE is_backup_approved = 1 ORDER BY reliability_score DESC")
        backup_suppliers = [dict(r) for r in cur.fetchall()]

        cur.execute("SELECT * FROM outbox_emails ORDER BY id DESC LIMIT 20")
        outbox = [dict(r) for r in cur.fetchall()]

        telemetry = get_system_inference_telemetry(conn)

        return {
            "materials": materials,
            "purchase_orders": purchase_orders,
            "production_orders": production_orders,
            "backup_suppliers": backup_suppliers,
            "outbox_emails": outbox,
            "presets": list(PRESET_SCENARIOS.values()),
            "amd_telemetry": telemetry,
        }
    finally:
        conn.close()


@app.post("/api/signals/email", response_model=WorkflowStateSnapshot)
async def trigger_email_disruption(payload: EmailSignalInput) -> WorkflowStateSnapshot:
    """Ingest a preset disruption scenario or custom supplier email and execute the multi-agent pipeline."""
    if payload.scenario_id and payload.scenario_id in PRESET_SCENARIOS:
        preset = PRESET_SCENARIOS[payload.scenario_id]
        source = SignalSource(preset.get("source", "EMAIL"))
        sender = preset["sender"]
        subject = preset["subject"]
        raw_text = preset["body"]
        po_hint = preset.get("po_hint")
        shipped_qty_override = preset.get("shipped_qty_override")
    else:
        source = SignalSource.EMAIL
        sender = payload.sender
        subject = payload.subject
        raw_text = payload.body
        po_hint = None
        shipped_qty_override = None

    disruption_id = f"DISRUPT-{uuid.uuid4().hex[:6].upper()}"
    signal = DisruptionSignal(
        disruption_id=disruption_id,
        source=source,
        sender=sender,
        subject=subject,
        raw_text=raw_text,
        received_at=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC"),
        po_hint=po_hint,
        shipped_qty_override=shipped_qty_override,
    )

    snapshot = WorkflowStateSnapshot(
        disruption_id=disruption_id,
        status=DisruptionStatus.INGESTED,
        started_at=datetime.now(timezone.utc).isoformat(),
        elapsed_ms=0,
        signal=signal,
        thought_stream=[
            f"Disruption alert ingested from {signal.sender}: '{signal.subject}'",
        ],
        audit_log=[
            AuditEntry(
                timestamp=datetime.now(timezone.utc).isoformat(),
                actor="System Ingestion",
                action="SIGNAL_INGESTED",
                details=f"Source={signal.source.value}, Sender={signal.sender}",
            )
        ],
    )
    ACTIVE_WORKFLOWS[disruption_id] = snapshot
    WORKFLOW_STREAMS.setdefault(disruption_id, [])

    await run_workflow_until_gate(disruption_id)
    return ACTIVE_WORKFLOWS[disruption_id]


@app.post("/api/signals/carrier", response_model=WorkflowStateSnapshot)
async def trigger_carrier_webhook(payload: CarrierWebhookInput) -> WorkflowStateSnapshot:
    """Ingest a structured carrier/port webhook event and execute the multi-agent pipeline."""
    disruption_id = f"DISRUPT-CAR-{uuid.uuid4().hex[:6].upper()}"
    delay_str = f"delayed by {payload.new_eta_offset_days} days" if payload.new_eta_offset_days else "on schedule"
    qty_str = f"with verified quantity {payload.shipped_qty} tons" if payload.shipped_qty is not None else ""
    body = (
        f"CARRIER WEBHOOK EVENT: Container {payload.container_id} for {payload.po_id} "
        f"reported {payload.reason}: {delay_str} {qty_str}."
    )
    signal = DisruptionSignal(
        disruption_id=disruption_id,
        source=SignalSource.CARRIER_WEBHOOK,
        sender="webhook@carrier-telematics.io",
        subject=f"Carrier Alert: {payload.container_id} ({payload.po_id})",
        raw_text=body,
        received_at=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC"),
        po_hint=payload.po_id,
        shipped_qty_override=payload.shipped_qty,
    )
    snapshot = WorkflowStateSnapshot(
        disruption_id=disruption_id,
        status=DisruptionStatus.INGESTED,
        started_at=datetime.now(timezone.utc).isoformat(),
        elapsed_ms=0,
        signal=signal,
        thought_stream=[f"Carrier webhook ingested for {payload.po_id} ({payload.container_id})"],
        audit_log=[
            AuditEntry(
                timestamp=datetime.now(timezone.utc).isoformat(),
                actor="Carrier Webhook",
                action="WEBHOOK_RECEIVED",
                details=body,
            )
        ],
    )
    ACTIVE_WORKFLOWS[disruption_id] = snapshot
    WORKFLOW_STREAMS.setdefault(disruption_id, [])
    await run_workflow_until_gate(disruption_id)
    return ACTIVE_WORKFLOWS[disruption_id]


@app.get("/api/disruptions/{disruption_id}", response_model=WorkflowStateSnapshot)
async def get_disruption_snapshot(disruption_id: str) -> WorkflowStateSnapshot:
    """Return full workflow snapshot for a given disruption ID."""
    snapshot = ACTIVE_WORKFLOWS.get(disruption_id)
    if not snapshot:
        raise HTTPException(status_code=404, detail=f"Disruption {disruption_id} not found")
    return snapshot


@app.get("/api/disruptions/{disruption_id}/stream")
async def stream_disruption_events(disruption_id: str):
    """Stream real-time Server-Sent Events (SSE) for the specified disruption."""
    if disruption_id not in ACTIVE_WORKFLOWS:
        raise HTTPException(status_code=404, detail=f"Disruption {disruption_id} not found")

    queue: asyncio.Queue = asyncio.Queue(maxsize=100)
    WORKFLOW_STREAMS.setdefault(disruption_id, []).append(queue)

    async def event_generator():
        try:
            # Immediately push the current full snapshot so the UI is synchronized
            current = ACTIVE_WORKFLOWS.get(disruption_id)
            if current:
                yield f"data: {json.dumps(current.model_dump())}\n\n"

            while True:
                try:
                    evt = await asyncio.wait_for(queue.get(), timeout=15.0)
                    snap = ACTIVE_WORKFLOWS.get(disruption_id)
                    if snap:
                        yield f"data: {json.dumps(snap.model_dump())}\n\n"
                    if snap and snap.status in (
                        DisruptionStatus.AWAITING_APPROVAL,
                        DisruptionStatus.AWAITING_CLARIFICATION,
                        DisruptionStatus.MITIGATED,
                        DisruptionStatus.REJECTED,
                        DisruptionStatus.MONITOR_ONLY,
                    ):
                        break
                except asyncio.TimeoutError:
                    yield ": keep-alive\n\n"
        finally:
            if queue in WORKFLOW_STREAMS.get(disruption_id, []):
                WORKFLOW_STREAMS[disruption_id].remove(queue)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "Connection": "keep-alive"},
    )


@app.post("/api/disruptions/{disruption_id}/clarify", response_model=WorkflowStateSnapshot)
async def clarify_ambiguous_po(
    disruption_id: str, payload: ClarificationInput
) -> WorkflowStateSnapshot:
    """Resolve an ambiguous supplier email by binding the human-selected PO and resuming the workflow."""
    if disruption_id not in ACTIVE_WORKFLOWS:
        raise HTTPException(status_code=404, detail=f"Disruption {disruption_id} not found")
    await resolve_clarification(disruption_id, payload.selected_po_id)
    # Wait briefly for resumed background task to reach the approval gate
    for _ in range(50):
        snap = ACTIVE_WORKFLOWS[disruption_id]
        if snap.status in (
            DisruptionStatus.AWAITING_APPROVAL,
            DisruptionStatus.MONITOR_ONLY,
            DisruptionStatus.MITIGATED,
        ):
            break
        await asyncio.sleep(0.05)
    return ACTIVE_WORKFLOWS[disruption_id]


@app.post("/api/disruptions/{disruption_id}/decision", response_model=WorkflowStateSnapshot)
async def submit_human_decision(
    disruption_id: str, payload: HumanDecisionInput
) -> WorkflowStateSnapshot:
    """Process human operator approval, revision request, or rejection at the HITL gate."""
    if disruption_id not in ACTIVE_WORKFLOWS:
        raise HTTPException(status_code=404, detail=f"Disruption {disruption_id} not found")
    return await process_human_decision(disruption_id, payload)


@app.post("/api/disruptions/{disruption_id}/simulate-replies", response_model=WorkflowStateSnapshot)
async def simulate_replies_endpoint(disruption_id: str) -> WorkflowStateSnapshot:
    """Simulate incoming B2B supplier responses (confirmation & counter-offers) to dispatched RFQs."""
    snapshot = ACTIVE_WORKFLOWS.get(disruption_id)
    if not snapshot:
        raise HTTPException(status_code=404, detail=f"Disruption {disruption_id} not found")
    replies = simulate_vendor_replies(snapshot.rfq_drafts)
    snapshot.supplier_replies = replies
    snapshot.audit_log.append(
        AuditEntry(
            timestamp=datetime.now(timezone.utc).isoformat(),
            actor="Supplier Portal Simulator",
            action="VENDOR_REPLIES_RECEIVED",
            details=f"Received {len(replies)} vendor responses (Kessler confirmed 72t @ $895/t arriving D+8).",
        )
    )
    return snapshot


@app.post("/api/rfq/dispatch-and-reply")
async def dispatch_rfq_and_generate_replies(payload: dict[str, Any]) -> dict[str, Any]:
    """Dispatch RFQ emails, call live AMD LLM for quotation analysis & telemetry, and return vendor replies."""
    from backend.core.llm import call_amd_llm

    rfq_id = payload.get("rfq_id", "ALL_BACKUPS")
    target_supplier = payload.get("supplier_name", "MetroSteel Industries")
    plant_location = "Laguna & Cebu Stamping"

    conn = get_connection()
    try:
        cur = conn.cursor()
        now_iso = datetime.now(timezone.utc).isoformat()

        # Prompt AMD LLM for B2B quotation analysis note
        user_prompt = (
            f"You are the Strategic Sourcing AI for {plant_location}. "
            f"Generate a 2-sentence formal supplier quote confirmation note for {target_supplier} "
            f"confirming their stock availability, quoted price per kg (PHP), and guaranteed delivery lead time."
        )

        def fallback_note() -> str:
            return (
                f"Quotation confirmed by {target_supplier} commercial desk. "
                f"Warehouse stock is locked and transport scheduled for {plant_location}."
            )

        llm_note, metric = await call_amd_llm(
            prompt=user_prompt,
            agent_name="SourcingAgent",
            deterministic_fallback=fallback_note,
            conn=conn,
        )
        ai_note = str(llm_note).strip().replace("```", "")

        # Record outbox emails in SQLite
        cur.execute(
            """
            INSERT INTO outbox_emails (
                disruption_id, supplier_id, supplier_name, recipient_email,
                subject, body, requested_qty_tons, target_unit_price, status, sent_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                "DISRUPT-LAGUNA-2026",
                "SUP-METRO" if rfq_id not in ("RFQ-IRON", "RFQ-FAST") else ("SUP-IRON" if rfq_id == "RFQ-IRON" else "SUP-FAST"),
                target_supplier,
                "commercial-desk@supplier.com.ph",
                f"URGENT RFQ — Stock & Price Confirmation [{rfq_id}]",
                f"Dispatched from {plant_location}. AI Note: {ai_note}",
                5.0,
                65.0,
                "DELIVERED",
                now_iso,
            ),
        )
        conn.commit()

        # Build supplier replies
        standard_replies = {
            "RFQ-METRO": {
                "supplierId": "SUP-METRO",
                "supplierName": "MetroSteel Industries",
                "location": "Manila, Philippines",
                "stockConfirmed": "5,000 kg in stock (Manila warehouse)",
                "quotedPrice": "₱68/kg (₱340,000 total)",
                "promisedDelivery": "5 days (Guaranteed Oct 26)",
                "replySubject": "RE: URGENT RFQ — MetroSteel Stock Confirmed (5,000 kg @ ₱68/kg)",
                "note": "We confirm 5,000 kg of ASTM A1008 2.0mm Steel Coil in our Manila warehouse ready for immediate slitting at ₱68/kg (DDP Laguna Stamping). Dedicated direct trucking ready.",
                "aiNote": ai_note,
            },
            "RFQ-IRON": {
                "supplierId": "SUP-IRON",
                "supplierName": "IronWorks Supply",
                "location": "Cebu, Philippines",
                "stockConfirmed": "8,000 kg in stock (Cebu depot)",
                "quotedPrice": "₱64/kg (₱512,000 total)",
                "promisedDelivery": "8 days (Oct 29)",
                "replySubject": "RE: RFQ Inquiry — IronWorks Supply Stock Quotation (8,000 kg)",
                "note": "We confirm 8,000 kg available in our Cebu depot at ₱64/kg; earliest RoRo vessel arrival to Luzon dock is 8 calendar days.",
                "aiNote": ai_note,
            },
            "RFQ-FAST": {
                "supplierId": "SUP-FAST",
                "supplierName": "FastMetals Co.",
                "location": "Davao, Philippines",
                "stockConfirmed": "10,000 kg in stock (Davao warehouse)",
                "quotedPrice": "₱61/kg (₱305,000 for 5,000 kg)",
                "promisedDelivery": "11 days (Nov 1)",
                "replySubject": "RE: Commercial Quotation — FastMetals Davao Depot Stock",
                "note": "We hold 10,000 kg in Davao at ₱61/kg; container coastal sea freight lead time to Laguna dock is 11 calendar days.",
                "aiNote": ai_note,
            },
        }

        telemetry = get_system_inference_telemetry(conn)

        return {
            "success": True,
            "dispatched_rfq_id": rfq_id,
            "plant": plant_location,
            "replies": standard_replies,
            "amd_telemetry": telemetry,
            "latest_inference_metric": metric.model_dump(),
        }
    finally:
        conn.close()


@app.post("/api/demo/reset", response_model=WorkflowStateSnapshot)
async def reset_demo_state() -> WorkflowStateSnapshot:
    """Reset the SQLite ERP database to clean seed state and re-initialize the Golden Scenario."""
    ACTIVE_WORKFLOWS.clear()
    WORKFLOW_STREAMS.clear()
    init_and_seed_db()
    return await _seed_initial_golden_workflow()

