# SupplyChain AI Command Center (`ProcureX`) — Design System Specification

## 1. Overview & Aesthetic Direction
- **Layout Architecture**: Refined 3-Column Multi-Pane Dashboard prioritizing whitespace, scannability, and zero horizontal table scrollbars.
- **Active Plant Identity**: Locked to **`Laguna & Cebu Stamping`** across all views, headers, and B2B communications.
- **Stylesheet Location**: [`frontend/styles.css`](file:///c:/Users/Marriel/Downloads/HECKETONS/frontend/styles.css) (served at `/styles.css`).

## 2. Color System
| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Canvas Background** | `#f8f9fc` | Main application background & subtle input surfaces |
| **Card Surface** | `#ffffff` | 24px-radius cards (`.saas-card`) with `#f3f4f6` border |
| **Primary Text** | `#1e293b` | Bold headers (`700–800`) and primary table data |
| **Secondary Text** | `#64748b` | Muted medium labels (`500–600`) and metadata |
| **Primary Navbar Blue** | `#0d6efd` | Active sidebar navigation links, right-edge indicator pill, active calendar day pill, primary CTA buttons, and notification badges |
| **Secondary Orange** | `#f97316` | Simulate / Quick PO trigger accents (`#fff7ed` soft container) and critical alert highlights |
| **Success Green** | `#10b981` | On-track status badges, confirmed supplier stock, and completed checklist items |

## 3. Typography
- **Primary Sans**: `'Plus Jakarta Sans'` (`400`, `500`, `600`, `700`, `800`)
- **Monospace / Tabular Data**: `'JetBrains Mono'` with `font-variant-numeric: tabular-nums` (`.tabular`)

## 4. Three-Column Shell Structure
1. **Left Navigation Sidebar (`w-64 lg:w-60 xl:w-64`, `h-screen`)**:
   - Dual circular glyph logo (`#0d6efd` & `#f97316`), 5 primary navigation links (`Dashboard`, `Alerts`, `Orders`, `Suppliers`, `Schedule`) with `#0d6efd` active state and right-edge vertical indicator pill, and bottom `AMD MI300X · ROCm` live telemetry card.
2. **Central Main Content Area (`flex-1 min-w-0`, independent `h-screen overflow-y-auto`)**:
   - Top header with greeting and elongated pill search bar, 2×2 Icon-Left KPI card, `#fff7ed` Simulate / Quick PO Trigger card with organic blob SVG, custom CSS Bar Chart with interactive tooltips, and zero-scrollbar responsive tables (`.responsive-table`).
3. **Right Sidebar (`lg:w-64 xl:w-72 2xl:w-80`, `h-screen`)**:
   - User Profile card (`Procurement Manager · Laguna & Cebu Stamping`), Navbar-Blue (`#0d6efd`) Plant Schedule Mini-Calendar with interactive Calendar Pop-up & Supplier Delivery Scheduler, Upcoming Deliveries & Shifts list, and AI Action Checklist.

## 5. Component Sizing & Table Rules
- **Single-Line Badges (`.badge-pill`)**: All status pills (`Delayed`, `At Risk`, `ON TRACK`, `AT RISK`, `BEST OPTION`, `PRE-APPROVED`) enforce `white-space: nowrap !important` and `inline-flex` geometry.
- **Zero-Scrollbar Tables (`.responsive-table`, `.no-scrollbar`)**: Tables fit 100% of their card container without horizontal scrollbars by using compact responsive padding (`clamp()`) and allowing descriptive text columns to wrap naturally while keeping status pills and action buttons on a single line.
