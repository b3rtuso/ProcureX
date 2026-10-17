"""Strategic Sourcing and RFQ Negotiation Agent.

Generates tailored, high-precision B2B negotiation RFQ emails concurrently using AMD Token Factory
(Gemma 2 27B / vLLM) with deterministic fallback, validates industrial spec accuracy,
and simulates realistic supplier response loops.
"""
from __future__ import annotations

import asyncio
import logging
import sqlite3
from typing import Optional

from backend.core.llm import call_amd_llm
from backend.database.db import day_label
from backend.schemas import (
    ErpContext,
    InferenceMetric,
    RankedSupplier,
    RfqDraft,
    SupplierReplySimulation,
)

logger = logging.getLogger("backend.agents.rfq")


def validate_rfq_draft(draft: RfqDraft, erp_context: ErpContext) -> tuple[bool, list[str]]:
    """Verify that material spec, disrupted PO reference, quantities, and dates appear in the email."""
    notes: list[str] = []
    passed = True
    body_and_subj = f"{draft.subject}\n{draft.body}"

    mat_spec = erp_context.material.spec
    mat_name = erp_context.material.name
    po_id = erp_context.po.id

    # 1. Material Spec Verification
    spec_found = False
    if mat_spec:
        for chunk in [mat_spec] + mat_spec.split("/"):
            if chunk.strip() and chunk.strip() in body_and_subj:
                spec_found = True
                break
    if not spec_found and (mat_name in body_and_subj or "ASTM" in body_and_subj or "PA66" in body_and_subj or "ISO" in body_and_subj):
        spec_found = True

    if spec_found:
        notes.append(f"Material specification verified: '{mat_spec}'")
    else:
        notes.append(f"WARNING: Material specification '{mat_spec}' not found in draft")
        passed = False

    # 2. PO Reference Check
    if po_id in body_and_subj:
        notes.append(f"Disrupted PO reference verified: '{po_id}'")
    else:
        notes.append(f"WARNING: PO reference '{po_id}' missing from email text")
        passed = False

    # 3. Numeric Quantity Check
    qty_float_str = f"{draft.requested_qty_tons:.1f}"
    qty_int_str = f"{int(draft.requested_qty_tons)}"
    if qty_float_str in body_and_subj or qty_int_str in body_and_subj or f"{draft.requested_qty_tons}" in body_and_subj:
        notes.append(f"Bridge quantity verified: {draft.requested_qty_tons:.1f} {erp_context.material.uom}")
    else:
        notes.append(f"WARNING: Quantity {draft.requested_qty_tons} {erp_context.material.uom} not explicitly detected")
        passed = False

    # 4. Target Delivery Window Check
    day_str = f"D+{draft.requested_arrival_day}"
    if day_str in body_and_subj or draft.requested_date_label in body_and_subj or str(draft.requested_arrival_day) in body_and_subj:
        notes.append(f"Delivery window verified: {day_str} ({draft.requested_date_label})")
    else:
        notes.append(f"WARNING: Target delivery window '{day_str}' not explicitly detected")
        passed = False

    return passed, notes


