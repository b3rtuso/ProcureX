"""Shared Pydantic v2 schemas for ERP entities, deterministic engines, multi-agent state, and API."""
from __future__ import annotations
from datetime import date
from enum import Enum
from typing import Any, Literal, Optional
from pydantic import BaseModel, Field


class RootCauseCategory(str, Enum):
    PORT_CONGESTION = "PORT_CONGESTION"
    CUSTOMS_HOLD = "CUSTOMS_HOLD"
    MACHINE_BREAKDOWN = "MACHINE_BREAKDOWN"
    RAW_MATERIAL_SHORTAGE = "RAW_MATERIAL_SHORTAGE"
    QUALITY_HOLD = "QUALITY_HOLD"
    OTHER = "OTHER"


class SignalSource(str, Enum):
    EMAIL = "EMAIL"
    CARRIER_WEBHOOK = "CARRIER_WEBHOOK"
    PO_HEALTH_SCAN = "PO_HEALTH_SCAN"


class DisruptionStatus(str, Enum):
    INGESTED = "INGESTED"
    TRIAGING = "TRIAGING"
    AWAITING_CLARIFICATION = "AWAITING_CLARIFICATION"
    ANALYZING_IMPACT = "ANALYZING_IMPACT"
    MONITOR_ONLY = "MONITOR_ONLY"
    SOURCING_AND_SCHEDULING = "SOURCING_AND_SCHEDULING"
    AWAITING_APPROVAL = "AWAITING_APPROVAL"
    MITIGATED = "MITIGATED"
    REJECTED = "REJECTED"


# --- Ingestion & Triage Schemas ---

class EmailSignalInput(BaseModel):
    scenario_id: Optional[str] = None
    sender: str = "dispatch@nordstahl-logistics.de"
    subject: str = "URGENT: Vessel Delay Notice - PO-8842 Cold-Rolled Steel Coil"
    body: str = ""


class CarrierWebhookInput(BaseModel):
    container_id: str
    po_id: str
    new_eta_offset_days: Optional[int] = None
    shipped_qty: Optional[float] = None
    reason: str = "CUSTOMS_HOLD"


class DisruptionSignal(BaseModel):
    disruption_id: str
    source: SignalSource
    sender: str
    subject: str
    raw_text: str
    received_at: str
    po_hint: Optional[str] = None
    shipped_qty_override: Optional[float] = None


class DisruptionFacts(BaseModel):
    po_id: Optional[str] = None
    supplier_name: Optional[str] = None
    material_hint: str = ""
    delay_days: int = 0
    shipped_qty: Optional[float] = None
    shortage_pct: Optional[float] = None
    root_cause: RootCauseCategory = RootCauseCategory.PORT_CONGESTION
    confidence: float = Field(ge=0.0, le=1.0, default=0.95)
    evidence_quotes: list[str] = Field(default_factory=list)
    summary_headline: str = ""


class MaterialRecord(BaseModel):
    id: str
    name: str
    spec: str
    on_hand_qty: float
    safety_stock_qty: float
    daily_burn_rate: float
    uom: str = "tons"


class PurchaseOrderRecord(BaseModel):
    id: str
    supplier_id: str
    supplier_name: str
    material_id: str
    qty: float
    unit_price: float
    original_eta_day: int  # Days relative to D0 (e.g., 5 means D+5)
    current_eta_day: int
    arriving_qty: float
    status: str = "ON_TIME"


class ErpContext(BaseModel):
    po: PurchaseOrderRecord
    material: MaterialRecord
    match_confidence: float = 0.98
    candidate_pos: list[PurchaseOrderRecord] = Field(default_factory=list)


# --- Impact & Runway Schemas ---

class DailyStockPoint(BaseModel):
    day_offset: int
    date_label: str
    projected_stock_unmitigated: float
    projected_stock_mitigated: float
    safety_stock: float
    consuming_order_id: Optional[str] = None


class InventoryRunwayReport(BaseModel):
    material_id: str
    on_hand_qty: float
    safety_stock_qty: float
    daily_burn_rate: float
    safety_breach_day: Optional[int] = None
    stockout_day: Optional[int] = None
    revised_arrival_day: int
    uncovered_days: int
    shortage_qty: float
    daily_curve: list[DailyStockPoint] = Field(default_factory=list)


class AffectedProductionOrder(BaseModel):
    id: str
    customer: str
    product: str
    material_id: str
    material_qty: float
    line_id: str
    scheduled_start_day: int
    scheduled_end_day: int
    duration_days: int
    deadline_day: int
    penalty_per_day_usd: float
    projected_finish_day_unmitigated: int
    days_late_unmitigated: int
    sla_penalty_usd: float
    shortage_tons: float


class ExposureBreakdown(BaseModel):
    idle_shift_count: int
    idle_shift_cost_per_shift_usd: float
    total_idle_shift_cost_usd: float
    total_sla_penalty_usd: float
    total_unmitigated_exposure_usd: float
    executive_briefing: str = ""


