# Implementation Plan: ProcureX 7-Slide Pitch Deck
### Staff Product Designer & Hackathon Judge Edition
**Aesthetic:** Exact Frontend SaaS Design System (`DESIGN.md` & `frontend/styles.css`)  
**Canvas:** 16:9 widescreen (`10.0" x 5.625"`)  
**Strict Anti-Slop Lock:** Hard cap of <= 30 words per slide. Zero forbidden buzzwords. 1 focal visual decision per slide.

---

## 1. Design System & Frontend Token Specifications

| Token | Exact Hex | Role & Usage Rule |
| :--- | :--- | :--- |
| **Canvas Background** | `#F8F9FC` | Main application light background for all 7 slides |
| **Card Surface** | `#FFFFFF` | 24px rounded surface cards (`.saas-card`) with `#E2E8F0` border |
| **Card Divider / Border** | `#E2E8F0` | Crisp structural card borders |
| **Primary Text** | `#1E293B` | Dark Slate (700–800) for headers and primary values |
| **Secondary / Muted Text** | `#64748B` | Muted technical slate (500–600) for descriptions and metadata |
| **Primary Navbar Blue** | `#0D6EFD` | Active links, primary CTA buttons, and key badges |
| **Secondary Alert Orange** | `#F97316` | Critical exposure highlights (`$235K`), simulation cards (`#FFF7ED`) |
| **Success Emerald Green** | `#10B981` | Uptime efficiency (`0 IDLE`), live telemetry, verified savings |
| **Pill Fills** | `#EFF6FF` / `#FFF7ED` / `#ECFDF5` | Soft pastel containers for badges and highlighted cards |

### Dual Circular Glyph Brand Logo
- **Left Circle:** `#0D6EFD` (Navbar Blue) with `#EFF6FF` fill
- **Right Circle:** `#F97316` (Secondary Orange) with `#FFF7ED` fill, overlapping by 10px

### Typography Hierarchy
- **Hero Statements & Display Numbers:** `Plus Jakarta Sans` / `Space Grotesk` (44pt–72pt, bold, tight tracking)
- **Section Headers & Card Titles:** `Plus Jakarta Sans` (15pt–20pt, bold)
- **Body & Subtitles:** `Plus Jakarta Sans` (13pt–17pt, 1.35 line spacing)
- **Technical Badges & Monospace Telemetry:** `JetBrains Mono` (9.5pt–11pt, tabular figures)

### Layout Geometry
- Slide dimensions: `10.0" x 5.625"` (16:9)
- Outer margins: `0.6"` all sides
- Usable width: `8.8"`, usable height: `4.425"`
- Monospace slide index badge (`01` through `07`): Bottom right at `x: 9.1", y: 5.05"`

---

## 2. Slide-by-Slide Copy, Layout Geometry & Word Counts

### Slide 01: Title & Concrete Hook
- **Dominant Visual:** Dual circular glyph logo (`#0D6EFD` & `#F97316`) + 56pt Hero Title + Blue Period Accent + AMD Hardware Badge.
- **Layout Geometry:**
  - Dual Logo: `x: 0.6", y: 0.65", w: 0.6", h: 0.38"`
  - Track Badge: `x: 1.35", y: 0.68", w: 2.7", h: 0.32"`, fill `#FFFFFF`, border `#E2E8F0`, text `#0D6EFD`
  - Hero Title: `x: 0.6", y: 1.35", w: 8.8", h: 1.15"` (`#1E293B`, 56pt Plus Jakarta Sans)
  - Sub-Hook Paragraph: `x: 0.6", y: 2.7", w: 7.6", h: 1.2"` (`#64748B` with `#1E293B` emphasis, 17pt Plus Jakarta Sans)
  - Hardware Telemetry Bar: `x: 0.6", y: 4.5", w: 8.0", h: 0.4"` (`#10B981`, 11pt JetBrains Mono)
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`01`)
- **Exact Copy:**
  - Badge: `AMD ACT III · TRACK 1`
  - Title: `ProcureX.`
  - Sub-Hook: `Autonomous supply chain exception handler. Resolves factory delays in 3 seconds on MI300X.`
  - Footnote: `ROCm 6.3 · Gemma-2-27B · <1,200ms`
- **Word Count:** 27 words (Passes <= 30 rule).

---