def _generate_deterministic_rfq(
    supplier: RankedSupplier,
    erp_context: ErpContext,
    bridge_qty_tons: float,
    need_by_day: int,
    archetype_index: int,
    buyer_feedback: Optional[str] = None,
) -> RfqDraft:
    """Generate high-impact, realistic B2B procurement email drafts deterministically."""
    mat = erp_context.material
    po = erp_context.po

    feedback_block = ""
    if buyer_feedback and buyer_feedback.strip():
        feedback_block = (
            f"\n\n[BUYER EXECUTIVE INSTRUCTION INCORPORATED]:\n"
            f"\"{buyer_feedback.strip()}\"\n"
            f"(Draft updated to strictly reflect this mandate)\n"
        )

    # Option A: Fastest Service Center (e.g. Helix)
    if archetype_index == 0 or "Fastest" in supplier.archetype_label:
        requested_qty = min(bridge_qty_tons, supplier.weekly_capacity_tons)
        target_day = 3
        date_lbl = day_label(target_day)
        target_price = supplier.unit_price
        subject = f"URGENT: Emergency Bridge Allocation — {mat.name} (Ref: {po.id})"
        strategy_tag = "EMERGENCY_SLITTING_HOT_SHOT"

        body = (
            f"Dear {supplier.name} Sales & Logistics Desk,\n\n"
            f"Due to an upstream port congestion delay on our primary vessel shipment ({po.id}), our Brescia "
            f"automotive stamping plant faces an immediate material stockout risk.\n\n"
            f"We urgently request to reserve an expedited bridge allocation of {requested_qty:.1f} metric tons of "
            f"{mat.name} (Specification: {mat.spec}).\n\n"
            f"Operational Delivery Requirements:\n"
            f"• Required Delivery Window: Dock arrival no later than {date_lbl} (D+{target_day})\n"
            f"• Target Quantity: {requested_qty:.1f} tons (immediate coil slitting & dedicated transport)\n"
            f"• Target Purchase Rate: ${target_price:.2f}/ton (pre-approved backup contract rate)\n"
            f"• Logistics: Hot-shot direct flatbed truck dispatch directly from your service center floor\n\n"
            f"Please confirm immediate slitting slot availability and dispatch readiness within 2 hours. "
            f"Upon confirmation, our ERP system will automatically release Emergency PO-{po.id}-BRG.\n"
            f"{feedback_block}\n"
            f"Best regards,\n"
            f"Materials Procurement Team — Automotive Stamping Division"
        )

    # Option B: Balanced Regional Mill - Recommended (e.g. Kessler)
    elif archetype_index == 1 or "Balanced" in supplier.archetype_label or "Recommended" in supplier.archetype_label:
        requested_qty = bridge_qty_tons
        target_day = max(supplier.arrival_day, need_by_day - 2) if need_by_day > 2 else 8
        date_lbl = day_label(target_day)
        target_price = 895.0 if supplier.unit_price > 895.0 else supplier.unit_price
        subject = f"STRATEGIC RFQ: Fast-Track Bridge Volume Allocation — {mat.name} (Ref: {po.id})"
        strategy_tag = "Q4_MSA_VOLUME_LEVERAGE"

        body = (
            f"Dear {supplier.name} Commercial Team,\n\n"
            f"In connection with our ongoing Master Supply Agreement and upcoming Q4 volume allocation planning, "
            f"we are seeking to fast-track an urgent production bridge lot of {requested_qty:.1f} metric tons of "
            f"{mat.name} (Specification: {mat.spec}) to mitigate a vessel delay on {po.id}.\n\n"
            f"Terms & Partnership Proposal:\n"
            f"• Total Bridge Volume: {requested_qty:.1f} metric tons (single consolidated production batch)\n"
            f"• Guaranteed Plant Arrival: {date_lbl} (D+{target_day}) at our Brescia central receiving siding\n"
            f"• Target Commercial Rate: ${target_price:.2f}/ton\n"
            f"• Strategic Consideration: In exchange for waiving expedited spot surcharges and committing to the "
            f"{date_lbl} window, our purchasing executive committee is prepared to prioritize your facility for "
            f"our upcoming Q4 annual supply extension (estimated 2,400 tons).\n\n"
            f"Please verify warehouse stock reservation and rail siding dispatch schedule at your earliest convenience.\n"
            f"{feedback_block}\n"
            f"Sincerely,\n"
            f"Strategic Sourcing Directorate — Automotive Stamping Division"
        )

    # Option C: Cost-Optimized Split-Lot Trader (e.g. Pacific)
    else:
        requested_qty = bridge_qty_tons
        target_day = max(supplier.arrival_day, need_by_day)
        date_lbl = day_label(target_day)
        target_price = supplier.unit_price
        subject = f"COMMERCIAL RFQ: Split-Delivery Inquiry — {mat.name} (Ref: {po.id})"
        strategy_tag = "SPLIT_LOT_TARGET_PRICE"

        body = (
            f"Dear {supplier.name} Trading Desk,\n\n"
            f"We are soliciting firm pricing and dispatch schedules for a total requirement of {requested_qty:.1f} "
            f"metric tons of {mat.name} (Specification: {mat.spec}) as a mitigation bridge for shipment {po.id}.\n\n"
            f"Commercial Framework:\n"
            f"• Total Lot Volume: {requested_qty:.1f} metric tons\n"
            f"• Target Price Ceiling: ${target_price:.2f}/ton (firm primary contract parity)\n"
            f"• Proposed Logistics Schedule: We welcome a two-tranche split delivery (Tranche 1 by D+10, Tranche 2 by {date_lbl}) "
            f"to optimize barge freight logistics and minimize spot handling fees.\n\n"
            f"Kindly provide your best binding offer and delivery schedule breakdown.\n"
            f"{feedback_block}\n"
            f"Kind regards,\n"
            f"Raw Materials Purchasing Desk"
        )

    draft = RfqDraft(
        supplier_id=supplier.supplier_id,
        supplier_name=supplier.name,
        archetype_label=supplier.archetype_label,
        recipient_email=supplier.contact_email,
        subject=subject,
        body=body,
        strategy_tag=strategy_tag,
        requested_qty_tons=requested_qty,
        requested_arrival_day=target_day,
        requested_date_label=date_lbl,
        target_unit_price=target_price,
    )

    passed, notes = validate_rfq_draft(draft, erp_context)
    draft.validation_passed = passed
    draft.validation_notes = notes
    return draft


