"""Strategic sourcing and backup supplier multi-criteria ranking engine."""
from __future__ import annotations
from typing import Optional
from backend.config import settings
from backend.schemas import RankedSupplier


def find_and_rank_backup_suppliers(
    material_id: str,
    base_contract_price: float,
    stockout_day: int,
    swapped_need_day: int,
    conn,
) -> list[RankedSupplier]:
    """Query pre-approved backup suppliers, score across 4 weighted dimensions, and assign archetypes.

    Weights:
        - Lead Time: 40% (shorter is better)
        - Reliability: 30% (higher is better)
        - Unit Price: 20% (cheaper is better)
        - Capacity: 10% (higher is better)

    Archetypes assigned:
        - Option A — Fastest Expedited Service Center
        - Option B — Balanced Regional Mill (Recommended)
        - Option C — Cost-Optimized Split-Lot Trader
    """
    cur = conn.cursor()
    cur.execute(
        """
        SELECT s.id AS supplier_id, s.name, s.tier, s.is_backup_approved,
               s.reliability_score, s.contact_email, s.location,
               sm.unit_price, sm.lead_time_days, sm.weekly_capacity_tons,
               sm.freight_cost_usd
        FROM suppliers s
        JOIN supplier_materials sm ON s.id = sm.supplier_id
        WHERE s.is_backup_approved = 1 AND sm.material_id = ?
        """,
        (material_id,),
    )
    rows = cur.fetchall()
    if not rows:
        return []

    candidates: list[dict] = []
    for r in rows:
        candidates.append(
            {
                "supplier_id": r["supplier_id"],
                "name": r["name"],
                "tier": r["tier"],
                "reliability_score": int(r["reliability_score"]),
                "contact_email": r["contact_email"],
                "location": r["location"],
                "unit_price": float(r["unit_price"]),
                "lead_time_days": int(r["lead_time_days"]),
                "weekly_capacity_tons": float(r["weekly_capacity_tons"]),
                "freight_cost_usd": float(r["freight_cost_usd"]),
            }
        )

    # 1. Assign Archetype Labels
    # Fastest lead time -> Option A
    fastest = min(candidates, key=lambda c: c["lead_time_days"])
    fastest["archetype_label"] = "Option A — Fastest Expedited Service Center"

    # Cheapest unit price among remaining -> Option C
    others = [c for c in candidates if c["supplier_id"] != fastest["supplier_id"]]
    if others:
        cheapest = min(others, key=lambda c: c["unit_price"])
        cheapest["archetype_label"] = "Option C — Cost-Optimized Split-Lot Trader"
        # Remaining candidate(s) -> Option B
        for c in others:
            if c["supplier_id"] != cheapest["supplier_id"]:
                c["archetype_label"] = "Option B — Balanced Regional Mill (Recommended)"
    else:
        fastest["archetype_label"] = "Option A — Fastest Expedited Service Center"

    # 2. Multi-Criteria Scoring Normalization
    min_lead = min(c["lead_time_days"] for c in candidates)
    max_lead = max(c["lead_time_days"] for c in candidates)
    min_rel = min(c["reliability_score"] for c in candidates)
    max_rel = max(c["reliability_score"] for c in candidates)
    min_price = min(c["unit_price"] for c in candidates)
    max_price = max(c["unit_price"] for c in candidates)
    min_cap = min(c["weekly_capacity_tons"] for c in candidates)
    max_cap = max(c["weekly_capacity_tons"] for c in candidates)

    w_lead = settings.WEIGHT_LEAD_TIME
    w_rel = settings.WEIGHT_RELIABILITY
    w_price = settings.WEIGHT_PRICE
    w_cap = settings.WEIGHT_CAPACITY

    ranked: list[RankedSupplier] = []
    for c in candidates:
        s_lead = (
            1.0
            if max_lead == min_lead
            else (max_lead - c["lead_time_days"]) / (max_lead - min_lead)
        )
        s_rel = (
            1.0
            if max_rel == min_rel
            else (c["reliability_score"] - min_rel) / (max_rel - min_rel)
        )
        s_price = (
            1.0
            if max_price == min_price
            else (max_price - c["unit_price"]) / (max_price - min_price)
        )
        s_cap = (
            1.0
            if max_cap == min_cap
            else (c["weekly_capacity_tons"] - min_cap) / (max_cap - min_cap)
        )

        composite_score = round(
            w_lead * s_lead + w_rel * s_rel + w_price * s_price + w_cap * s_cap, 4
        )
        arrival_day = c["lead_time_days"]
        premium = round(c["unit_price"] - base_contract_price, 2)

        ranked.append(
            RankedSupplier(
                supplier_id=c["supplier_id"],
                name=c["name"],
                archetype_label=c["archetype_label"],
                location=c["location"],
                contact_email=c["contact_email"],
                lead_time_days=c["lead_time_days"],
                arrival_day=arrival_day,
                unit_price=c["unit_price"],
                base_contract_price=base_contract_price,
                premium_per_ton=premium,
                reliability_score=c["reliability_score"],
                weekly_capacity_tons=c["weekly_capacity_tons"],
                freight_cost_usd=c["freight_cost_usd"],
                composite_score=composite_score,
                can_meet_stockout=(arrival_day <= stockout_day),
                can_meet_swapped_window=(arrival_day <= swapped_need_day),
            )
        )

    # Rank descending by multi-criteria composite score
    ranked.sort(key=lambda s: s.composite_score, reverse=True)
    return ranked