# --- Sourcing & RFQ Schemas ---

class RankedSupplier(BaseModel):
    supplier_id: str
    name: str
    archetype_label: str  # "Option A — Fastest", "Option B — Balanced (Recommended)", "Option C — Cheapest / Split"
    location: str
    contact_email: str
    lead_time_days: int
    arrival_day: int
    unit_price: float
    base_contract_price: float
    premium_per_ton: float
    reliability_score: int
    weekly_capacity_tons: float
    freight_cost_usd: float
    composite_score: float
    can_meet_stockout: bool
    can_meet_swapped_window: bool


class RfqDraft(BaseModel):
    supplier_id: str
    supplier_name: str
    archetype_label: str
    recipient_email: str
    subject: str
    body: str
    strategy_tag: str
    requested_qty_tons: float
    requested_arrival_day: int
    requested_date_label: str
    target_unit_price: float
    validation_passed: bool = True
    validation_notes: list[str] = Field(default_factory=list)


# --- Shift Scheduling Schemas ---

class ShiftSlot(BaseModel):
    day_offset: int
    date_label: str
    window: Literal["DAY", "SWING"]
    line_id: str
    production_order_id: Optional[str] = None
    product_label: str
    material_id: Optional[str] = None
    status: Literal["NORMAL", "STARVED", "SWAPPED_IN", "DEFERRED", "COVERED_BY_BRIDGE"]


class ShiftProposal(BaseModel):
    swapped_order_id: str
    swapped_order_product: str
    pulled_into_start_day: int
    pulled_into_end_day: int
    steel_needed_by_day: int
    bridge_tons_needed: float
    idle_shifts_before: int
    idle_shifts_after: int
    changeover_count: int
    changeover_cost_usd: float
    before_slots: list[ShiftSlot] = Field(default_factory=list)
    after_slots: list[ShiftSlot] = Field(default_factory=list)
    planner_explanation: str = ""


# --- Mitigation Options & Approval Gate ---

class MitigationOptionBundle(BaseModel):
    option_id: str
    title: str
    recommended: bool
    includes_shift_swap: bool
    primary_backup_supplier_id: str
    primary_backup_supplier_name: str
    secondary_backup_supplier_id: Optional[str] = None
    bridge_qty_tons: float
    price_premium_usd: float
    expedited_freight_usd: float
    changeover_cost_usd: float
    total_mitigation_cost_usd: float
    unmitigated_exposure_usd: float
    net_savings_usd: float
    roi_multiple: float
    idle_shifts_remaining: int
    late_orders_remaining: int
    summary_bullets: list[str] = Field(default_factory=list)


class InferenceMetric(BaseModel):
    call_id: str
    agent_name: str
    model_id: str
    gpu_device: str
    mode: Literal["AMD_LIVE", "DETERMINISTIC_REPLAY"]
    prompt_tokens: int
    completion_tokens: int
    latency_ms: int
    tokens_per_sec: float
    timestamp: str


class AuditEntry(BaseModel):
    timestamp: str
    actor: str
    action: str
    details: str


class SupplierReplySimulation(BaseModel):
    supplier_id: str
    supplier_name: str
    status: Literal["CONFIRMED", "COUNTER_OFFER", "PARTIAL_CAPACITY"]
    confirmed_qty_tons: float
    offered_unit_price: float
    promised_arrival_day: int
    reply_subject: str
    reply_body: str


class WorkflowStateSnapshot(BaseModel):
    disruption_id: str
    status: DisruptionStatus
    started_at: str
    elapsed_ms: int = 0
    active_node: Optional[str] = None
    completed_nodes: list[str] = Field(default_factory=list)
    signal: Optional[DisruptionSignal] = None
    facts: Optional[DisruptionFacts] = None
    erp_context: Optional[ErpContext] = None
    runway: Optional[InventoryRunwayReport] = None
    affected_orders: list[AffectedProductionOrder] = Field(default_factory=list)
    exposure: Optional[ExposureBreakdown] = None
    ranked_suppliers: list[RankedSupplier] = Field(default_factory=list)
    rfq_drafts: list[RfqDraft] = Field(default_factory=list)
    shift_proposal: Optional[ShiftProposal] = None
    options: list[MitigationOptionBundle] = Field(default_factory=list)
    recommended_option_id: Optional[str] = None
    selected_option_id: Optional[str] = None
    outbox_sent: list[RfqDraft] = Field(default_factory=list)
    supplier_replies: list[SupplierReplySimulation] = Field(default_factory=list)
    inference_calls: list[InferenceMetric] = Field(default_factory=list)
    audit_log: list[AuditEntry] = Field(default_factory=list)
    thought_stream: list[str] = Field(default_factory=list)


class HumanDecisionInput(BaseModel):
    action: Literal["approve", "revise", "reject"] = "approve"
    option_id: str = "OPT-SWAP-KESSLER"
    edited_rfqs: Optional[list[RfqDraft]] = None
    feedback: Optional[str] = None


class ClarificationInput(BaseModel):
    selected_po_id: str
