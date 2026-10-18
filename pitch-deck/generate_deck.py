#!/usr/bin/env python3
"""ProcureX Hackathon Pitch Deck Generator.

Updated to match the frontend Design System (DESIGN.md & frontend/styles.css):
- Canvas: #F8F9FC (Light SaaS Canvas)
- Surfaces: #FFFFFF (White Cards with #E2E8F0 borders & subtle elevation)
- Primary Text: #1E293B (Dark Slate / Charcoal)
- Muted Text: #64748B (Medium Slate)
- Primary Blue: #0D6EFD (Navbar / CTA Blue)
- Secondary Orange: #F97316 (Simulate / Alert Orange)
- Success Green: #10B981 (Terminal Emerald / Uptime Green)
- Pill Fills: #EFF6FF (Blue), #FFF7ED (Orange), #ECFDF5 (Green)
- Typography: Plus Jakarta Sans / JetBrains Mono
- Strict Anti-Slop Lock: <= 30 words per slide, 0 forbidden buzzwords.
"""
from __future__ import annotations

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

# Frontend Design System Color Tokens (Exact Hex Codes)
COLOR_BG = RGBColor(0xF8, 0xF9, 0xFC)        # #F8F9FC (Canvas Light Surface)
COLOR_SURFACE = RGBColor(0xFF, 0xFF, 0xFF)   # #FFFFFF (White Card Surface)
COLOR_BORDER = RGBColor(0xE2, 0xE8, 0xF0)    # #E2E8F0 (Subtle Slate Border)
COLOR_TEXT_PRI = RGBColor(0x1E, 0x29, 0x3B)  # #1E293B (Dark Slate Heading)
COLOR_TEXT_MUTED = RGBColor(0x64, 0x74, 0x8B)# #64748B (Muted Slate Body)
COLOR_BLUE = RGBColor(0x0D, 0x6E, 0xFD)      # #0D6EFD (Navbar Primary Blue)
COLOR_ORANGE = RGBColor(0xF9, 0x73, 0x16)    # #F97316 (Secondary Alert Orange)
COLOR_EMERALD = RGBColor(0x10, 0xB9, 0x81)   # #10B981 (Success Emerald Green)

# Soft Badge Pill Fills
COLOR_BLUE_PILL = RGBColor(0xEF, 0xF6, 0xFF) # #EFF6FF
COLOR_ORANGE_PILL = RGBColor(0xFF, 0xF7, 0xED)# #FFF7ED
COLOR_GREEN_PILL = RGBColor(0xEC, 0xFD, 0xF5)# #ECFDF5

FONT_HEADING = "Plus Jakarta Sans"
FONT_BODY = "Plus Jakarta Sans"
FONT_MONO = "JetBrains Mono"


def set_slide_background(slide) -> None:
    """Set the clean #F8F9FC canvas background."""
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = COLOR_BG


def add_index_badge(slide, index_str: str) -> None:
    """Subtle monospace slide index at bottom right."""
    box = slide.shapes.add_textbox(Inches(9.1), Inches(5.05), Inches(0.6), Inches(0.35))
    tf = box.text_frame
    tf.word_wrap = False
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.RIGHT
    run = p.add_run()
    run.text = index_str
    run.font.name = FONT_MONO
    run.font.size = Pt(11)
    run.font.bold = True
    run.font.color.rgb = COLOR_TEXT_MUTED


def add_card(
    slide,
    left: float,
    top: float,
    width: float,
    height: float,
    border_color=COLOR_BORDER,
    border_width: float = 1.0,
    fill_color=COLOR_SURFACE
):
    """Create a crisp rounded rectangle surface matching frontend .saas-card."""
    shape = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(left),
        Inches(top),
        Inches(width),
        Inches(height)
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    shape.line.color.rgb = border_color
    shape.line.width = Pt(border_width)
    return shape


def add_tag(slide, text: str, left: float = 0.6, top: float = 0.55, color=COLOR_BLUE) -> None:
    """Section category tag in monospace uppercase matching frontend badges."""
    box = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(7.0), Inches(0.35))
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    run = p.add_run()
    run.text = text
    run.font.name = FONT_MONO
    run.font.size = Pt(10)
    run.font.bold = True
    run.font.color.rgb = color


