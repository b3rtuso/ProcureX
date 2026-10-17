"""Generate Executive Word (.docx) Specification for AMD Developer Hackathon ACT III.

Track 1: Intelligent Industry — Autonomous Supply Chain Exception Handler v3.0
"""
import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn


def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    tcPr.append(parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>'))


def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>'
    )
    tcPr.append(tcMar)


def set_cell_borders(cell, top="CCCCCC", bottom="CCCCCC", left=None, right=None, sz="4"):
    tcPr = cell._tc.get_or_add_tcPr()
    borders_xml = f'<w:tcBorders {nsdecls("w")}>'
    if top:
        borders_xml += f'<w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{top}"/>'
    else:
        borders_xml += '<w:top w:val="none"/>'
    if bottom:
        borders_xml += f'<w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{bottom}"/>'
    else:
        borders_xml += '<w:bottom w:val="none"/>'
    if left:
        borders_xml += f'<w:left w:val="single" w:sz="{sz}" w:space="0" w:color="{left}"/>'
    else:
        borders_xml += '<w:left w:val="none"/>'
    if right:
        borders_xml += f'<w:right w:val="single" w:sz="{sz}" w:space="0" w:color="{right}"/>'
    else:
        borders_xml += '<w:right w:val="none"/>'
    borders_xml += '</w:tcBorders>'
    tcPr.append(parse_xml(borders_xml))


def add_callout(doc, text, title="IMPORTANT NOTICE", callout_type="important"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    cell = tbl.cell(0, 0)
    cell.width = Inches(6.5)
    
    if callout_type == "important":
        bg_color = "F0F4F8"
        border_color = "ED1C24"  # AMD Crimson
        title_color = RGBColor(237, 28, 36)
    elif callout_type == "tip":
        bg_color = "F0FFF4"
        border_color = "10B981"  # Emerald
        title_color = RGBColor(16, 185, 129)
    else:
        bg_color = "F7FAFC"
        border_color = "4A5568"
        title_color = RGBColor(74, 85, 104)

    set_cell_background(cell, bg_color)
    set_cell_margins(cell, top=160, bottom=160, left=220, right=200)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders_xml = f'<w:tcBorders {nsdecls("w")}><w:left w:val="single" w:sz="32" w:space="0" w:color="{border_color}"/><w:top w:val="none"/><w:right w:val="none"/><w:bottom w:val="none"/></w:tcBorders>'
    tcPr.append(parse_xml(borders_xml))
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(3)
    r_title = p.add_run(f"[{title}] ")
    r_title.bold = True
    r_title.font.name = 'Calibri'
    r_title.font.size = Pt(10.5)
    r_title.font.color.rgb = title_color
    
    r_text = p.add_run(text)
    r_text.font.name = 'Calibri'
    r_text.font.size = Pt(10.5)
    r_text.font.color.rgb = RGBColor(45, 55, 72)
    
    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(6)


def format_table(tbl, col_widths, headers, data, header_bg="0F172A"):
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    # Header
    hdr_cells = tbl.rows[0].cells
    for i, title in enumerate(headers):
        hdr_cells[i].width = Inches(col_widths[i])
        set_cell_background(hdr_cells[i], header_bg)
        set_cell_margins(hdr_cells[i], top=120, bottom=120, left=140, right=140)
        set_cell_borders(hdr_cells[i], top="0F172A", bottom="0F172A", sz="8")
        p = hdr_cells[i].paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        run = p.add_run(title)
        run.bold = True
        run.font.name = 'Calibri'
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(255, 255, 255)
        
    trPr = tbl.rows[0]._tr.get_or_add_trPr()
    trPr.append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))

    # Data Rows
    for row_idx, row_data in enumerate(data):
        row = tbl.add_row()
        r_trPr = row._tr.get_or_add_trPr()
        r_trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
        
        bg = "FFFFFF" if row_idx % 2 == 0 else "F8FAFC"
        cells = row.cells
        for col_idx, cell_value in enumerate(row_data):
            cells[col_idx].width = Inches(col_widths[col_idx])
            set_cell_background(cells[col_idx], bg)
            set_cell_margins(cells[col_idx], top=90, bottom=90, left=130, right=130)
            set_cell_borders(cells[col_idx], top="E2E8F0", bottom="E2E8F0", sz="4")
            
            p = cells[col_idx].paragraphs[0]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.12
            
            parts = cell_value.split("**")
            for p_i, part in enumerate(parts):
                if not part:
                    continue
                run = p.add_run(part)
                run.font.name = 'Calibri'
                run.font.size = Pt(9.0)
                run.font.color.rgb = RGBColor(45, 55, 72)
                if p_i % 2 == 1:
                    run.bold = True


