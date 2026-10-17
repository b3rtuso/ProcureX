"""Comprehensive unit and integration tests for deterministic supply chain planning engines.

Covers:
1. Scenario 1 (Golden Scenario): PO-8842 Steel Coil +14 day delay with shift swap and Kessler bridge.
2. Scenario 2 (Short-Shipment): PO-9210 PA66 Resin 20-ton deficit (-40%).
3. Scenario 3 (Buffer-Absorbed Delay): PO-9104 Fasteners +2 day transit delay absorbed by buffer.
"""
from __future__ import annotations
import pytest
from backend.database.db import get_connection, init_and_seed_db
from backend.schemas import (
    MaterialRecord,
    PurchaseOrderRecord,
)
from backend.services.impact_engine import (
    project_inventory_runway,
    quantify_unmitigated_exposure,
    trace_affected_production_orders,
)
from backend.services.options_engine import build_mitigation_options
from backend.services.scheduler_engine import resequence_factory_shifts
from backend.services.sourcing_engine import find_and_rank_backup_suppliers


@pytest.fixture
def db_conn(tmp_path):
    """Provide a freshly initialized and seeded SQLite database connection."""
    db_file = str(tmp_path / "test_erp.db")
    init_and_seed_db(db_file)
    conn = get_connection(db_file)
    yield conn
    conn.close()


# ==============================================================================
# SCENARIO 1: GOLDEN SCENARIO (Steel Coil PO-8842 +14 Days Delay at Rotterdam)
# ==============================================================================


def test_scenario_1_inventory_runway_golden():
    """Verify exact 30-day inventory burn curve, breach days, and shortage metrics."""
    material = MaterialRecord(
        id="MAT-STL-101",
        name="Cold-Rolled Steel Coil 2mm",
        spec="ASTM A1008 / EN 10130 DC01",
        on_hand_qty=48.0,
        safety_stock_qty=15.0,
        daily_burn_rate=8.0,
        uom="tons",
    )
    po = PurchaseOrderRecord(
        id="PO-8842",
        supplier_id="SUP-NORD",
        supplier_name="Nordstahl GmbH",
        material_id="MAT-STL-101",
        qty=140.0,
        unit_price=820.0,
        original_eta_day=5,
        current_eta_day=5,
        arriving_qty=140.0,
        status="ON_TIME",
    )

    runway = project_inventory_runway(
        material=material,
        po=po,
        delay_days=14,
        swap_pulled_days=4,
        bridge_arrival_day=8,
        bridge_qty=72.0,
    )

    # Core milestone days
    assert runway.revised_arrival_day == 19
    assert runway.safety_breach_day == 4
    assert runway.stockout_day == 6
    assert runway.uncovered_days == 13
    assert runway.shortage_qty == 104.0
    assert len(runway.daily_curve) == 30

    # Unmitigated curve milestones
    curve = runway.daily_curve
    assert curve[0].projected_stock_unmitigated == 40.0
    assert curve[1].projected_stock_unmitigated == 32.0
    assert curve[2].projected_stock_unmitigated == 24.0
    assert curve[3].projected_stock_unmitigated == 16.0
    assert curve[4].projected_stock_unmitigated == 8.0
    assert curve[5].projected_stock_unmitigated == 0.0
    assert curve[6].projected_stock_unmitigated == 0.0
    assert curve[18].projected_stock_unmitigated == 0.0
    assert curve[19].projected_stock_unmitigated == 132.0

    # Mitigated curve guarantees stock >= 0 on every single day
    for pt in curve:
        assert pt.projected_stock_mitigated >= 0.0

    assert curve[5].projected_stock_mitigated == 0.0
    assert curve[6].projected_stock_mitigated == 0.0  # swapped to Aluminum
    assert curve[7].projected_stock_mitigated == 0.0  # swapped to Aluminum
    assert curve[8].projected_stock_mitigated == 72.0  # bridge arrives D+8
    assert curve[9].projected_stock_mitigated == 72.0  # last swap day
    assert curve[10].projected_stock_mitigated == 64.0  # steel resumes
    assert curve[18].projected_stock_mitigated == 0.0
    assert curve[19].projected_stock_mitigated == 132.0  # original PO arrives


