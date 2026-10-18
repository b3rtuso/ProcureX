# Implementation Plan: ProcureX 7-Slide Pitch Deck
### Staff Product Designer & Hackathon Judge Edition
**Aesthetic:** Swiss International Style meets Linear dark-mode product launches  
**Canvas:** 16:9 widescreen (`10.0" x 5.625"`)  
**Strict Anti-Slop Lock:** Hard cap of <= 30 words per slide. Zero forbidden buzzwords. 1 focal visual decision per slide.

---

## 1. Design System & Token Specifications

| Token | Exact Hex | Role & Usage Rule |
| :--- | :--- | :--- |
| **Canvas Background** | `#0A0A0C` | Deep carbon obsidian background for all 7 slides |
| **Surface / Card Fill** | `#121316` | Container surfaces with `1px solid #26272B` border (0 drop shadows) |
| **Card Border** | `#26272B` | Subtle technical wireframe divider |
| **Text Primary** | `#F4F4F6` | High-contrast off-white for headers and key values |
| **Text Secondary / Muted** | `#8E929F` | Technical slate for labels, descriptions, and metadata |
| **Primary Accent** | `#FF4F00` | International Aerospace Orange (1 focal metric/tag per slide) |
| **Secondary Accent** | `#10B981` | Terminal emerald for validated metrics and live telemetry |

### Typography Hierarchy
- **Hero Statements & Display Numbers:** `Space Grotesk` / `Arial Black` (44pt–72pt, bold, tight tracking)
- **Section Headers & Card Titles:** `Space Grotesk` / `Arial Black` (15pt–20pt, bold)
- **Body & Subtitles:** `Inter` / `Helvetica Neue` (13pt–16pt, 1.25 line spacing)
- **Technical Badges & Monospace Telemetry:** `JetBrains Mono` / `Courier New` (9.5pt–11pt, uppercase)

### Layout Geometry
- Slide dimensions: `10.0" x 5.625"`
- Outer margins: `0.6"` all sides
- Usable width: `8.8"`, usable height: `4.425"`
- Monospace slide index badge (`01` through `07`): Bottom right at `x: 9.1", y: 5.05"`

---

## 2. Slide-by-Slide Copy, Layout Geometry & Word Counts

### Slide 01: Title & Concrete Hook
- **Dominant Visual:** Giant 56pt hero typography paired with high-contrast hardware badge and Aerospace Orange accent dot.
- **Layout Geometry:**
  - Badge: `x: 0.6", y: 0.75", w: 2.7", h: 0.35"` (Surface `#121316`, border `#26272B`, text `#8E929F`)
  - Hero Title: `x: 0.6", y: 1.35", w: 8.8", h: 1.15"` (`#F4F4F6`, 56pt Space Grotesk)
  - Sub-Hook Paragraph: `x: 0.6", y: 2.7", w: 7.6", h: 1.2"` (`#8E929F` with `#F4F4F6` emphasis, 17pt Inter)
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
- **Dominant Visual:** Asymmetric 40% / 60% split. Left side commands attention with a giant **64pt Aerospace Orange metric (`$235K`)**; right side exposes the broken 3-step status-quo timeline.
- **Layout Geometry:**
  - Category Tag: `x: 0.6", y: 0.55", w: 5.0", h: 0.3"` (`PROBLEM // 48-HOUR SCRAMBLE`)
  - Left Card (40%): `x: 0.6", y: 1.05", w: 3.4", h: 3.9"`, fill `#121316`, border `#26272B`
    - Metric: `64pt Space Grotesk`, `#FF4F00` (`$235K`)
    - Subtitle: `14pt Space Grotesk`, `#F4F4F6` (`Unmitigated Exposure`)
    - Context: `13pt Inter`, `#8E929F` (`PO-8842 steel delayed 14d.`)
  - Right Card (60%): `x: 4.2", y: 1.05", w: 5.2", h: 3.9"`, fill `#121316`, border `#26272B`
    - Step 1: `D+0: Email buried in inbox.`
    - Step 2: `D+2: Spreadsheets miss stockout.`
    - Step 3: `D+6: Line A halts ($169K).`
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`02`)
- **Word Count:** 26 words (Passes <= 30 rule).