### Slide 02: The Specific Friction (Problem)
- **Dominant Visual:** Asymmetric 40% / 60% split. Left side commands attention with a giant **64pt Orange metric (`$235K`)** inside an `#FFF7ED` container; right side exposes the broken 3-step status-quo timeline.
- **Layout Geometry:**
  - Category Tag: `x: 0.6", y: 0.55", w: 5.0", h: 0.3"` (`PROBLEM // 48-HOUR SCRAMBLE`, color `#F97316`)
  - Left Card (40%): `x: 0.6", y: 1.05", w: 3.4", h: 3.9"`, fill `#FFF7ED`, border `#FED7AA`
    - Metric: `64pt Plus Jakarta Sans`, `#F97316` (`$235K`)
    - Subtitle: `14pt Plus Jakarta Sans`, `#1E293B` (`Unmitigated Exposure`)
    - Context: `13pt Plus Jakarta Sans`, `#64748B` (`PO-8842 steel delayed 14d.`)
  - Right Card (60%): `x: 4.2", y: 1.05", w: 5.2", h: 3.9"`, fill `#FFFFFF`, border `#E2E8F0`
    - Step 1: `D+0: Email buried in inbox.`
    - Step 2: `D+2: Spreadsheets miss stockout.`
    - Step 3: `D+6: Line A halts ($169K).`
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`02`)
- **Word Count:** 26 words (Passes <= 30 rule).

---

### Slide 03: The Solution (Before vs. After)
- **Dominant Visual:** Side-by-side asymmetric contrast cards. Left card (Manual) rendered in clean white with muted slate text; right card (ProcureX) highlighted with an `#EFF6FF` container and `#0D6EFD` primary blue border.
- **Layout Geometry:**
  - Header Tag: `x: 0.6", y: 0.55", w: 6.0", h: 0.3"` (`SCHEDULE + SOURCING CO-OPTIMIZATION`, color `#0D6EFD`)
  - Left Card (Manual): `x: 0.6", y: 1.05", w: 4.2", h: 3.9"`, fill `#FFFFFF`, border `#E2E8F0`
    - Header: `MANUAL (48H)` (`#64748B`, 15pt)
    - Body: `Spot buy: $18.2K.\nLine starved 26 shifts.\nSLA fine: $66K.` (`#64748B`, 13pt)
  - Right Card (ProcureX): `x: 5.0", y: 1.05", w: 4.4", h: 3.9"`, fill `#EFF6FF`, border `#0D6EFD` (1.8pt)
    - Header: `PROCUREX (3S)` (`#0D6EFD`, 15pt)
    - Body: `Swaps in aluminum orders.\nKessler bridge buy saves $221K (15.9x ROI).` (`#1E293B`, 13pt)
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`03`)
- **Word Count:** 30 words (Passes <= 30 rule).

---

### Slide 04: Live Demo Framing & Core User Journey
- **Dominant Visual:** 3 sequential horizontal flow cards mapping the demo journey (`Trigger` -> `Engine` -> `Output`), with orange `#FFF7ED` and blue `#EFF6FF` card accents.
- **Layout Geometry:**
  - Header: `x: 0.6", y: 0.55", w: 5.5", h: 0.3"` (`CORE JOURNEY`, color `#0D6EFD`)
  - Card 1: `x: 0.6", y: 1.15", w: 2.75", h: 3.7"`, fill `#FFFFFF`, border `#E2E8F0`
    - Step: `01 INGEST` (`#64748B`, 12pt mono)
    - Text: `PO-8842 delay email parsed with confidence.` (`#1E293B`, 13pt)
  - Card 2: `x: 3.62", y: 1.15", w: 2.75", h: 3.7"`, fill `#FFF7ED`, border `#F97316`
    - Step: `02 RE-SEQUENCE` (`#F97316`, 12pt mono)
    - Text: `Shifts swap to on-hand aluminum.` (`#1E293B`, 13pt)
  - Card 3: `x: 6.65", y: 1.15", w: 2.75", h: 3.7"`, fill `#EFF6FF`, border `#0D6EFD`
    - Step: `03 EXECUTE` (`#0D6EFD`, 12pt mono)
    - Text: `Approved bridge RFQ saves $221K.` (`#1E293B`, 13pt)
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`04`)
- **Word Count:** 25 words (Passes <= 30 rule).

---

### Slide 05: Under the Hood (Architecture & Sponsor Tech)
- **Dominant Visual:** Geometric 4-node system flow on the left, paired with an AMD Instinct MI300X telemetry benchmark card (`85 TOKENS/S`) in `#EFF6FF` on the right.
- **Layout Geometry:**
  - Header: `x: 0.6", y: 0.55", w: 6.0", h: 0.3"` (`SYSTEM ARCHITECTURE`, color `#0D6EFD`)
  - Left Architecture Card (55%): `x: 0.6", y: 1.05", w: 4.8", h: 3.9"`, fill `#FFFFFF`, border `#E2E8F0`
    - Nodes: `[ FastAPI ] ↓ [ Gemma-2-27B ] ↓ [ Shift Optimizer ] ↓ [ HITL Approval ]`
  - Right Sponsor Tech Card (45%): `x: 5.6", y: 1.05", w: 3.8", h: 3.9"`, fill `#EFF6FF`, border `#BFDBFE`
    - Metric Callout: `85 TOKENS/S` (`#0D6EFD`, 36pt Plus Jakarta Sans)
    - Tech Details: `AMD Instinct MI300X.\nSub-1,200ms pipeline with deterministic replay.`
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`05`)
- **Word Count:** 30 words (Passes <= 30 rule).