def test_scenario_1_trace_affected_production_orders(db_conn):
    """Verify ripple impact on scheduled production orders FO-901 and FO-905."""
    material = MaterialRecord(
        id="MAT-STL-101",
        name="Cold-Rolled Steel Coil 2mm",
        spec="DC01",
        on_hand_qty=48.0,
        safety_stock_qty=15.0,
        daily_burn_rate=8.0,
        uom="tons",
    )
    po = PurchaseOrderRecord(
        id="PO-8842",
        supplier_id="SUP-NORD",
        supplier_name="Nordstahl GmbH",
        material_id="MAT-STL-101",
        qty=140.0,
        unit_price=820.0,
        original_eta_day=5,
        current_eta_day=5,
        arriving_qty=140.0,
        status="ON_TIME",
    )
    runway = project_inventory_runway(material, po, delay_days=14)

    affected = trace_affected_production_orders("MAT-STL-101", runway, db_conn)
    assert len(affected) == 2

    # FO-2026-901 (Apex EV Motors)
    fo_901 = next(o for o in affected if o.id == "FO-2026-901")
    assert fo_901.customer == "Apex EV Motors"
    assert fo_901.duration_days == 7
    assert fo_901.deadline_day == 16
    assert fo_901.projected_finish_day_unmitigated == 25  # 19 + 7 - 1 = 25
    assert fo_901.days_late_unmitigated == 9  # 25 - 16 = 9
    assert fo_901.sla_penalty_usd == 45000.0  # 9 * 5,000

    # FO-2026-905 (Boreal Commercial Trucks)
    fo_905 = next(o for o in affected if o.id == "FO-2026-905")
    assert fo_905.customer == "Boreal Commercial Trucks"
    assert fo_905.duration_days == 6
    assert fo_905.deadline_day == 24
    assert fo_905.projected_finish_day_unmitigated == 31  # 26 + 6 - 1 = 31
    assert fo_905.days_late_unmitigated == 7  # 31 - 24 = 7
    assert fo_905.sla_penalty_usd == 21000.0  # 7 * 3,000


def test_scenario_1_quantify_exposure():
    """Verify total unmitigated exposure calculation ($235,000)."""
    material = MaterialRecord(
        id="MAT-STL-101",
        name="Steel",
        spec="DC01",
        on_hand_qty=48.0,
        safety_stock_qty=15.0,
        daily_burn_rate=8.0,
    )
    po = PurchaseOrderRecord(
        id="PO-8842",
        supplier_id="SUP-NORD",
        supplier_name="Nordstahl GmbH",
        material_id="MAT-STL-101",
        qty=140.0,
        unit_price=820.0,
        original_eta_day=5,
        current_eta_day=5,
        arriving_qty=140.0,
    )
    runway = project_inventory_runway(material, po, delay_days=14)

    # Mock affected orders with exact penalties
    from backend.schemas import AffectedProductionOrder

    orders = [
        AffectedProductionOrder(
            id="FO-2026-901",
            customer="Apex EV Motors",
            product="Cross-Members",
            material_id="MAT-STL-101",
            material_qty=56.0,
            line_id="LINE-A",
            scheduled_start_day=6,
            scheduled_end_day=12,
            duration_days=7,
            deadline_day=16,
            penalty_per_day_usd=5000.0,
            projected_finish_day_unmitigated=25,
            days_late_unmitigated=9,
            sla_penalty_usd=45000.0,
            shortage_tons=56.0,
        ),
        AffectedProductionOrder(
            id="FO-2026-905",
            customer="Boreal Commercial Trucks",
            product="Brackets",
            material_id="MAT-STL-101",
            material_qty=48.0,
            line_id="LINE-A",
            scheduled_start_day=13,
            scheduled_end_day=18,
            duration_days=6,
            deadline_day=24,
            penalty_per_day_usd=3000.0,
            projected_finish_day_unmitigated=31,
            days_late_unmitigated=7,
            sla_penalty_usd=21000.0,
            shortage_tons=48.0,
        ),
    ]

    exposure = quantify_unmitigated_exposure(orders, runway, idle_shift_cost_usd=6500.0)
    assert exposure.idle_shift_count == 26
    assert exposure.total_idle_shift_cost_usd == 169000.0
    assert exposure.total_sla_penalty_usd == 66000.0
    assert exposure.total_unmitigated_exposure_usd == 235000.0