---

### Slide 03: The Solution (Before vs. After)
- **Dominant Visual:** Side-by-side asymmetric contrast cards. Left card (Manual) rendered in muted technical slate; right card (ProcureX) bordered in Terminal Emerald.
- **Layout Geometry:**
  - Header Tag: `x: 0.6", y: 0.55", w: 6.0", h: 0.3"` (`SCHEDULE + SOURCING CO-OPTIMIZATION`)
  - Left Card (Manual): `x: 0.6", y: 1.05", w: 4.2", h: 3.9"`, fill `#121316`, border `#26272B`
    - Header: `MANUAL (48H)` (`#8E929F`, 15pt)
    - Body: `Spot buy: $18.2K.\nLine starved 26 shifts.\nSLA fine: $66K.` (`#8E929F`, 13pt)
  - Right Card (ProcureX): `x: 5.0", y: 1.05", w: 4.4", h: 3.9"`, fill `#121316`, border `#10B981` (1.5px)
    - Header: `PROCUREX (3S)` (`#10B981`, 15pt)
    - Body: `Swaps in aluminum orders.\nKessler bridge buy saves $221K (15.9x ROI).` (`#F4F4F6`, 13pt)
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`03`)
- **Word Count:** 30 words (Passes <= 30 rule).

---

### Slide 04: Live Demo Framing & Core User Journey
- **Dominant Visual:** 3 sequential horizontal flow cards mapping the demo journey (`Trigger` -> `Engine` -> `Output`), functioning as a visual anchor if venue Wi-Fi drops.
- **Layout Geometry:**
  - Header: `x: 0.6", y: 0.55", w: 5.5", h: 0.3"` (`CORE JOURNEY`)
  - Card 1: `x: 0.6", y: 1.15", w: 2.75", h: 3.7"`, fill `#121316`, border `#26272B`
    - Step: `01 INGEST` (`#8E929F`, 12pt mono)
    - Text: `PO-8842 delay email parsed with confidence.` (`#F4F4F6`, 13pt Inter)
  - Card 2: `x: 3.62", y: 1.15", w: 2.75", h: 3.7"`, fill `#121316`, border `#26272B`
    - Step: `02 RE-SEQUENCE` (`#FF4F00`, 12pt mono)
    - Text: `Shifts swap to on-hand aluminum.` (`#F4F4F6`, 13pt Inter)
  - Card 3: `x: 6.65", y: 1.15", w: 2.75", h: 3.7"`, fill `#121316`, border `#10B981`
    - Step: `03 EXECUTE` (`#10B981`, 12pt mono)
    - Text: `Approved bridge RFQ saves $221K.` (`#F4F4F6`, 13pt Inter)
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`04`)
- **Word Count:** 25 words (Passes <= 30 rule).

---

### Slide 05: Under the Hood (Architecture & Sponsor Tech)
- **Dominant Visual:** Geometric 4-node system flow on the left, paired with an AMD Instinct MI300X telemetry benchmark card on the right.
- **Layout Geometry:**
  - Header: `x: 0.6", y: 0.55", w: 6.0", h: 0.3"` (`SYSTEM ARCHITECTURE`)
  - Left Architecture Card (55%): `x: 0.6", y: 1.05", w: 4.8", h: 3.9"`, fill `#121316`, border `#26272B`
    - Nodes: `[ FastAPI ] ↓ [ Gemma-2-27B ] ↓ [ Shift Optimizer ] ↓ [ HITL Approval ]`
  - Right Sponsor Tech Card (45%): `x: 5.6", y: 1.05", w: 3.8", h: 3.9"`, fill `#121316`, border `#26272B`
    - Metric Callout: `85 TOKENS/S` (`#10B981`, 36pt Space Grotesk)
    - Tech Details: `AMD Instinct MI300X.\nSub-1,200ms pipeline with deterministic replay.`
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`05`)
- **Word Count:** 30 words (Passes <= 30 rule).

---