def add_heading_1(doc, text):
    h = doc.add_paragraph()
    h.paragraph_format.space_before = Pt(16)
    h.paragraph_format.space_after = Pt(6)
    h.paragraph_format.keep_with_next = True
    r = h.add_run(text)
    r.font.name = 'Calibri'
    r.font.size = Pt(15)
    r.bold = True
    r.font.color.rgb = RGBColor(237, 28, 36)  # AMD Red
    return h


def add_heading_2(doc, text):
    h = doc.add_paragraph()
    h.paragraph_format.space_before = Pt(12)
    h.paragraph_format.space_after = Pt(4)
    h.paragraph_format.keep_with_next = True
    r = h.add_run(text)
    r.font.name = 'Calibri'
    r.font.size = Pt(12.5)
    r.bold = True
    r.font.color.rgb = RGBColor(15, 23, 42)  # Slate 900
    return h


def add_heading_3(doc, text):
    h = doc.add_paragraph()
    h.paragraph_format.space_before = Pt(9)
    h.paragraph_format.space_after = Pt(3)
    h.paragraph_format.keep_with_next = True
    r = h.add_run(text)
    r.font.name = 'Calibri'
    r.font.size = Pt(10.5)
    r.bold = True
    r.font.color.rgb = RGBColor(71, 85, 105)  # Slate 600
    return h