def test_scenario_1_sourcing_multi_criteria_ranking(db_conn):
    """Verify backup supplier multi-criteria ranking and archetype labels."""
    ranked = find_and_rank_backup_suppliers(
        material_id="MAT-STL-101",
        base_contract_price=820.0,
        stockout_day=6,
        swapped_need_day=10,
        conn=db_conn,
    )

    assert len(ranked) == 3
    # Top ranked should be Kessler due to balanced score (lead 8d, rel 95%, price 905, cap 200t)
    assert ranked[0].supplier_id == "SUP-KESSLER"
    assert "Recommended" in ranked[0].archetype_label
    assert ranked[0].can_meet_swapped_window is True
    assert ranked[0].can_meet_stockout is False

    # Check Helix
    helix = next(s for s in ranked if s.supplier_id == "SUP-HELIX")
    assert "Fastest" in helix.archetype_label
    assert helix.lead_time_days == 3
    assert helix.can_meet_stockout is True
    assert helix.premium_per_ton == 190.0

    # Check Pacific
    pacific = next(s for s in ranked if s.supplier_id == "SUP-PACIFIC")
    assert "Cost-Optimized" in pacific.archetype_label
    assert pacific.unit_price == 860.0
    assert pacific.can_meet_stockout is False
    assert pacific.can_meet_swapped_window is False


def test_scenario_1_shift_resequencing(db_conn):
    """Verify shift swap pulling FO-904 into D+6..D+9 and deferring steel jobs."""
    material = MaterialRecord(
        id="MAT-STL-101",
        name="Steel",
        spec="DC01",
        on_hand_qty=48.0,
        safety_stock_qty=15.0,
        daily_burn_rate=8.0,
    )
    po = PurchaseOrderRecord(
        id="PO-8842",
        supplier_id="SUP-NORD",
        supplier_name="Nordstahl GmbH",
        material_id="MAT-STL-101",
        qty=140.0,
        unit_price=820.0,
        original_eta_day=5,
        current_eta_day=5,
        arriving_qty=140.0,
    )
    runway = project_inventory_runway(material, po, delay_days=14)

    proposal = resequence_factory_shifts(
        material_id="MAT-STL-101",
        runway=runway,
        recommended_supplier_lead_days=8,
        conn=db_conn,
    )

    assert proposal.swapped_order_id == "FO-2026-904"
    assert proposal.pulled_into_start_day == 6
    assert proposal.pulled_into_end_day == 9
    assert proposal.steel_needed_by_day == 10
    assert proposal.bridge_tons_needed == 72.0
    assert proposal.idle_shifts_before == 26
    assert proposal.idle_shifts_after == 0
    assert proposal.changeover_count == 2
    assert proposal.changeover_cost_usd == 3000.0

    # Verify slots marking
    starved_before = [s for s in proposal.before_slots if s.status == "STARVED"]
    assert len(starved_before) == 26  # 13 days * 2 shifts

    swapped_in_after = [s for s in proposal.after_slots if s.status == "SWAPPED_IN"]
    assert len(swapped_in_after) == 8  # 4 days * 2 shifts
    assert all(s.production_order_id == "FO-2026-904" for s in swapped_in_after)

    bridge_after = [s for s in proposal.after_slots if s.status == "COVERED_BY_BRIDGE"]
    assert len(bridge_after) == 18  # 9 days * 2 shifts (D+10..D+18)