def build_deck(output_pptx_path: str) -> None:
    """Compile the native 16:9 7-slide deck using the frontend design system."""
    prs = Presentation()
    prs.slide_width = Inches(10.0)
    prs.slide_height = Inches(5.625)
    blank_layout = prs.slide_layouts[6]

    # =========================================================================
    # SLIDE 01: Title & Concrete Hook (27 words total)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1)
    add_index_badge(s1, "01")

    # Dual circular glyph logo from frontend (Blue #0D6EFD & Orange #F97316)
    c1 = s1.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.6), Inches(0.65), Inches(0.38), Inches(0.38))
    c1.fill.solid()
    c1.fill.fore_color.rgb = COLOR_BLUE_PILL
    c1.line.color.rgb = COLOR_BLUE
    c1.line.width = Pt(2.5)

    c2 = s1.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.82), Inches(0.65), Inches(0.38), Inches(0.38))
    c2.fill.solid()
    c2.fill.fore_color.rgb = COLOR_ORANGE_PILL
    c2.line.color.rgb = COLOR_ORANGE
    c2.line.width = Pt(2.5)

    # Track badge card
    add_card(s1, 1.35, 0.68, 2.7, 0.32, border_color=COLOR_BORDER, fill_color=COLOR_SURFACE)
    b_box = s1.shapes.add_textbox(Inches(1.48), Inches(0.73), Inches(2.4), Inches(0.22))
    b_tf = b_box.text_frame
    b_tf.margin_left = b_tf.margin_top = b_tf.margin_right = b_tf.margin_bottom = 0
    b_p = b_tf.paragraphs[0]
    b_run = b_p.add_run()
    b_run.text = "AMD ACT III · TRACK 1"
    b_run.font.name = FONT_MONO
    b_run.font.size = Pt(9.5)
    b_run.font.bold = True
    b_run.font.color.rgb = COLOR_BLUE

    # Hero title
    t_box = s1.shapes.add_textbox(Inches(0.6), Inches(1.35), Inches(8.8), Inches(1.15))
    t_tf = t_box.text_frame
    t_tf.word_wrap = True
    t_tf.margin_left = t_tf.margin_top = t_tf.margin_right = t_tf.margin_bottom = 0
    t_p = t_tf.paragraphs[0]
    t_run1 = t_p.add_run()
    t_run1.text = "ProcureX"
    t_run1.font.name = FONT_HEADING
    t_run1.font.size = Pt(56)
    t_run1.font.bold = True
    t_run1.font.color.rgb = COLOR_TEXT_PRI

    t_run2 = t_p.add_run()
    t_run2.text = "."
    t_run2.font.name = FONT_HEADING
    t_run2.font.size = Pt(56)
    t_run2.font.bold = True
    t_run2.font.color.rgb = COLOR_BLUE

    # Sub-hook
    h_box = s1.shapes.add_textbox(Inches(0.6), Inches(2.7), Inches(7.6), Inches(1.2))
    h_tf = h_box.text_frame
    h_tf.word_wrap = True
    h_tf.margin_left = h_tf.margin_top = h_tf.margin_right = h_tf.margin_bottom = 0
    h_p = h_tf.paragraphs[0]
    h_run1 = h_p.add_run()
    h_run1.text = "Autonomous supply chain exception handler. Resolves factory delays in "
    h_run1.font.name = FONT_BODY
    h_run1.font.size = Pt(17)
    h_run1.font.color.rgb = COLOR_TEXT_MUTED

    h_run2 = h_p.add_run()
    h_run2.text = "3 seconds"
    h_run2.font.name = FONT_BODY
    h_run2.font.size = Pt(17)
    h_run2.font.bold = True
    h_run2.font.color.rgb = COLOR_TEXT_PRI

    h_run3 = h_p.add_run()
    h_run3.text = " on MI300X."
    h_run3.font.name = FONT_BODY
    h_run3.font.size = Pt(17)
    h_run3.font.color.rgb = COLOR_TEXT_MUTED

    # Monospace hardware footnote in terminal emerald
    f_box = s1.shapes.add_textbox(Inches(0.6), Inches(4.5), Inches(8.0), Inches(0.4))
    f_tf = f_box.text_frame
    f_tf.margin_left = f_tf.margin_top = f_tf.margin_right = f_tf.margin_bottom = 0
    f_p = f_tf.paragraphs[0]
    f_run = f_p.add_run()
    f_run.text = "ROCm 6.3 · Gemma-2-27B · <1,200ms"
    f_run.font.name = FONT_MONO
    f_run.font.size = Pt(11)
    f_run.font.bold = True
    f_run.font.color.rgb = COLOR_EMERALD

    # =========================================================================
    # SLIDE 02: The Specific Friction (Problem) (26 words total)
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2)
    add_index_badge(s2, "02")
    add_tag(s2, "PROBLEM // 48-HOUR SCRAMBLE", color=COLOR_ORANGE)

    # Left card (40%) - Focal 64pt stat with soft orange container
    add_card(s2, 0.6, 1.05, 3.4, 3.9, border_color=COLOR_BORDER, fill_color=COLOR_ORANGE_PILL)
    m_box = s2.shapes.add_textbox(Inches(0.85), Inches(1.3), Inches(2.9), Inches(3.4))
    m_tf = m_box.text_frame
    m_tf.word_wrap = True
    m_tf.margin_left = m_tf.margin_top = m_tf.margin_right = m_tf.margin_bottom = 0

    m_p1 = m_tf.paragraphs[0]
    r_stat = m_p1.add_run()
    r_stat.text = "$235K\n"
    r_stat.font.name = FONT_HEADING
    r_stat.font.size = Pt(64)
    r_stat.font.bold = True
    r_stat.font.color.rgb = COLOR_ORANGE

    m_p2 = m_tf.add_paragraph()
    r_sub = m_p2.add_run()
    r_sub.text = "Unmitigated Exposure\n\n"
    r_sub.font.name = FONT_HEADING
    r_sub.font.size = Pt(14)
    r_sub.font.bold = True
    r_sub.font.color.rgb = COLOR_TEXT_PRI

    m_p3 = m_tf.add_paragraph()
    r_ctx = m_p3.add_run()
    r_ctx.text = "PO-8842 steel delayed 14d."
    r_ctx.font.name = FONT_BODY
    r_ctx.font.size = Pt(13)
    r_ctx.font.color.rgb = COLOR_TEXT_MUTED

    # Right card (60%) - Status Quo timeline
    add_card(s2, 4.2, 1.05, 5.2, 3.9, border_color=COLOR_BORDER, fill_color=COLOR_SURFACE)
    sq_box = s2.shapes.add_textbox(Inches(4.5), Inches(1.4), Inches(4.6), Inches(3.2))
    sq_tf = sq_box.text_frame
    sq_tf.word_wrap = True
    sq_tf.margin_left = sq_tf.margin_top = sq_tf.margin_right = sq_tf.margin_bottom = 0

    steps = [
        ("D+0: ", "Email buried in inbox.\n\n", COLOR_TEXT_MUTED, COLOR_TEXT_PRI),
        ("D+2: ", "Spreadsheets miss stockout.\n\n", COLOR_TEXT_MUTED, COLOR_TEXT_PRI),
        ("D+6: ", "Line A halts ($169K).", COLOR_ORANGE, COLOR_ORANGE),
    ]
    for idx, (prefix, body, col1, col2) in enumerate(steps):
        p_step = sq_tf.paragraphs[0] if idx == 0 else sq_tf.add_paragraph()
        rp1 = p_step.add_run()
        rp1.text = prefix
        rp1.font.name = FONT_MONO
        rp1.font.size = Pt(13)
        rp1.font.bold = True
        rp1.font.color.rgb = col1

        rp2 = p_step.add_run()
        rp2.text = body
        rp2.font.name = FONT_BODY
        rp2.font.size = Pt(13)
        rp2.font.color.rgb = col2

    # =========================================================================
    # SLIDE 03: The Solution (Before vs. After) (30 words total)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3)
    add_index_badge(s3, "03")
    add_tag(s3, "SCHEDULE + SOURCING CO-OPTIMIZATION", color=COLOR_BLUE)

    # Left card: Manual Scramble (Muted slate styling)
    add_card(s3, 0.6, 1.05, 4.2, 3.9, border_color=COLOR_BORDER, fill_color=COLOR_SURFACE)
    sc_box = s3.shapes.add_textbox(Inches(0.85), Inches(1.3), Inches(3.7), Inches(3.4))
    sc_tf = sc_box.text_frame
    sc_tf.word_wrap = True
    sc_tf.margin_left = sc_tf.margin_top = sc_tf.margin_right = sc_tf.margin_bottom = 0

    sc_p1 = sc_tf.paragraphs[0]
    r_sct = sc_p1.add_run()
    r_sct.text = "MANUAL (48H)\n\n"
    r_sct.font.name = FONT_HEADING
    r_sct.font.size = Pt(15)
    r_sct.font.bold = True
    r_sct.font.color.rgb = COLOR_TEXT_MUTED

    sc_p2 = sc_tf.add_paragraph()
    r_scb = sc_p2.add_run()
    r_scb.text = "Spot buy: $18.2K.\nLine starved 26 shifts.\nSLA fine: $66K."
    r_scb.font.name = FONT_BODY
    r_scb.font.size = Pt(13)
    r_scb.font.color.rgb = COLOR_TEXT_MUTED

    # Right card: ProcureX (Primary Blue border & soft blue tint)
    add_card(s3, 5.0, 1.05, 4.4, 3.9, border_color=COLOR_BLUE, border_width=1.8, fill_color=COLOR_BLUE_PILL)
    px_box = s3.shapes.add_textbox(Inches(5.25), Inches(1.3), Inches(3.9), Inches(3.4))
    px_tf = px_box.text_frame
    px_tf.word_wrap = True
    px_tf.margin_left = px_tf.margin_top = px_tf.margin_right = px_tf.margin_bottom = 0

    px_p1 = px_tf.paragraphs[0]
    r_pxt = px_p1.add_run()
    r_pxt.text = "PROCUREX (3S)\n\n"
    r_pxt.font.name = FONT_HEADING
    r_pxt.font.size = Pt(15)
    r_pxt.font.bold = True
    r_pxt.font.color.rgb = COLOR_BLUE

    px_p2 = px_tf.add_paragraph()
    r_pxb = px_p2.add_run()
    r_pxb.text = "Swaps in aluminum orders.\nKessler bridge buy saves $221K (15.9x ROI)."
    r_pxb.font.name = FONT_BODY
    r_pxb.font.size = Pt(13)
    r_pxb.font.bold = True
    r_pxb.font.color.rgb = COLOR_TEXT_PRI

    # =========================================================================
    # SLIDE 04: Live Demo Framing & Core User Journey (25 words total)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4)
    add_index_badge(s4, "04")
    add_tag(s4, "CORE JOURNEY", color=COLOR_BLUE)

    demo_cards = [
        (0.6, "01 INGEST", "PO-8842 delay email parsed with confidence.", COLOR_TEXT_MUTED, COLOR_SURFACE, COLOR_BORDER),
        (3.62, "02 RE-SEQUENCE", "Shifts swap to on-hand aluminum.", COLOR_ORANGE, COLOR_ORANGE_PILL, COLOR_ORANGE),
        (6.65, "03 EXECUTE", "Approved bridge RFQ saves $221K.", COLOR_BLUE, COLOR_BLUE_PILL, COLOR_BLUE),
    ]

    for left, step_label, desc, step_col, card_fill, card_line in demo_cards:
        add_card(s4, left, 1.15, 2.75, 3.7, border_color=card_line, fill_color=card_fill)
        c_box = s4.shapes.add_textbox(Inches(left + 0.2), Inches(1.4), Inches(2.35), Inches(3.2))
        c_tf = c_box.text_frame
        c_tf.word_wrap = True
        c_tf.margin_left = c_tf.margin_top = c_tf.margin_right = c_tf.margin_bottom = 0

        p1 = c_tf.paragraphs[0]
        r1 = p1.add_run()
        r1.text = f"{step_label}\n\n"
        r1.font.name = FONT_MONO
        r1.font.size = Pt(12)
        r1.font.bold = True
        r1.font.color.rgb = step_col

        p2 = c_tf.add_paragraph()
        r2 = p2.add_run()
        r2.text = desc
        r2.font.name = FONT_BODY
        r2.font.size = Pt(13)
        r2.font.color.rgb = COLOR_TEXT_PRI

    # =========================================================================
    # SLIDE 05: Under the Hood (Architecture & Sponsor Tech) (30 words total)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5)
    add_index_badge(s5, "05")
    add_tag(s5, "SYSTEM ARCHITECTURE", color=COLOR_BLUE)

    # Left Card: Multi-Agent Flow (55%)
    add_card(s5, 0.6, 1.05, 4.8, 3.9, border_color=COLOR_BORDER, fill_color=COLOR_SURFACE)
    flow_box = s5.shapes.add_textbox(Inches(0.85), Inches(1.4), Inches(4.3), Inches(3.2))
    flow_tf = flow_box.text_frame
    flow_tf.word_wrap = True
    flow_tf.margin_left = flow_tf.margin_top = flow_tf.margin_right = flow_tf.margin_bottom = 0

    flow_nodes = [
        ("FastAPI", COLOR_TEXT_MUTED),
        ("Gemma-2-27B", COLOR_BLUE),
        ("Shift Optimizer", COLOR_BLUE),
        ("HITL Approval", COLOR_TEXT_MUTED),
    ]
    for idx, (node, col) in enumerate(flow_nodes):
        np = flow_tf.paragraphs[0] if idx == 0 else flow_tf.add_paragraph()
        nr = np.add_run()
        arrow = "  ↓  " if idx < len(flow_nodes) - 1 else ""
        nr.text = f"[ {node} ]{arrow}\n"
        nr.font.name = FONT_MONO
        nr.font.size = Pt(11)
        nr.font.bold = True
        nr.font.color.rgb = col

    # Right Card: Hardware & Hurdles (45%) with soft blue card tint
    add_card(s5, 5.6, 1.05, 3.8, 3.9, border_color=COLOR_BORDER, fill_color=COLOR_BLUE_PILL)
    sp_box = s5.shapes.add_textbox(Inches(5.85), Inches(1.3), Inches(3.3), Inches(3.4))
    sp_tf = sp_box.text_frame
    sp_tf.word_wrap = True
    sp_tf.margin_left = sp_tf.margin_top = sp_tf.margin_right = sp_tf.margin_bottom = 0

    spp1 = sp_tf.paragraphs[0]
    spr1 = spp1.add_run()
    spr1.text = "85 TOKENS/S\n"
    spr1.font.name = FONT_HEADING
    spr1.font.size = Pt(36)
    spr1.font.bold = True
    spr1.font.color.rgb = COLOR_BLUE

    spp2 = sp_tf.add_paragraph()
    spr2 = spp2.add_run()
    spr2.text = "AMD Instinct MI300X.\n\n"
    spr2.font.name = FONT_BODY
    spr2.font.size = Pt(13)
    spr2.font.bold = True
    spr2.font.color.rgb = COLOR_TEXT_PRI

    spp3 = sp_tf.add_paragraph()
    spr3 = spp3.add_run()
    spr3.text = "Sub-1,200ms pipeline with deterministic replay."
    spr3.font.name = FONT_BODY
    spr3.font.size = Pt(12)
    spr3.font.color.rgb = COLOR_TEXT_MUTED

    # =========================================================================
    # SLIDE 06: Validation, Benchmarks & Impact (17 words total)
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6)
    add_index_badge(s6, "06")
    add_tag(s6, "VALIDATED BENCHMARKS", color=COLOR_BLUE)

    benchmarks = [
        (0.6, "<1,200ms", "Multi-agent MI300X execution.", COLOR_BLUE, COLOR_BLUE_PILL),
        (3.62, "15.9x", "$13.9K spend recovers $221K.", COLOR_ORANGE, COLOR_ORANGE_PILL),
        (6.65, "0 IDLE", "100% press utilization.", COLOR_EMERALD, COLOR_GREEN_PILL),
    ]

    for left, val, desc, val_col, bg_col in benchmarks:
        add_card(s6, left, 1.15, 2.75, 3.7, border_color=COLOR_BORDER, fill_color=bg_col)
        b_box = s6.shapes.add_textbox(Inches(left + 0.2), Inches(1.4), Inches(2.35), Inches(3.2))
        b_tf = b_box.text_frame
        b_tf.word_wrap = True
        b_tf.margin_left = b_tf.margin_top = b_tf.margin_right = b_tf.margin_bottom = 0

        bp1 = b_tf.paragraphs[0]
        br_val = bp1.add_run()
        br_val.text = f"{val}\n\n"
        br_val.font.name = FONT_HEADING
        br_val.font.size = Pt(38)
        br_val.font.bold = True
        br_val.font.color.rgb = val_col

        bp2 = b_tf.add_paragraph()
        br_desc = bp2.add_run()
        br_desc.text = desc
        br_desc.font.name = FONT_BODY
        br_desc.font.size = Pt(13)
        br_desc.font.color.rgb = COLOR_TEXT_PRI

    # =========================================================================
    # SLIDE 07: Post-Hackathon Roadmap & Team (24 words total)
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7)
    add_index_badge(s7, "07")
    add_tag(s7, "ROADMAP & DEPLOYMENT", color=COLOR_BLUE)

    # Left Card: Roadmap Milestones (60%)
    add_card(s7, 0.6, 1.05, 5.2, 3.9, border_color=COLOR_BORDER, fill_color=COLOR_SURFACE)
    rm_box = s7.shapes.add_textbox(Inches(0.85), Inches(1.4), Inches(4.7), Inches(3.2))
    rm_tf = rm_box.text_frame
    rm_tf.word_wrap = True
    rm_tf.margin_left = rm_tf.margin_top = rm_tf.margin_right = rm_tf.margin_bottom = 0

    milestones = [
        ("+30D: ", "ERP webhooks.\n\n"),
        ("+60D: ", "Port congestion AIS feeds.\n\n"),
        ("+90D: ", "Autonomous supplier negotiations."),
    ]
    for idx, (tag, desc) in enumerate(milestones):
        mp = rm_tf.paragraphs[0] if idx == 0 else rm_tf.add_paragraph()
        mr1 = mp.add_run()
        mr1.text = tag
        mr1.font.name = FONT_MONO
        mr1.font.size = Pt(12)
        mr1.font.bold = True
        mr1.font.color.rgb = COLOR_BLUE

        mr2 = mp.add_run()
        mr2.text = desc
        mr2.font.name = FONT_BODY
        mr2.font.size = Pt(13)
        mr2.font.color.rgb = COLOR_TEXT_PRI

    # Right Card: Demo & Repo (40%)
    add_card(s7, 6.0, 1.05, 3.4, 3.9, border_color=COLOR_BORDER, fill_color=COLOR_SURFACE)
    d_box = s7.shapes.add_textbox(Inches(6.25), Inches(1.4), Inches(2.9), Inches(3.2))
    d_tf = d_box.text_frame
    d_tf.word_wrap = True
    d_tf.margin_left = d_tf.margin_top = d_tf.margin_right = d_tf.margin_bottom = 0

    dp1 = d_tf.paragraphs[0]
    dr1 = dp1.add_run()
    dr1.text = "github.com/b3rtuso/ProcureX\n\n"
    dr1.font.name = FONT_MONO
    dr1.font.size = Pt(11)
    dr1.font.color.rgb = COLOR_BLUE

    dp2 = d_tf.add_paragraph()
    dr2 = dp2.add_run()
    dr2.text = "Live on localhost:8000\n\nFastAPI · ROCm 6.3"
    dr2.font.name = FONT_MONO
    dr2.font.size = Pt(11)
    dr2.font.color.rgb = COLOR_EMERALD

    # Save presentation
    os.makedirs(os.path.dirname(output_pptx_path), exist_ok=True)
    prs.save(output_pptx_path)
    print(f"Successfully generated frontend-styled 16:9 pitch deck: {output_pptx_path}")


if __name__ == "__main__":
    out_file = os.path.abspath("pitch-deck/output.pptx")
    build_deck(out_file)