def add_body(doc, text, bold_prefix=None, italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.bold = True
        r_pre.font.name = 'Calibri'
        r_pre.font.size = Pt(10)
        r_pre.font.color.rgb = RGBColor(15, 23, 42)
    r = p.add_run(text)
    r.font.name = 'Calibri'
    r.font.size = Pt(10)
    r.font.italic = italic
    r.font.color.rgb = RGBColor(45, 55, 72)
    return p


def add_bullet(doc, text, bold_prefix=None, level=0):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.left_indent = Inches(0.25 * (level + 1))
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.bold = True
        r_pre.font.name = 'Calibri'
        r_pre.font.size = Pt(10)
        r_pre.font.color.rgb = RGBColor(15, 23, 42)
    
    parts = text.split("**")
    for p_i, part in enumerate(parts):
        if not part:
            continue
        run = p.add_run(part)
        run.font.name = 'Calibri'
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(45, 55, 72)
        if p_i % 2 == 1:
            run.bold = True
    return p


def add_code_block(doc, code_text):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    cell = tbl.cell(0, 0)
    cell.width = Inches(6.5)
    set_cell_background(cell, "090D16")
    set_cell_margins(cell, top=120, bottom=120, left=160, right=160)
    set_cell_borders(cell, top="1E293B", bottom="1E293B", left="ED1C24", right="1E293B", sz="6")
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.line_spacing = 1.05
    
    lines = code_text.strip().split("\n")
    for idx, line in enumerate(lines):
        if idx > 0:
            p = cell.add_paragraph()
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.05
        r = p.add_run(line)
        r.font.name = 'Consolas'
        r.font.size = Pt(8.0)
        r.font.color.rgb = RGBColor(226, 232, 240)
        
    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(6)


def build_docx(output_path):
    doc = Document()
    
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        section.page_width = Inches(8.5)
        section.page_height = Inches(11.0)
        
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("AMD ACT III | Track 1: Intelligent Industry — Autonomous Supply Chain Exception Handler")
        hrun.font.name = 'Calibri'
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(160, 174, 192)
        
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("AMD Developer Hackathon ACT III Architecture Plan — Version 3.0 Production Specification")
        frun.font.name = 'Calibri'
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = RGBColor(160, 174, 192)

    # Document Header Title
    title_p = doc.add_paragraph()
    title_p.paragraph_format.space_before = Pt(0)
    title_p.paragraph_format.space_after = Pt(2)
    r_sup = title_p.add_run("AMD DEVELOPER HACKATHON ACT III · TRACK 1: INTELLIGENT INDUSTRY\n")
    r_sup.font.name = 'Calibri'
    r_sup.font.size = Pt(10)
    r_sup.bold = True
    r_sup.font.color.rgb = RGBColor(237, 28, 36)
    
    r_title = title_p.add_run("Autonomous Supply Chain Exception Handler\n& Plant Command Center")
    r_title.font.name = 'Calibri'
    r_title.font.size = Pt(21)
    r_title.bold = True
    r_title.font.color.rgb = RGBColor(15, 23, 42)

    sub_p = doc.add_paragraph()
    sub_p.paragraph_format.space_before = Pt(2)
    sub_p.paragraph_format.space_after = Pt(12)
    r_sub = sub_p.add_run("Production-Grade Architecture Specification Powered by AMD Instinct™ MI300X & google/gemma-2-27b-it")
    r_sub.font.name = 'Calibri'
    r_sub.font.size = Pt(11.0)
    r_sub.font.italic = True
    r_sub.font.color.rgb = RGBColor(100, 116, 139)

    # Executive Callout: North Star Benchmark
    add_callout(
        doc,
        "A critical shipment delay on steel coil (PO-8842 from Nordstahl) threatens to idle 26 stamping shifts on Line A ($169,000) and breach Tier-1 customer delivery contracts ($66,000 SLA penalty) for a total unmitigated financial exposure of $235,000. Operating on AMD Instinct MI300X accelerators with ROCm 6.3, our multi-agent pipeline ingests unstructured emails, maps BOM blast radius, re-sequences factory shift schedules to swap in aluminum stamping, and executes a 40-ton bridge buy with Kessler Regional Mill—delivering $221,080 in Net Savings (15.9x ROI Multiple) with 0 idle shifts.",
        title="EXECUTIVE NORTH STAR BENCHMARK ($235,000 RISK → $221,080 NET SAVED)",
        callout_type="important"
    )

    # Section 1: Business Case & Golden Scenario
    add_heading_1(doc, "1. Industrial Problem Statement & The Golden Scenario")
    add_body(doc, "In high-throughput automotive stamping facilities, just-in-time (JIT) coil inventory leaves virtually zero buffer for international maritime delays. Our target facility—the Brescia Stamping Plant—operates two continuous press lines:")
    add_bullet(doc, "**Line A (Heavy Press Stamping):** Consumes Cold-Rolled Steel Coil 2mm (MAT-STL-101) at 8.0 tons/day ($6,500/day idle cost) and Aluminum Sheet 3mm (MAT-ALU-202) for vehicle body stampings.")
    add_bullet(doc, "**Line B (Polymer & Fastener Assembly):** Produces intake manifolds and assemblies consuming Polyamide Resin (MAT-RSN-404) and M12 Fasteners (MAT-FST-303).")

    add_heading_2(doc, "The Golden Disruption Scenario: Nordstahl PO-8842")
    add_body(doc, "An inbound email from dispatch@nordstahl-logistics.de reports that shipment PO-8842 (140 metric tons of Cold-Rolled Steel Coil 2mm, ASTM A1008 / DC01) aboard MV Rhein Carrier has encountered severe vessel berth congestion and tugboat labor strikes at the Port of Rotterdam. Revised dock arrival is delayed by +14 days from D+5 to D+19.")

    bench_headers = ["Financial Exposure Category", "Quantity & Duration", "Unmitigated Impact", "Mitigated Impact (AI Bundle 1)"]
    bench_widths = [2.2, 1.5, 1.4, 1.4]
    bench_data = [
        ["**Line A Idle Shift Labor & Overhead**", "26 shifts (D+6..D+18)", "**$169,000 USD**", "**$0 (0 idle shifts)**"],
        ["**Apex EV Motors SLA Late Penalty**", "9 days late (FO-2026-901)", "**$45,000 USD**", "**$0 (On-time delivery)**"],
        ["**Boreal Trucks SLA Late Penalty**", "7 days late (FO-2026-905)", "**$21,000 USD**", "**$0 (On-time delivery)**"],
        ["**Total Financial Exposure**", "**Brescia Stamping Plant**", "**$235,000 USD**", "**$0 SLA Breaches**"],
        ["**Total Mitigation Spend**", "Freight + Premium + Tooling", "**$0**", "**$13,920 USD**"],
        ["**Net Projected Value Generated**", "**Return on Mitigation Spend**", "**-$235,000 Loss**", "**+$221,080 Net Saved (15.9x ROI)**"]
    ]
    tbl_bench = doc.add_table(rows=1, cols=4)
    format_table(tbl_bench, bench_widths, bench_headers, bench_data, header_bg="ED1C24")

    # Section 2: AMD ROCm Hardware & Gemma Architecture
    add_heading_1(doc, "2. AMD ROCm & Gemma-2-27b Acceleration Architecture")
    add_body(doc, "Unlike generic cloud LLMs that add unacceptable network round-trips and privacy compliance hurdles, our system is engineered to run on high-performance AMD hardware deployed on-premise or in private sovereign enclaves:")

    add_heading_2(doc, "A. Hardware Infrastructure: AMD Instinct™ MI300X")
    add_bullet(doc, "**192GB HBM3 Memory with 5.3 TB/s Bandwidth:** Massive memory capacity allows hosting `google/gemma-2-27b-it` in native bfloat16 precision with extensive KV caches for concurrent multi-agent chains without quantization degradation.")
    add_bullet(doc, "**ROCm 6.3 Software Stack:** Optimized FlashAttention-2 kernels and vLLM OpenAI-compatible server deliver sub-second multi-agent turnaround (<1,200ms end-to-end at >85 tokens/sec).")
    add_bullet(doc, "**Dual-Mode Hardware Resilience:** Supports both `AMD_LIVE` mode (connecting to live AMD Token Factory / vLLM endpoints) and `DETERMINISTIC_REPLAY` mode for crash-proof hackathon demonstrations.")

    # Section 3: System Architecture & Workflow Pipeline
    add_heading_1(doc, "3. Multi-Agent Pipeline & System Architecture")
    add_body(doc, "The system architecture partitions responsibility across 6 coordinated stages:")
    
    stages = [
        ("Stage 1: Signal Ingestion", "Captures raw supplier emails, carrier ASN webhooks, or ERP health scans and normalizes payload into a standardized DisruptionSignal."),
        ("Stage 2: Triage & Entity Extraction", "Gemma-2-27b on AMD MI300X extracts PO#, supplier, material specification, delay offset (+14d), and root cause (PORT_CONGESTION) with verbatim evidence quotes and a confidence meter (98.5%)."),
        ("Stage 3: BOM & Runway Impact Engine", "Calculates day-by-day inventory burn, flags stockout breach at D+6, traces affected factory production orders, and computes unmitigated financial risk ($235,000)."),
        ("Stage 4: Strategic Sourcing Engine", "Scores pre-approved backup suppliers (Helix, Kessler, Pacific) across lead-time fit (40%), vendor reliability (30%), unit price (20%), and weekly capacity (10%). Selects Kessler Regional Mill (Option B, composite score 91.2)."),
        ("Stage 5: Parallel RFQ Drafter & Shift Re-Sequencer", "Drafts 3 tailored B2B negotiation emails while concurrently re-sequencing the plant schedule: pulls forward 8 shifts of Aluminum Hood Panels (FO-2026-904) into D+6..D+9, completely eliminating line starvation."),
        ("Stage 6: Human Approval Gate & B2B Loop Closure", "Presents Option Bundle 1 ($13,920 cost -> $221,080 Net Saved) to the planner for inline RFQ editing and authorization, then simulates incoming vendor confirmations.")
    ]
    for s_title, s_desc in stages:
        add_bullet(doc, s_desc, bold_prefix=f"{s_title}: ")

    # Section 4: Database Schema (10 SQLite Tables)
    add_heading_1(doc, "4. Database Schema (Simulated ERP Sandbox)")
    add_body(doc, "The SQLite ERP sandbox (`backend/database/db.py`) models 10 relational tables supporting deterministic simulations and instant 1-click resets:")
    
    db_headers = ["Table Name", "Primary Key & Attributes", "Industrial Business Role"]
    db_widths = [1.5, 2.3, 2.7]
    db_data = [
        ["`materials`", "`id`, `name`, `spec`, `on_hand_qty`, `safety_stock_qty`, `daily_burn_rate`, `uom`", "Tracks inventory on-hand and daily burn rates for steel, aluminum, fasteners, and resin."],
        ["`suppliers`", "`id`, `name`, `tier`, `is_backup_approved`, `reliability_score`, `contact_email`, `location`", "Supplier master registry with historical on-time delivery ratings and pre-approval flags."],
        ["`supplier_materials`", "`supplier_id`, `material_id`, `unit_price`, `lead_time_days`, `weekly_capacity_tons`, `freight_cost_usd`", "Contract terms, standard lead times, and capacity for primary and backup vendors."],
        ["`purchase_orders`", "`id`, `supplier_id`, `material_id`, `qty`, `unit_price`, `original_eta_day`, `current_eta_day`, `status`", "Open inbound purchase orders monitored for transit delays."],
        ["`production_lines`", "`id`, `name`, `shifts_per_day`, `idle_shift_cost_usd`, `capable_materials_json`", "Press lines with daily capacity and financial cost of halted operations ($6,500/day)."],
        ["`production_orders`", "`id`, `customer`, `product`, `material_id`, `material_qty`, `line_id`, `scheduled_start_day`, `scheduled_end_day`, `deadline_day`, `penalty_per_day_usd`", "Customer delivery commitments with daily liquidated damages SLA clauses."],
        ["`factory_shifts`", "`id`, `day_offset`, `window` (DAY/SWING), `line_id`, `production_order_id`, `product_label`, `status`", "60 shift slots across 30 days modeling press allocations and starvation states."],
        ["`outbox_emails`", "`id`, `disruption_id`, `supplier_id`, `recipient_email`, `subject`, `body`, `status`, `sent_at`", "Audit trail of dispatched RFQ emails approved by the human operator."],
        ["`audit_logs`", "`id`, `disruption_id`, `timestamp`, `actor`, `action`, `details`", "Immutable compliance log capturing all agent decisions and human overrides."],
        ["`inference_metrics`", "`id`, `call_id`, `agent_name`, `model_id`, `gpu_device`, `prompt_tokens`, `completion_tokens`, `latency_ms`, `tokens_per_sec`", "Per-call AMD Instinct MI300X telemetry capturing latency and token throughput."]
    ]
    tbl_db = doc.add_table(rows=1, cols=3)
    format_table(tbl_db, db_widths, db_headers, db_data)

    # Section 5: Complete Catalog of All 34 Backend Functions
    add_heading_1(doc, "5. Catalog of All 34 Backend Functions")
    add_body(doc, "The backend comprises exactly 34 modular functions organized across 6 core subsystems:")

    add_heading_2(doc, "Subsystem 1: Ingestion & Signal Normalization (4 Functions)")
    f1 = [
        ("1. ingest_email_signal(payload: EmailSignalInput) -> DisruptionSignal", "Validates incoming email payloads, extracts sender, subject, body, and timestamp, generating a unique disruption identifier."),
        ("2. ingest_carrier_webhook(payload: CarrierWebhookInput) -> DisruptionSignal", "Normalizes telematics ASN webhooks (e.g., container manifest discrepancy) into standard disruption signals."),
        ("3. parse_unstructured_disruption_email(raw_text: str, model_client) -> DisruptionFacts", "Executes Gemma-2-27b on AMD MI300X to extract PO numbers, material specs, delay offsets, and root causes with confidence ratings."),
        ("4. resolve_erp_context(facts: DisruptionFacts, db_conn) -> ErpContext", "Queries SQLite database to match extracted entities against active open purchase orders and inventory records.")
    ]
    for fn_name, fn_desc in f1:
        add_bullet(doc, fn_desc, bold_prefix=f"{fn_name}: ")

    add_heading_2(doc, "Subsystem 2: BOM Explosion, Inventory Runway & Financial Blast Radius (6 Functions)")
    f2 = [
        ("5. calculate_inventory_runway(material_id, on_hand, burn_rate, delay_days, open_pos) -> InventoryRunwayReport", "Simulates day-by-day inventory trajectory over 30 days, calculating exact stockout day and shortage tonnage."),
        ("6. detect_safety_stock_breach(runway_curve, safety_stock_threshold) -> int", "Identifies the exact day offset where warehouse inventory drops below the mandatory safety threshold."),
        ("7. trace_bom_blast_radius(material_id, stockout_day, revised_arrival_day, db_conn) -> list[AffectedProductionOrder]", "Explodes manufacturing BOMs to identify which customer production orders are starved during the gap."),
        ("8. calculate_customer_sla_penalties(affected_orders: list[AffectedProductionOrder]) -> float", "Computes daily liquidated contract damages based on delay duration and customer SLA rates ($66,000 total)."),
        ("9. quantify_idle_press_exposure(affected_orders, production_lines, daily_shift_rate) -> float", "Calculates direct labor and overhead losses for starved press shifts (26 shifts @ $6,500/day = $169,000)."),
        ("10. synthesize_executive_risk_briefing(exposure_breakdown, material, facts, model_client) -> str", "Synthesizes an executive-level impact statement outlining total unmitigated exposure ($235,000).")
    ]
    for fn_name, fn_desc in f2:
        add_bullet(doc, fn_desc, bold_prefix=f"{fn_name}: ")

    add_heading_2(doc, "Subsystem 3: Strategic Sourcing & Multi-Criteria Supplier Scoring (6 Functions)")
    f3 = [
        ("11. query_qualified_backup_suppliers(material_id: str, db_conn) -> list[dict]", "Queries database for pre-approved backup suppliers holding compatible technical certifications."),
        ("12. calculate_multicriteria_supplier_score(supplier, required_tons, days_to_stockout, weights) -> float", "Evaluates candidates across lead-time fit (40%), reliability (30%), unit price (20%), and capacity (10%)."),
        ("13. rank_backup_suppliers(candidates, material, needed_qty, target_day) -> list[RankedSupplier]", "Ranks evaluated vendors into 3 archetypes: Option A (Fastest), Option B (Balanced/Recommended), and Option C (Cheapest)."),
        ("14. synthesize_tailored_rfq_draft(supplier: RankedSupplier, bridge_qty, target_day, model_client) -> RfqDraft", "Prompts Gemma-2-27b on AMD MI300X to draft commercial negotiation emails tailored to vendor profiles."),
        ("15. validate_rfq_guardrails(rfq: RfqDraft, material_spec: str) -> tuple[bool, list[str]]", "Validates that drafted RFQs contain strict technical specs (ASTM A1008 DC01), Incoterms DDP, and late delivery penalty clauses."),
        ("16. batch_generate_rfqs(ranked_suppliers, bridge_tons, target_arrival_day) -> list[RfqDraft]", "Coordinates parallel draft generation and validation across all ranked backup suppliers.")
    ]
    for fn_name, fn_desc in f3:
        add_bullet(doc, fn_desc, bold_prefix=f"{fn_name}: ")

    add_heading_2(doc, "Subsystem 4: Operations Research Shift Re-Sequencer & Optimizer (6 Functions)")
    f4 = [
        ("17. scan_factory_shift_calendar(line_id: str, start_day: int, end_day: int, db_conn) -> list[ShiftSlot]", "Reads the 30-day shift schedule across Day and Swing windows for Line A."),
        ("18. identify_starved_shift_slots(shifts: list[ShiftSlot], material_id: str, stockout_day: int) -> list[ShiftSlot]", "Flags all shift slots occurring after the stockout date that require the missing material."),
        ("19. find_swappable_candidate_orders(starved_slots, line_id, db_conn) -> list[dict]", "Scans future production orders on the line capable of running on non-impacted on-hand materials (e.g. Aluminum)."),
        ("20. execute_heuristic_shift_swap(shifts, candidate_order, target_start_day) -> list[ShiftSlot]", "Pulls forward 8 shifts of Aluminum Hood Panels (FO-2026-904) into D+6..D+9, keeping the stamping press fully occupied."),
        ("21. calculate_changeover_costs(schedule_before, schedule_after, unit_changeover_cost) -> float", "Computes die/tooling changeover costs incurred by re-sequencing the production schedule (2 changeovers = $3,000)."),
        ("22. generate_shift_swap_explanation(proposal: ShiftProposal, model_client) -> str", "Generates natural-language operational justification for the shift adjustment plan.")
    ]
    for fn_name, fn_desc in f4:
        add_bullet(doc, fn_desc, bold_prefix=f"{fn_name}: ")

    add_heading_2(doc, "Subsystem 5: Mitigation Bundling & Decision Governance (5 Functions)")
    f5 = [
        ("23. assemble_mitigation_option_bundles(sourcing_quotes, shift_proposal, exposure) -> list[MitigationOptionBundle]", "Combines shift schedules and backup supplier quotes into actionable bundles (Bundle 1: Swap + Kessler vs Bundle 2: Helix Expedite)."),
        ("24. calculate_bundle_roi(bundle_cost: float, unmitigated_exposure: float) -> tuple[float, float]", "Calculates net financial savings ($221,080) and ROI multiple (15.9x)."),
        ("25. enforce_human_approval_gate(disruption_id: str, state: WorkflowStateSnapshot) -> WorkflowStateSnapshot", "Pauses pipeline execution at the HITL gate, emitting AWAITING_APPROVAL status over SSE."),
        ("26. process_operator_decision(disruption_id, decision: HumanDecisionInput, db_conn) -> WorkflowStateSnapshot", "Applies human authorizations, inline RFQ edits, revision requests, or plan rejections."),
        ("27. resolve_po_ambiguity_clarification(disruption_id, clarification: ClarificationInput, db_conn) -> WorkflowStateSnapshot", "Binds an ambiguous email to an operator-selected purchase order (Scenario 4).")
    ]
    for fn_name, fn_desc in f5:
        add_bullet(doc, fn_desc, bold_prefix=f"{fn_name}: ")

    add_heading_2(doc, "Subsystem 6: Execution, B2B Simulation & Audit Logging (7 Functions)")
    f6 = [
        ("28. dispatch_approved_rfqs_to_outbox(approved_rfqs: list[RfqDraft], db_conn) -> list[dict]", "Commits approved RFQ emails to the outbox database table."),
        ("29. commit_shift_schedule_to_erp(resequenced_slots: list[ShiftSlot], db_conn) -> bool", "Updates factory shift tables in SQLite to reflect the re-sequenced schedule."),
        ("30. simulate_incoming_supplier_replies(disruption_id: str, outbox_rfqs, db_conn) -> list[SupplierReplySimulation]", "Simulates vendor confirmations and counter-offers to demonstrate closed-loop execution."),
        ("31. record_audit_log_entry(disruption_id: str, actor: str, action: str, details: str, db_conn) -> None", "Appends immutable timestamped actions for regulatory compliance and auditability."),
        ("32. capture_inference_metric(agent_name, model_id, prompt_tokens, completion_tokens, latency_ms, db_conn) -> InferenceMetric", "Logs AMD Instinct MI300X telemetry and token throughput for each LLM invocation."),
        ("33. stream_workflow_state_sse(disruption_id: str, event_generator) -> AsyncGenerator", "Streams real-time state changes and thought logs to the browser via HTML5 Server-Sent Events."),
        ("34. reset_erp_sandbox_state(db_conn) -> dict", "Resets database tables to clean deterministic baseline in <50ms for repeatable demonstrations.")
    ]
    for fn_name, fn_desc in f6:
        add_bullet(doc, fn_desc, bold_prefix=f"{fn_name}: ")

    # Section 6: Frontend Command Center Architecture
    add_heading_1(doc, "6. Industrial Command Center UI Architecture")
    add_body(doc, "The frontend is a single-page application (`frontend/index.html`) rendered with React 18 CDN and Tailwind CSS CDN, served directly by FastAPI with zero build delay:")
    add_bullet(doc, "**Top Command Bar:** Displays plant persona (Giulia Rossi), live timer, active disruption status, exposure ticker ($235,000), net savings ticker ($221,080 / 15.9x ROI), and AMD Instinct MI300X / ROCm 6.3 telemetry pill.")
    add_bullet(doc, "**1-Click Scenario Injector:** Buttons for Golden Steel Delay, Resin -40% Shortage, Fasteners +2d Minor Delay, and Ambiguous Email Missing PO#.")
    add_bullet(doc, "**Multi-Agent Pipeline & CoT Stream:** Visualizes the 6 workflow stages with animated status rings and a live scrolling agent thought stream.")
    add_bullet(doc, "**Triage & Evidence Extraction Card:** Highlights verbatim evidence quotes extracted by Gemma-2-27b with confidence scores.")
    add_bullet(doc, "**30-Day Inventory Runway SVG Chart:** Responsive chart plotting Unmitigated stockout curve (hitting zero at D+6) versus Mitigated curve staying above safety stock.")
    add_bullet(doc, "**Factory Shift Schedule Diff Grid:** Visual 30-day grid (60 shifts) showing 26 starved shifts in Before row replaced by swapped aluminum shifts and bridge buy coverage in After row.")
    add_bullet(doc, "**3-Supplier Scorecard & RFQ Composer:** Compares Helix, Kessler, and Pacific, featuring inline-editable email bodies with automated guardrail validation.")
    add_bullet(doc, "**Sticky Human Approval Dock:** Bottom command bar allowing operators to approve, revise, or reject plans, followed by live vendor reply simulation.")

    # Save document
    doc.save(output_path)
    print(f"Successfully generated updated v3 DOCX at: {output_path}")


if __name__ == "__main__":
    out_file = os.path.abspath("Autonomous_Supply_Chain_Exception_Handler_Plan.docx")
    build_docx(out_file)
