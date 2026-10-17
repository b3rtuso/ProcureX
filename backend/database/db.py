"""SQLite ERP database manager and deterministic seed data for the Stamping Plant."""
from __future__ import annotations
import json
import os
import sqlite3
from datetime import date, timedelta
from typing import Any, Optional
from backend.config import settings


def day_label(offset: int, base_date: Optional[date] = None) -> str:
    """Return human-readable label like 'D+6 (Oct 23)'."""
    d0 = base_date or date.today()
    target = d0 + timedelta(days=offset)
    sign = f"+{offset}" if offset >= 0 else str(offset)
    return f"D{sign} ({target.strftime('%b %d')})"


def get_connection(db_path: Optional[str] = None) -> sqlite3.Connection:
    path = db_path or settings.DATABASE_PATH
    os.makedirs(os.path.dirname(path), exist_ok=True)
    conn = sqlite3.connect(path, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_and_seed_db(db_path: Optional[str] = None) -> None:
    """Reset and seed the SQLite ERP sandbox database with deterministic Golden Scenario data."""
    conn = get_connection(db_path)
    cur = conn.cursor()

    cur.executescript(
        """
        DROP TABLE IF EXISTS materials;
        DROP TABLE IF EXISTS suppliers;
        DROP TABLE IF EXISTS supplier_materials;
        DROP TABLE IF EXISTS purchase_orders;
        DROP TABLE IF EXISTS production_lines;
        DROP TABLE IF EXISTS production_orders;
        DROP TABLE IF EXISTS factory_shifts;
        DROP TABLE IF EXISTS outbox_emails;
        DROP TABLE IF EXISTS audit_logs;
        DROP TABLE IF EXISTS inference_metrics;

        CREATE TABLE materials (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            spec TEXT NOT NULL,
            on_hand_qty REAL NOT NULL,
            safety_stock_qty REAL NOT NULL,
            daily_burn_rate REAL NOT NULL,
            uom TEXT NOT NULL DEFAULT 'tons'
        );

        CREATE TABLE suppliers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            tier INTEGER NOT NULL,
            is_backup_approved INTEGER NOT NULL,
            reliability_score INTEGER NOT NULL,
            contact_email TEXT NOT NULL,
            location TEXT NOT NULL
        );

        CREATE TABLE supplier_materials (
            supplier_id TEXT NOT NULL,
            material_id TEXT NOT NULL,
            unit_price REAL NOT NULL,
            lead_time_days INTEGER NOT NULL,
            weekly_capacity_tons REAL NOT NULL,
            freight_cost_usd REAL NOT NULL,
            PRIMARY KEY (supplier_id, material_id)
        );

        CREATE TABLE purchase_orders (
            id TEXT PRIMARY KEY,
            supplier_id TEXT NOT NULL,
            supplier_name TEXT NOT NULL,
            material_id TEXT NOT NULL,
            qty REAL NOT NULL,
            unit_price REAL NOT NULL,
            original_eta_day INTEGER NOT NULL,
            current_eta_day INTEGER NOT NULL,
            arriving_qty REAL NOT NULL,
            status TEXT NOT NULL DEFAULT 'ON_TIME'
        );

        CREATE TABLE production_lines (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            shifts_per_day INTEGER NOT NULL,
            idle_shift_cost_usd REAL NOT NULL,
            capable_materials_json TEXT NOT NULL
        );

        CREATE TABLE production_orders (
            id TEXT PRIMARY KEY,
            customer TEXT NOT NULL,
            product TEXT NOT NULL,
            material_id TEXT NOT NULL,
            material_qty REAL NOT NULL,
            line_id TEXT NOT NULL,
            scheduled_start_day INTEGER NOT NULL,
            scheduled_end_day INTEGER NOT NULL,
            duration_days INTEGER NOT NULL,
            deadline_day INTEGER NOT NULL,
            penalty_per_day_usd REAL NOT NULL,
            status TEXT NOT NULL DEFAULT 'SCHEDULED'
        );

        CREATE TABLE factory_shifts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            day_offset INTEGER NOT NULL,
            window TEXT NOT NULL,
            line_id TEXT NOT NULL,
            production_order_id TEXT,
            product_label TEXT NOT NULL,
            material_id TEXT,
            status TEXT NOT NULL DEFAULT 'NORMAL'
        );

        CREATE TABLE outbox_emails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            disruption_id TEXT NOT NULL,
            supplier_id TEXT NOT NULL,
            supplier_name TEXT NOT NULL,
            recipient_email TEXT NOT NULL,
            subject TEXT NOT NULL,
            body TEXT NOT NULL,
            requested_qty_tons REAL NOT NULL,
            target_unit_price REAL NOT NULL,
            status TEXT NOT NULL DEFAULT 'SENT_SIMULATED',
            sent_at TEXT NOT NULL
        );

        CREATE TABLE audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            disruption_id TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            actor TEXT NOT NULL,
            action TEXT NOT NULL,
            details TEXT NOT NULL
        );

        CREATE TABLE inference_metrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            call_id TEXT NOT NULL,
            agent_name TEXT NOT NULL,
            model_id TEXT NOT NULL,
            gpu_device TEXT NOT NULL,
            mode TEXT NOT NULL,
            prompt_tokens INTEGER NOT NULL,
            completion_tokens INTEGER NOT NULL,
            latency_ms INTEGER NOT NULL,
            tokens_per_sec REAL NOT NULL,
            timestamp TEXT NOT NULL
        );
        """
    )

    # 1. Seed Materials
    materials = [
        ("MAT-STL-101", "Cold-Rolled Steel Coil 2mm", "ASTM A1008 / EN 10130 DC01", 48.0, 15.0, 8.0, "tons"),
        ("MAT-ALU-202", "Architectural Aluminum Sheet 3mm", "AA 6061-T6 Automotive Grade", 120.0, 20.0, 6.0, "tons"),
        ("MAT-FST-303", "High-Tensile M12 Fastener Kit", "ISO 898-1 Class 10.9", 60.0, 10.0, 3.0, "tons"),
        ("MAT-RSN-404", "Glass-Fiber Polyamide Resin", "PA66-GF30 Injection Grade", 24.0, 8.0, 4.0, "tons"),
    ]
    cur.executemany(
        "INSERT INTO materials VALUES (?, ?, ?, ?, ?, ?, ?)", materials
    )

    # 2. Seed Suppliers (Primary + Pre-approved Backups)
    suppliers = [
        ("SUP-NORD", "Nordstahl GmbH", 1, 0, 91, "dispatch@nordstahl-logistics.de", "Duisburg, Germany"),
        ("SUP-ITALSTEEL", "Brescia Acciai S.r.l.", 1, 0, 89, "ordini@bresciaacciai.it", "Brescia, Italy"),
        ("SUP-EUROFAST", "EuroFastener S.p.A.", 2, 0, 94, "shipping@eurofastener.it", "Turin, Italy"),
        ("SUP-CHEM", "RheinChem Polymers AG", 2, 0, 87, "logistics@rheinchem.de", "Cologne, Germany"),
        # 3 Pre-Approved Backup Suppliers for Steel (MAT-STL-101)
        ("SUP-HELIX", "Helix Steel Service Center", 1, 1, 88, "expedite@helixsteel.it", "Brescia, Italy"),
        ("SUP-KESSLER", "Kessler Regional Mill", 1, 1, 95, "sourcingdesk@kessler-mill.at", "Linz, Austria"),
        ("SUP-PACIFIC", "Pacific Coil Traders", 2, 1, 79, "quotes@adriatic-coil.it", "Trieste, Italy"),
        # 3 Pre-Approved Backup Suppliers for Resin (MAT-RSN-404)
        ("SUP-POLYFAST", "Lombardia Tecnopolimeri", 1, 1, 92, "orders@lombardiapolimeri.it", "Milan, Italy"),
        ("SUP-ALPINE", "Alpine Compounding AG", 1, 1, 96, "sales@alpinecompounding.ch", "Basel, Switzerland"),
        ("SUP-IBERIA", "Iberia Polyamide S.A.", 2, 1, 84, "export@iberiapolyamide.es", "Barcelona, Spain"),
    ]
    cur.executemany(
        "INSERT INTO suppliers VALUES (?, ?, ?, ?, ?, ?, ?)", suppliers
    )

    # 3. Seed Supplier-Material Terms
    sup_materials = [
        # Steel backups
        ("SUP-HELIX", "MAT-STL-101", 1010.0, 3, 40.0, 1200.0),
        ("SUP-KESSLER", "MAT-STL-101", 905.0, 8, 200.0, 4800.0),
        ("SUP-PACIFIC", "MAT-STL-101", 860.0, 12, 150.0, 3500.0),
        # Resin backups
        ("SUP-POLYFAST", "MAT-RSN-404", 2350.0, 2, 35.0, 900.0),
        ("SUP-ALPINE", "MAT-RSN-404", 2210.0, 5, 90.0, 1800.0),
        ("SUP-IBERIA", "MAT-RSN-404", 2150.0, 9, 120.0, 2400.0),
    ]
    cur.executemany(
        "INSERT INTO supplier_materials VALUES (?, ?, ?, ?, ?, ?)", sup_materials
    )

    # 4. Seed Purchase Orders
    pos = [
        ("PO-8842", "SUP-NORD", "Nordstahl GmbH", "MAT-STL-101", 140.0, 820.0, 5, 5, 140.0, "ON_TIME"),
        ("PO-8899", "SUP-ITALSTEEL", "Brescia Acciai S.r.l.", "MAT-STL-101", 60.0, 835.0, 22, 22, 60.0, "ON_TIME"),
        ("PO-9104", "SUP-EUROFAST", "EuroFastener S.p.A.", "MAT-FST-303", 45.0, 1200.0, 7, 7, 45.0, "ON_TIME"),
        ("PO-9210", "SUP-CHEM", "RheinChem Polymers AG", "MAT-RSN-404", 50.0, 2100.0, 4, 4, 50.0, "ON_TIME"),
    ]
    cur.executemany(
        "INSERT INTO purchase_orders VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", pos
    )

    # 5. Seed Production Lines
    lines = [
        ("LINE-A", "Line A — Heavy Press Stamping", 2, 6500.0, json.dumps(["MAT-STL-101", "MAT-ALU-202"])),
        ("LINE-B", "Line B — Polymer & Fastener Assembly", 2, 4200.0, json.dumps(["MAT-RSN-404", "MAT-FST-303"])),
    ]
    cur.executemany(
        "INSERT INTO production_lines VALUES (?, ?, ?, ?, ?)", lines
    )

    # 6. Seed Production Orders
    prod_orders = [
        ("FO-2026-898", "Stellantis Melfi", "Floor Pan Reinforcement (Active Batch)", "MAT-STL-101", 48.0, "LINE-A", 0, 5, 6, 8, 4500.0, "IN_PROGRESS"),
        ("FO-2026-901", "Apex EV Motors", "Chassis Cross-Members Batch A", "MAT-STL-101", 56.0, "LINE-A", 6, 12, 7, 16, 5000.0, "SCHEDULED"),
        ("FO-2026-905", "Boreal Commercial Trucks", "Heavy Mounting Brackets", "MAT-STL-101", 48.0, "LINE-A", 13, 18, 6, 24, 3000.0, "SCHEDULED"),
        ("FO-2026-909", "Iveco Bus Europe", "Rear Subframe Stamping", "MAT-STL-101", 56.0, "LINE-A", 19, 25, 7, 29, 3500.0, "SCHEDULED"),
        ("FO-2026-904", "Stellantis Mirafiori", "Aluminum Hood Inner Panels", "MAT-ALU-202", 24.0, "LINE-A", 26, 29, 4, 30, 4000.0, "SCHEDULED"),
        ("FO-2026-908", "Iveco Powertrain", "PA66 Intake Manifold Housing", "MAT-RSN-404", 36.0, "LINE-B", 4, 12, 9, 14, 3500.0, "SCHEDULED"),
    ]
    cur.executemany(
        "INSERT INTO production_orders VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", prod_orders
    )

    # 7. Seed 30-Day Factory Shifts for LINE-A
    shifts = []
    for day in range(30):
        if 0 <= day <= 5:
            po_id, label, mat = "FO-2026-898", "FO-898 Floor Pan (Steel)", "MAT-STL-101"
        elif 6 <= day <= 12:
            po_id, label, mat = "FO-2026-901", "FO-901 Apex EV Cross-Members (Steel)", "MAT-STL-101"
        elif 13 <= day <= 18:
            po_id, label, mat = "FO-2026-905", "FO-905 Boreal Brackets (Steel)", "MAT-STL-101"
        elif 19 <= day <= 25:
            po_id, label, mat = "FO-2026-909", "FO-909 Iveco Subframe (Steel)", "MAT-STL-101"
        else:
            po_id, label, mat = "FO-2026-904", "FO-904 Aluminum Hood Panels (Alu)", "MAT-ALU-202"

        for window in ("DAY", "SWING"):
            shifts.append((day, window, "LINE-A", po_id, label, mat, "NORMAL"))

    cur.executemany(
        "INSERT INTO factory_shifts (day_offset, window, line_id, production_order_id, product_label, material_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
        shifts,
    )

    conn.commit()
    conn.close()


# Preset Scenarios for 1-Click Demo Injection
PRESET_SCENARIOS: dict[str, dict[str, Any]] = {
    "SCENARIO_1_STEEL_DELAY": {
        "id": "SCENARIO_1_STEEL_DELAY",
        "title": "Scenario 1 (Golden): Steel Coil PO-8842 Delayed +14 Days at Rotterdam",
        "badge": "CRITICAL · FULL MITIGATION",
        "source": "EMAIL",
        "sender": "dispatch@nordstahl-logistics.de",
        "subject": "URGENT: Vessel Berth Delay Notice — PO-8842 Cold-Rolled Steel Coil (140t)",
        "body": (
            "Dear Materials Planning Team (Brescia Plant),\n\n"
            "We regret to inform you that shipment reference PO-8842 (140 metric tons of Cold-Rolled Steel Coil "
            "2mm, spec ASTM A1008) aboard MV Rhein Carrier has been held at the Port of Rotterdam due to severe "
            "berth congestion and tugboat labor actions.\n\n"
            "Originally scheduled to arrive at your Brescia stamping facility in 5 days (D+5), our revised "
            "estimated arrival date is now delayed by 14 days to D+19.\n\n"
            "We apologize for the disruption to your stamping schedule and will provide daily container tracking updates.\n\n"
            "Regards,\nKlaus Weber\nHead of Export Dispatch, Nordstahl GmbH"
        ),
    },
    "SCENARIO_2_RESIN_SHORTAGE": {
        "id": "SCENARIO_2_RESIN_SHORTAGE",
        "title": "Scenario 2: Carrier Webhook — Resin Container Short-Shipped by 40%",
        "badge": "HIGH RISK · SHORT SHIPMENT",
        "source": "CARRIER_WEBHOOK",
        "sender": "webhook@maersk-telematics.io",
        "subject": "ASN Quantity Discrepancy Alert — PO-9210 (PA66-GF30 Resin)",
        "body": (
            "CARRIER TELEMATICS WEBHOOK EVENT: Container MSKU-4928104 linked to Purchase Order PO-9210 "
            "(RheinChem Polymers AG, Glass-Fiber Polyamide Resin PA66-GF30) cleared customs inspection with "
            "a verified manifest weight of only 30.0 tons instead of the contracted 50.0 tons (-40% quantity "
            "shortage due to reactor batch quality hold at origin). Arrival remains D+4, leaving a 20-ton deficit."
        ),
        "po_hint": "PO-9210",
        "shipped_qty_override": 30.0,
    },
    "SCENARIO_3_FASTENER_MINOR": {
        "id": "SCENARIO_3_FASTENER_MINOR",
        "title": "Scenario 3: Fastener Shipment PO-9104 Delayed +2 Days (Buffer Absorbs)",
        "badge": "LOW RISK · MONITOR ONLY",
        "source": "EMAIL",
        "sender": "shipping@eurofastener.it",
        "subject": "Transit Update: PO-9104 High-Tensile M12 Fasteners (+2 Days)",
        "body": (
            "Hello Giulia,\n\n"
            "Quick update on PO-9104 (45 tons of High-Tensile M12 Fastener Kits, ISO 898-1). Due to Brenner "
            "Pass freight traffic checks, our truck convoy will arrive 2 days later than planned (moving from "
            "D+7 to D+9).\n\n"
            "Best regards,\nMarco Bellini\nEuroFastener S.p.A."
        ),
    },
    "SCENARIO_4_AMBIGUOUS_EMAIL": {
        "id": "SCENARIO_4_AMBIGUOUS_EMAIL",
        "title": "Scenario 4: Vague Supplier Email Missing PO# (Triggers Human Clarification)",
        "badge": "AMBIGUOUS · CLARIFICATION GATE",
        "source": "EMAIL",
        "sender": "account-team@steel-forwarding-eu.com",
        "subject": "Fwd: Rolling mill maintenance delay on your upcoming steel coil order",
        "body": (
            "Hi Brescia Purchasing,\n\n"
            "Forwarding a note from the mill floor — because of an unplanned work-roll bearing replacement on "
            "the cold-rolling tandem mill, your upcoming Cold-Rolled Steel Coil shipment will be pushed back by "
            "14 days. Please adjust your receiving dock schedule accordingly.\n\n"
            "Thanks,\nEU Freight Desk"
        ),
    },
}