async def _draft_single_rfq(
    supplier: RankedSupplier,
    erp_context: ErpContext,
    bridge_qty_tons: float,
    need_by_day: int,
    archetype_index: int,
    buyer_feedback: Optional[str] = None,
    conn: Optional[sqlite3.Connection] = None,
) -> tuple[RfqDraft, InferenceMetric]:
    """Draft and validate an RFQ email for a single supplier using AMD LLM."""
    mat = erp_context.material
    po = erp_context.po

    system_prompt = (
        "You are the AMD Strategic Procurement Negotiation Agent. Write a concise 2-sentence "
        "executive commercial negotiation note for a backup supplier RFQ email."
    )

    feedback_instruction = ""
    if buyer_feedback and buyer_feedback.strip():
        feedback_instruction = f"\nBUYER REVISION MANDATE: {buyer_feedback}\n"

    user_prompt = (
        f"Supplier: {supplier.name} ({supplier.archetype_label})\n"
        f"Material: {mat.name} (Spec: {mat.spec})\n"
        f"Disrupted PO: {po.id}, Bridge Quantity: {bridge_qty_tons} tons by D+{need_by_day}.{feedback_instruction}\n"
        f"Write a 2-sentence commercial negotiation closing note:"
    )

    def fallback() -> RfqDraft:
        return _generate_deterministic_rfq(
            supplier, erp_context, bridge_qty_tons, need_by_day, archetype_index, buyer_feedback
        )

    draft = fallback()
    from backend.core.llm import create_deterministic_metric, record_inference_metric

    # Call live AMD Token Factory for the primary supplier to avoid concurrent rate-limit throttling
    if archetype_index == 0:
        try:
            llm_text, metric = await call_amd_llm(
                prompt=user_prompt,
                system_instruction=system_prompt,
                agent_name="SourcingAgent",
                deterministic_fallback=fallback,
                conn=conn,
            )
            if isinstance(llm_text, str) and len(llm_text.strip()) > 15:
                clean_note = llm_text.strip().replace("```", "")
                draft.body = f"{draft.body}\n\n[AMD Gemma-4-31B-IT Live Negotiation Note]:\n{clean_note}"
        except Exception as exc:
            logger.warning("LLM call failed for supplier %s, using fallback: %s", supplier.name, exc)
            metric = create_deterministic_metric(agent_name="SourcingAgent")
            record_inference_metric(metric, conn=conn)
    else:
        metric = create_deterministic_metric(agent_name="SourcingAgent")
        record_inference_metric(metric, conn=conn)

    # Validate the resulting draft against ERP context
    passed, notes = validate_rfq_draft(draft, erp_context)
    draft.validation_passed = passed
    draft.validation_notes = notes

    return draft, metric


async def draft_and_validate_rfqs(
    ranked_suppliers: list[RankedSupplier],
    erp_context: ErpContext,
    bridge_qty_tons: float,
    need_by_day: int,
    buyer_feedback: Optional[str] = None,
    conn: Optional[sqlite3.Connection] = None,
) -> tuple[list[RfqDraft], list[InferenceMetric]]:
    """Generate 3 tailored B2B negotiation RFQ emails concurrently using asyncio.gather."""
    tasks = []
    # Up to 3 suppliers corresponding to Option A, Option B, Option C
    for idx, supplier in enumerate(ranked_suppliers[:3]):
        tasks.append(
            _draft_single_rfq(
                supplier=supplier,
                erp_context=erp_context,
                bridge_qty_tons=bridge_qty_tons,
                need_by_day=need_by_day,
                archetype_index=idx,
                buyer_feedback=buyer_feedback,
                conn=conn,
            )
        )

    results = await asyncio.gather(*tasks)
    drafts = [r[0] for r in results]
    metrics = [r[1] for r in results]
    return drafts, metrics