### Slide 06: Validation, Benchmarks & Impact
- **Dominant Visual:** 3 high-impact quantitative benchmark tiles highlighting verified performance from tests and replay engine.
- **Layout Geometry:**
  - Header: `x: 0.6", y: 0.55", w: 6.0", h: 0.3"` (`VALIDATED BENCHMARKS`)
  - Tile 1 (Speed): `x: 0.6", y: 1.15", w: 2.75", h: 3.7"`, fill `#121316`, border `#26272B`
    - Metric: `<1,200ms` (`#10B981`, 38pt Space Grotesk)
    - Subtitle: `Multi-agent MI300X execution.`
  - Tile 2 (ROI): `x: 3.62", y: 1.15", w: 2.75", h: 3.7"`, fill `#121316`, border `#26272B`
    - Metric: `15.9x` (`#FF4F00`, 38pt Space Grotesk)
    - Subtitle: `$13.9K spend recovers $221K.`
  - Tile 3 (Operations): `x: 6.65", y: 1.15", w: 2.75", h: 3.7"`, fill `#121316`, border `#26272B`
    - Metric: `0 IDLE` (`#10B981`, 38pt Space Grotesk)
    - Subtitle: `100% press utilization.`
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`06`)
- **Word Count:** 17 words (Passes <= 30 rule).

---

### Slide 07: Post-Hackathon Roadmap & Team
- **Dominant Visual:** 3-step timeline (`+30D`, `+60D`, `+90D`) with Linear-style status dots on the left, local repo / demo link and tech stack on the right.
- **Layout Geometry:**
  - Header: `x: 0.6", y: 0.55", w: 6.0", h: 0.3"` (`ROADMAP & DEPLOYMENT`)
  - Left Roadmap Card (60%): `x: 0.6", y: 1.05", w: 5.2", h: 3.9"`, fill `#121316`, border `#26272B`
    - Milestone 1: `+30D: ERP webhooks.`
    - Milestone 2: `+60D: Port congestion AIS feeds.`
    - Milestone 3: `+90D: Autonomous supplier negotiations.`
  - Right Demo Card (40%): `x: 6.0", y: 1.05", w: 3.4", h: 3.9"`, fill `#121316`, border `#26272B`
    - Codebase: `github.com/b3rtuso/ProcureX`
    - Local: `Live on localhost:8000`
    - Footnote: `FastAPI · ROCm 6.3`
  - Index: `x: 9.1", y: 5.05", w: 0.6", h: 0.35"` (`07`)
- **Word Count:** 24 words (Passes <= 30 rule).

---

## 3. Strict Self-QA Verification Matrix

| Slide # | Title / Concept | Exact Word Count | Word Limit Status | Banned Buzzwords | Visual Focus |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | Title & Concrete Hook | **27 words** | PASS (<= 30) | 0 found | 56pt Hero + Hardware Badge |
| **02** | The Specific Friction | **26 words** | PASS (<= 30) | 0 found | 64pt `$235K` Exposure Metric |
| **03** | Solution: Before vs. After | **30 words** | PASS (<= 30) | 0 found | Asymmetric Contrast Cards |
| **04** | Live Demo Core Journey | **25 words** | PASS (<= 30) | 0 found | 3-Step Horizontal Cards |
| **05** | Under the Hood Architecture | **30 words** | PASS (<= 30) | 0 found | Geometric Nodes + `85 TOKENS/S` |
| **06** | Validated Benchmarks | **17 words** | PASS (<= 30) | 0 found | 3 Quantitative Hero Tiles |
| **07** | 90-Day Roadmap & Repo | **24 words** | PASS (<= 30) | 0 found | 3-Phase Milestone Flow |

- **Design Aesthetic:** Swiss International Style meets Linear dark mode (`#0A0A0C` obsidian, `#121316` surface, `#26272B` border, `#FF4F00` aerospace orange, `#10B981` terminal emerald).
- **Zero AI Slop:** No gradients, no floating drop shadows, no neon brains, no emojis, no stock photos.
- **Reproducible Generator:** Compilable via `python3 pitch-deck/generate_deck.py`.
- **Live Preview:** Inspectable via [preview.html](file:///root/tmp/ProcureX/pitch-deck/preview.html).
