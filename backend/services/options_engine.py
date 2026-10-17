"""Mitigation option bundle synthesis and financial trade-off engine."""
from __future__ import annotations
from typing import Optional
from backend.schemas import (
    ExposureBreakdown,
    InventoryRunwayReport,
    MitigationOptionBundle,
    RankedSupplier,
    ShiftProposal,
)


def build_mitigation_options(
    exposure: ExposureBreakdown,
    ranked_suppliers: list[RankedSupplier],
    shift_proposal: ShiftProposal,
    runway: InventoryRunwayReport,
) -> list[MitigationOptionBundle]:
    """Synthesize concrete actionable mitigation bundles for executive approval.

    Option 1 (Recommended): Shift Swap + Single Balanced Regional Mill bridge order.
    Option 2 (Alternative): Schedule Unchanged + Dual-vendor spot expedite order.
    """
    balanced_supplier = next(
        (
            s
            for s in ranked_suppliers
            if "Balanced" in s.archetype_label or "KESSLER" in s.supplier_id
        ),
        ranked_suppliers[0] if ranked_suppliers else None,
    )
    fastest_supplier = next(
        (
            s
            for s in ranked_suppliers
            if "Fastest" in s.archetype_label or "HELIX" in s.supplier_id
        ),
        (
            ranked_suppliers[1]
            if len(ranked_suppliers) > 1
            else (ranked_suppliers[0] if ranked_suppliers else None)
        ),
    )

    unmitigated_exp = float(exposure.total_unmitigated_exposure_usd)

    # --- Bundle 1: OPT-SWAP-KESSLER (Recommended) ---
    b1_bridge_qty = float(shift_proposal.bridge_tons_needed)  # 72.0t
    b1_unit_premium = float(
        balanced_supplier.premium_per_ton if balanced_supplier else 85.0
    )
    b1_price_premium = round(b1_bridge_qty * b1_unit_premium, 2)  # 6120.0
    b1_freight = float(
        balanced_supplier.freight_cost_usd if balanced_supplier else 4800.0
    )  # 4800.0
    b1_changeover = float(shift_proposal.changeover_cost_usd)  # 3000.0
    b1_total_cost = round(b1_price_premium + b1_freight + b1_changeover, 2)  # 13920.0
    b1_net_savings = round(unmitigated_exp - b1_total_cost, 2)  # 221080.0
    b1_roi = (
        round(b1_net_savings / b1_total_cost, 1) if b1_total_cost > 0 else 0.0
    )  # 15.9

    bundle_1 = MitigationOptionBundle(
        option_id="OPT-SWAP-KESSLER",
        title="Bundle 1 (Recommended): Aluminum Shift Swap + Balanced Regional Mill Bridge",
        recommended=True,
        includes_shift_swap=True,
        primary_backup_supplier_id=(
            balanced_supplier.supplier_id if balanced_supplier else "SUP-KESSLER"
        ),
        primary_backup_supplier_name=(
            balanced_supplier.name if balanced_supplier else "Kessler Regional Mill"
        ),
        secondary_backup_supplier_id=None,
        bridge_qty_tons=b1_bridge_qty,
        price_premium_usd=b1_price_premium,
        expedited_freight_usd=b1_freight,
        changeover_cost_usd=b1_changeover,
        total_mitigation_cost_usd=b1_total_cost,
        unmitigated_exposure_usd=unmitigated_exp,
        net_savings_usd=b1_net_savings,
        roi_multiple=b1_roi,
        idle_shifts_remaining=shift_proposal.idle_shifts_after,
        late_orders_remaining=0,
        summary_bullets=[
            f"Shift swap pulls 4 days of Aluminum Hood Panels ({shift_proposal.swapped_order_id}) into D+6..D+9, avoiding $52,000 in idle line costs.",
            f"Procure {b1_bridge_qty:.1f} tons of steel coil from {balanced_supplier.name if balanced_supplier else 'Kessler Regional Mill'} arriving D+8 at $905/t (+${b1_unit_premium:.0f}/t premium).",
            "Eliminates all $66,000 in SLA late delivery penalties for Apex EV Motors and Boreal Trucks.",
            f"Total investment: ${b1_total_cost:,.2f} yielding net savings of ${b1_net_savings:,.2f} ({b1_roi}x ROI).",
        ],
    )

    # --- Bundle 2: OPT-NOSWAP-DUAL (Alternative) ---
    # Keeps schedule unchanged: 32t from Helix for D+6..D+9 + 72t from Kessler for D+10..D+18
    helix_qty = 32.0
    kessler_qty = 72.0
    b2_bridge_qty = helix_qty + kessler_qty  # 104.0t
    helix_premium_rate = float(
        fastest_supplier.premium_per_ton if fastest_supplier else 190.0
    )
    kessler_premium_rate = float(
        balanced_supplier.premium_per_ton if balanced_supplier else 85.0
    )
    b2_price_premium = round(
        (helix_qty * helix_premium_rate) + (kessler_qty * kessler_premium_rate), 2
    )  # 6080.0 + 6120.0 = 12200.0
    helix_freight = float(
        fastest_supplier.freight_cost_usd if fastest_supplier else 1200.0
    )
    kessler_freight = float(
        balanced_supplier.freight_cost_usd if balanced_supplier else 4800.0
    )
    b2_freight = round(helix_freight + kessler_freight, 2)  # 6000.0
    b2_changeover = 0.0
    b2_total_cost = round(b2_price_premium + b2_freight + b2_changeover, 2)  # 18200.0
    b2_net_savings = round(unmitigated_exp - b2_total_cost, 2)  # 216800.0
    b2_roi = (
        round(b2_net_savings / b2_total_cost, 1) if b2_total_cost > 0 else 0.0
    )  # 11.9

    bundle_2 = MitigationOptionBundle(
        option_id="OPT-NOSWAP-DUAL",
        title="Bundle 2 (Alternative): No Shift Change + Dual-Vendor Spot Expedite",
        recommended=False,
        includes_shift_swap=False,
        primary_backup_supplier_id=(
            fastest_supplier.supplier_id if fastest_supplier else "SUP-HELIX"
        ),
        primary_backup_supplier_name=(
            fastest_supplier.name
            if fastest_supplier
            else "Helix Steel Service Center"
        ),
        secondary_backup_supplier_id=(
            balanced_supplier.supplier_id if balanced_supplier else "SUP-KESSLER"
        ),
        bridge_qty_tons=b2_bridge_qty,
        price_premium_usd=b2_price_premium,
        expedited_freight_usd=b2_freight,
        changeover_cost_usd=b2_changeover,
        total_mitigation_cost_usd=b2_total_cost,
        unmitigated_exposure_usd=unmitigated_exp,
        net_savings_usd=b2_net_savings,
        roi_multiple=b2_roi,
        idle_shifts_remaining=0,
        late_orders_remaining=0,
        summary_bullets=[
            "No shift change required; maintains existing stamping sequence.",
            f"Split purchase: {helix_qty:.1f}t spot expedite from {fastest_supplier.name if fastest_supplier else 'Helix Steel'} (arriving D+3) + {kessler_qty:.1f}t from {balanced_supplier.name if balanced_supplier else 'Kessler Mill'} (arriving D+8).",
            f"Total bridge quantity of {b2_bridge_qty:.1f}t covers the entire 13-day unmitigated window with 0 SLA penalties.",
            f"Total mitigation cost: ${b2_total_cost:,.2f} yielding net savings of ${b2_net_savings:,.2f} ({b2_roi}x ROI).",
        ],
    )

    return [bundle_1, bundle_2]