def simulate_vendor_replies(
    rfq_drafts: list[RfqDraft],
) -> list[SupplierReplySimulation]:
    """Generate realistic supplier responses (confirmations, counter-offers, partials)."""
    replies: list[SupplierReplySimulation] = []

    for draft in rfq_drafts:
        s_id = draft.supplier_id
        s_name = draft.supplier_name
        qty = draft.requested_qty_tons
        target_day = draft.requested_arrival_day

        # Kessler Regional Mill (Recommended Option B)
        if "KESSLER" in s_id or "Kessler" in s_name:
            replies.append(
                SupplierReplySimulation(
                    supplier_id=s_id,
                    supplier_name=s_name,
                    status="CONFIRMED",
                    confirmed_qty_tons=qty,
                    offered_unit_price=895.0,
                    promised_arrival_day=target_day,
                    reply_subject=f"RE: {draft.subject} [CONFIRMED & RESERVED]",
                    reply_body=(
                        f"Dear Purchasing Directorate (Brescia Stamping Plant),\n\n"
                        f"We officially accept your emergency bridge allocation request under our Master Supply Agreement. "
                        f"We have reserved {qty:.1f} metric tons of ASTM A1008 Cold-Rolled Steel Coil from our Linz staging stock.\n\n"
                        f"In consideration of the Q4 annual volume commitment, our commercial executive has approved waiving "
                        f"the expedited slitting surcharge and locking your unit rate at $895.00/ton. "
                        f"Guaranteed delivery to your Brescia rail siding is confirmed for D+{target_day}.\n\n"
                        f"Rail Cargo Austria siding wagon numbers will be transmitted upon train departure.\n\n"
                        f"Warm regards,\nErnst Wallner\nSenior Sales Director, Kessler Regional Mill"
                    ),
                )
            )

        # Helix Steel Service Center (Fastest Option A)
        elif "HELIX" in s_id or "Helix" in s_name:
            replies.append(
                SupplierReplySimulation(
                    supplier_id=s_id,
                    supplier_name=s_name,
                    status="PARTIAL_CAPACITY",
                    confirmed_qty_tons=min(qty, 40.0),
                    offered_unit_price=1010.0,
                    promised_arrival_day=3,
                    reply_subject=f"RE: {draft.subject} [EXPEDITED LOT CONFIRMED]",
                    reply_body=(
                        f"Hello Purchasing Team,\n\n"
                        f"We can confirm immediate warehouse availability of 40.0 metric tons from our Brescia service center floor. "
                        f"Our coil slitting line is booked for first shift tomorrow, and dedicated direct flatbed transport "
                        f"will deliver to your stamping plant dock by D+3 (14:00 CET).\n\n"
                        f"Expedited spot rate is confirmed at $1,010.00/t + local freight ($1,200). "
                        f"Awaiting PO release to begin slitting.\n\n"
                        f"Regards,\nMatteo Rossi\nOperations Manager, Helix Steel Service Center"
                    ),
                )
            )

        # Pacific Coil Traders (Cheapest / Split Option C)
        elif "PACIFIC" in s_id or "Pacific" in s_name:
            replies.append(
                SupplierReplySimulation(
                    supplier_id=s_id,
                    supplier_name=s_name,
                    status="COUNTER_OFFER",
                    confirmed_qty_tons=qty,
                    offered_unit_price=860.0,
                    promised_arrival_day=12,
                    reply_subject=f"RE: {draft.subject} [SPLIT DELIVERY COUNTER-PROPOSAL]",
                    reply_body=(
                        f"Dear Team,\n\n"
                        f"We are pleased to honor your target price ceiling of $860.00/ton for the full {qty:.1f} tons. "
                        f"However, due to current Po river barge transit schedules from Trieste, we cannot deliver in a single lot. "
                        f"We propose a two-tranche split: 36.0 tons arriving D+10, and the remaining 36.0 tons arriving D+12.\n\n"
                        f"Please confirm if this split schedule meets your press requirements.\n\n"
                        f"Sincerely,\nElena Conti\nTrading Desk, Pacific Coil Traders"
                    ),
                )
            )

        # Polymer / Resin / Fastener Backups
        elif "POLYFAST" in s_id or "Lombardia" in s_name:
            replies.append(
                SupplierReplySimulation(
                    supplier_id=s_id,
                    supplier_name=s_name,
                    status="CONFIRMED",
                    confirmed_qty_tons=qty,
                    offered_unit_price=2350.0,
                    promised_arrival_day=2,
                    reply_subject=f"RE: {draft.subject} [EXPEDITED ALLOCATION CONFIRMED]",
                    reply_body=f"Confirmed {qty:.1f}t PA66 resin dispatch from Milan for D+2 delivery.",
                )
            )
        elif "ALPINE" in s_id or "Alpine" in s_name:
            replies.append(
                SupplierReplySimulation(
                    supplier_id=s_id,
                    supplier_name=s_name,
                    status="CONFIRMED",
                    confirmed_qty_tons=qty,
                    offered_unit_price=2210.0,
                    promised_arrival_day=5,
                    reply_subject=f"RE: {draft.subject} [MSA LOT CONFIRMED]",
                    reply_body=f"Confirmed {qty:.1f}t PA66 resin batch from Basel arriving D+5.",
                )
            )
        else:
            # Generic fallback supplier reply
            replies.append(
                SupplierReplySimulation(
                    supplier_id=s_id,
                    supplier_name=s_name,
                    status="CONFIRMED",
                    confirmed_qty_tons=qty,
                    offered_unit_price=draft.target_unit_price,
                    promised_arrival_day=target_day,
                    reply_subject=f"RE: {draft.subject} [ORDER ACKNOWLEDGED]",
                    reply_body=f"We acknowledge receipt of RFQ for {qty:.1f} tons and confirm delivery window D+{target_day}.",
                )
            )

    return replies