def test_scenario_1_mitigation_option_bundles(db_conn):
    """Verify Bundle 1 ($221,080 net savings, 15.9x ROI) and Bundle 2 trade-offs."""
    material = MaterialRecord(
        id="MAT-STL-101",
        name="Steel",
        spec="DC01",
        on_hand_qty=48.0,
        safety_stock_qty=15.0,
        daily_burn_rate=8.0,
    )
    po = PurchaseOrderRecord(
        id="PO-8842",
        supplier_id="SUP-NORD",
        supplier_name="Nordstahl GmbH",
        material_id="MAT-STL-101",
        qty=140.0,
        unit_price=820.0,
        original_eta_day=5,
        current_eta_day=5,
        arriving_qty=140.0,
    )
    runway = project_inventory_runway(material, po, delay_days=14)
    affected = trace_affected_production_orders("MAT-STL-101", runway, db_conn)
    exposure = quantify_unmitigated_exposure(affected, runway)
    ranked = find_and_rank_backup_suppliers(
        "MAT-STL-101", 820.0, runway.stockout_day, 10, db_conn
    )
    proposal = resequence_factory_shifts("MAT-STL-101", runway, 8, db_conn)

    bundles = build_mitigation_options(exposure, ranked, proposal, runway)
    assert len(bundles) == 2

    # Bundle 1 (Recommended)
    b1 = bundles[0]
    assert b1.option_id == "OPT-SWAP-KESSLER"
    assert b1.recommended is True
    assert b1.includes_shift_swap is True
    assert b1.bridge_qty_tons == 72.0
    assert b1.price_premium_usd == 6120.0  # 72 * 85
    assert b1.expedited_freight_usd == 4800.0
    assert b1.changeover_cost_usd == 3000.0
    assert b1.total_mitigation_cost_usd == 13920.0
    assert b1.net_savings_usd == 221080.0  # 235000 - 13920
    assert b1.roi_multiple == 15.9
    assert b1.idle_shifts_remaining == 0
    assert b1.late_orders_remaining == 0

    # Bundle 2 (Alternative)
    b2 = bundles[1]
    assert b2.option_id == "OPT-NOSWAP-DUAL"
    assert b2.recommended is False
    assert b2.includes_shift_swap is False
    assert b2.bridge_qty_tons == 104.0
    assert b2.total_mitigation_cost_usd == 18200.0
    assert b2.net_savings_usd == 216800.0  # 235000 - 18200
    assert b2.roi_multiple == 11.9
    assert b2.idle_shifts_remaining == 0
    assert b2.late_orders_remaining == 0


# ==============================================================================
# SCENARIO 2: SHORT-SHIPMENT (Resin PO-9210 short by 20 tons)
# ==============================================================================


def test_scenario_2_short_shipment():
    """Verify handling of -40% quantity short-shipment on PO-9210."""
    material = MaterialRecord(
        id="MAT-RSN-404",
        name="Glass-Fiber Polyamide Resin",
        spec="PA66-GF30",
        on_hand_qty=24.0,
        safety_stock_qty=8.0,
        daily_burn_rate=4.0,
        uom="tons",
    )
    po = PurchaseOrderRecord(
        id="PO-9210",
        supplier_id="SUP-CHEM",
        supplier_name="RheinChem Polymers AG",
        material_id="MAT-RSN-404",
        qty=50.0,
        unit_price=2100.0,
        original_eta_day=4,
        current_eta_day=4,
        arriving_qty=50.0,
        status="ON_TIME",
    )

    runway = project_inventory_runway(
        material=material,
        po=po,
        delay_days=0,
        shipped_qty_override=30.0,  # 20t deficit
    )

    assert runway.shortage_qty == 20.0
    assert runway.uncovered_days == 5  # 20t / 4t/day = 5 days


# ==============================================================================
# SCENARIO 3: BUFFER-ABSORBED MINOR DELAY (Fasteners PO-9104 +2 Days)
# ==============================================================================


def test_scenario_3_minor_delay_absorbed(db_conn):
    """Verify minor delay on PO-9104 is completely absorbed by safety buffer."""
    material = MaterialRecord(
        id="MAT-FST-303",
        name="High-Tensile M12 Fastener Kit",
        spec="ISO 898-1 Class 10.9",
        on_hand_qty=60.0,
        safety_stock_qty=10.0,
        daily_burn_rate=3.0,
        uom="tons",
    )
    po = PurchaseOrderRecord(
        id="PO-9104",
        supplier_id="SUP-EUROFAST",
        supplier_name="EuroFastener S.p.A.",
        material_id="MAT-FST-303",
        qty=45.0,
        unit_price=1200.0,
        original_eta_day=7,
        current_eta_day=7,
        arriving_qty=45.0,
        status="ON_TIME",
    )

    runway = project_inventory_runway(
        material=material,
        po=po,
        delay_days=2,
    )

    # 60t on hand covers 20 days. Delay from D+7 to D+9 leaves 33t in stock.
    assert runway.stockout_day is None
    assert runway.uncovered_days == 0
    assert runway.shortage_qty == 0.0

    # No production orders should be affected
    affected = trace_affected_production_orders("MAT-FST-303", runway, db_conn)
    assert len(affected) == 0

    # Exposure should be exactly 0
    exposure = quantify_unmitigated_exposure(affected, runway)
    assert exposure.idle_shift_count == 0
    assert exposure.total_idle_shift_cost_usd == 0.0
    assert exposure.total_sla_penalty_usd == 0.0
    assert exposure.total_unmitigated_exposure_usd == 0.0