---

### Slide 06: Validation, Benchmarks & Impact
- **Dominant Visual:** 3 high-impact quantitative benchmark tiles highlighting verified performance: Blue (`<1,200ms`), Orange (`15.9x`), and Emerald (`0 IDLE`).
- **Layout Geometry:**
  - Header: `x: 0.6", y: 0.55", w: 6.0", h: 0.3"` (`VALIDATED BENCHMARKS`, color `#0D6EFD`)
  - Tile 1 (Speed): `x: 0.6", y: 1.15", w: 2.75", h: 3.7"`, fill `#EFF6FF`, border `#BFDBFE`
    - Metric: `<1,200ms` (`#0D6EFD`, 38pt Plus Jakarta Sans)
    - Subtitle: `Multi-agent MI300X execution.`
  - Tile 2 (ROI): `x: 3.62", y: 1.15", w: 2.75", h: 3.7"`, fill `#FFF7ED`, border `#FED7AA`
    - Metric: `15.9x` (`#F97316`, 38pt Plus Jakarta Sans)
    - Subtitle: `$13.9K spend recovers $221K.`
  - Tile 3 (Operations): `x: 6.65", y: 1.15", w: 2.75", h: 3.7"`, fill `#ECFDF5`, border `#A7F3D0`
    - Metric: `0 IDLE` (`#10B981`, 38pt Plus Jakarta Sans)
    - Subtitle: `100% press utilization.`
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`06`)
- **Word Count:** 17 words (Passes <= 30 rule).

---

### Slide 07: Post-Hackathon Roadmap & Team
- **Dominant Visual:** 3-step timeline (`+30D`, `+60D`, `+90D`) with `#0D6EFD` primary blue tags on the left, local repo / demo link and tech stack on the right.
- **Layout Geometry:**
  - Header: `x: 0.6", y: 0.55", w: 6.0", h: 0.3"` (`ROADMAP & DEPLOYMENT`, color `#0D6EFD`)
  - Left Roadmap Card (60%): `x: 0.6", y: 1.05", w: 5.2", h: 3.9"`, fill `#FFFFFF`, border `#E2E8F0`
    - Milestone 1: `+30D: ERP webhooks.`
    - Milestone 2: `+60D: Port congestion AIS feeds.`
    - Milestone 3: `+90D: Autonomous supplier negotiations.`
  - Right Demo Card (40%): `x: 6.0", y: 1.05", w: 3.4", h: 3.9"`, fill `#FFFFFF`, border `#E2E8F0`
    - Codebase: `github.com/b3rtuso/ProcureX`
    - Local: `Live on localhost:8000`
    - Footnote: `FastAPI · ROCm 6.3`
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`07`)
- **Word Count:** 24 words (Passes <= 30 rule).

---

## 3. Strict Self-QA Verification Matrix

| Slide # | Title / Concept | Exact Word Count | Word Limit Status | Banned Buzzwords | Visual Focus |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | Title & Concrete Hook | **27 words** | PASS (<= 30) | 0 found | Dual Glyph + 56pt Hero + Hardware Badge |
| **02** | The Specific Friction | **26 words** | PASS (<= 30) | 0 found | 64pt `$235K` Metric in Soft Orange Container |
| **03** | Solution: Before vs. After | **30 words** | PASS (<= 30) | 0 found | White Card vs. Soft Blue Bordered Card |
| **04** | Live Demo Core Journey | **25 words** | PASS (<= 30) | 0 found | 3-Step Horizontal Cards (White, Orange, Blue) |
| **05** | Under the Hood Architecture | **30 words** | PASS (<= 30) | 0 found | Architecture Flow + `85 TOKENS/S` |
| **06** | Validated Benchmarks | **17 words** | PASS (<= 30) | 0 found | 3 Pastel Benchmark Tiles (Blue, Orange, Green) |
| **07** | 90-Day Roadmap & Repo | **24 words** | PASS (<= 30) | 0 found | Roadmap Card + Repo Link Card |

- **Design System Alignment:** 100% matched to `DESIGN.md` & `frontend/styles.css` (`#F8F9FC` canvas, `#FFFFFF` cards, `#0D6EFD` primary blue, `#F97316` alert orange, `#10B981` emerald green).
- **Zero AI Slop:** No gradients, no floating drop shadows, no emojis, no stock imagery, no banned corporate buzzwords.
- **Reproducible Generator:** Compilable via `python3 pitch-deck/generate_deck.py`.
- **Live Preview:** Inspectable via [preview.html](file:///root/tmp/ProcureX/pitch-deck/preview.html).
