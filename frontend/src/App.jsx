import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

// Clean SVG Icon Component
    const Icon = ({ name, className = "w-5 h-5" }) => {
      const props = {
        className: `${className} shrink-0`,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: "1.9",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true"
      };
      switch (name) {
        case "dashboard":
          return <svg {...props}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>;
        case "alerts":
          return <svg {...props}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
        case "orders":
          return <svg {...props}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
        case "suppliers":
          return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
        case "schedule":
          return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>;
        case "settings":
          return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
        case "search":
          return <svg {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
        case "bell":
          return <svg {...props}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
        case "bolt":
          return <svg {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
        case "chart":
          return <svg {...props}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
        case "check":
          return <svg {...props}><polyline points="20 6 9 17 4 12"/></svg>;
        case "x":
          return <svg {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
        case "menu":
          return <svg {...props}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
        case "mail":
          return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
        case "send":
          return <svg {...props}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
        case "edit":
          return <svg {...props}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>;
        case "cpu":
          return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3m6-3v3m-6 16v3m6-3v3M1 9h3m-3 6h3m16-6h3m-3 6h3"/></svg>;
        case "shield":
          return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
        case "clock":
          return <svg {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
        case "lock":
          return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
        case "arrow-right":
          return <svg {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
        case "chevron-right":
          return <svg {...props}><polyline points="9 18 15 12 9 6"/></svg>;
        case "chevron-left":
          return <svg {...props}><polyline points="15 18 9 12 15 6"/></svg>;
        case "chevron-down":
          return <svg {...props}><polyline points="6 9 12 15 18 9"/></svg>;
        case "chevrons-up-down":
          return <svg {...props}><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>;
        case "truck":
          return <svg {...props}><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>;
        case "more-vertical":
          return <svg {...props}><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>;
        case "calendar":
          return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
        case "plus":
          return <svg {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
        default:
          return <svg {...props}><circle cx="12" cy="12" r="10"/></svg>;
      }
    };

    // ============================================================================
    // DISTINCT SIMULATION SCENARIOS WITH REALISTIC B2B INDUSTRIAL EMAILS
    // ============================================================================
    const SIMULATE_SCENARIO_OPTIONS = [
      {
        id: "STEEL_DELAY",
        title: "Steel Shipment Delay",
        alertTitle: "Steel coil shipment delayed by 14 days",
        category: "Delays",
        alertType: "Shipment Delay",
        badge: "CRITICAL · +14 Days",
        badgeType: "CRITICAL",
        badgeColor: "bg-red-100 text-red-700 border-red-200",
        supplier: "Global Metals Co.",
        material: "Steel Coil",
        severity: "HIGH",
        delayLabel: "14 days",
        stockDaysRemaining: "7 days remaining (7,000 kg)",
        inventoryGapLabel: "7 days",
        requiredMaterialLabel: "8,000 kg",
        deficitPct: 50,
        emailPreview: `FROM: Export Logistics Desk <dispatch@globalmetals.co>\nTO: Materials Planning & Procurement <procurement@supplychain-ai.com>\nSUBJECT: URGENT NOTICE OF DELAY — PO-4401 (14,000 kg Cold-Rolled Steel Coil, ASTM A1008)\n\nDear Procurement Manager,\n\nPlease be advised that your contracted shipment under Purchase Order PO-4401 (14,000 kg of 2.0mm Cold-Rolled Steel Coil, Grade ASTM A1008 / SPCC-SD, Bill of Lading #GM-88412) aboard vessel MV Pacific Horizon is currently held at Kaohsiung International Terminal due to severe berth congestion and customs backlog.\n\n• Original Scheduled Arrival: October 21, 2026\n• Revised Estimated Arrival: November 4, 2026 (+14 Calendar Days Delay)\n\nWe understand this impacts your Laguna stamping line schedule and will transmit daily vessel berth updates at 08:00 HRS.\n\nSincerely,\nMarcus Vance\nDirector of Marine Export Operations, Global Metals Co.`,
        aiAnalysisText: "The supplier has reported a 14-day shipment delay on PO-4401 caused by port berth congestion. Current warehouse steel coil inventory (7,000 kg at 1,000 kg/day burn rate) can support 7 production days, creating a 7-day material gap. Two production orders—PO-102 (Car Chassis) and PO-103 (Engine Part)—are directly at risk.",
        summary: "Global Metals Co. reports a 14-day vessel berth delay on PO-4401 (Steel Coil). Leaves a 7-day inventory gap impacting PO-102 (Car Chassis) and PO-103 (Engine Part).",
        affectedOrdersDetail: [
          { orderId: "PO-102", product: "Car Chassis", materialSpec: "5,000 kg Steel Coil", requiredDate: "Required Oct 28", status: "AT RISK" },
          { orderId: "PO-103", product: "Engine Part", materialSpec: "3,000 kg Steel Coil", requiredDate: "Required Nov 2", status: "AT RISK" }
        ],
        workflowSteps: [
          "1. Reading supplier email...",
          "2. Delay detected: 14 days",
          "3. Checking current inventory...",
          "4. Steel stock remaining: 7 days",
          "5. Checking production orders...",
          "6. 2 production orders at risk",
          "7. Searching approved suppliers...",
          "8. 3 backup suppliers available",
          "9. Generating RFQs...",
          "10. Creating revised production schedule...",
          "11. Recommendation ready for human review."
        ],
        recommendations: [
          {
            key: "REC_RFQ_METRO",
            text: "Send formal RFQ to backup supplier MetroSteel Industries to verify 5,000 kg stock availability and unit price.",
            actionLabel: "Send RFQ to MetroSteel"
          },
          {
            key: "REC_RFQ_BACKUPS",
            text: "Send competitive RFQ inquiries to IronWorks Supply and FastMetals Co. to reveal stock levels and pricing.",
            actionLabel: "Send Backup RFQs"
          },
          {
            key: "REC_SCHEDULE",
            text: "Reschedule PO-102 & PO-103 production by +7 days if emergency supply cannot arrive before Oct 28.",
            actionLabel: "Approve +7d Schedule"
          },
          {
            key: "REC_PRIORITIZE",
            text: "Prioritize products with sufficient inventory (keep PO-101 Aluminum run on Oct 25).",
            actionLabel: "Confirm Priority"
          }
        ]
      },
      {
        id: "ALUMINUM_SHORTAGE",
        title: "Aluminum Shortage",
        alertTitle: "Aluminum quantity shortage — 20% missing (3,000 kg short)",
        category: "Shortages",
        alertType: "Quantity Shortage",
        badge: "WARNING · -20% Missing",
        badgeType: "WARNING",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        supplier: "Prime Materials",
        material: "Aluminum",
        severity: "MEDIUM",
        delayLabel: "20% Shortage (-3,000 kg)",
        stockDaysRemaining: "11 days remaining (8,800 kg)",
        inventoryGapLabel: "3 days",
        requiredMaterialLabel: "5,600 kg (3,000 kg missing)",
        deficitPct: 35,
        emailPreview: `FROM: Commercial Dispatch <manifest@primematerials.com>\nTO: Materials Planning & Procurement <procurement@supplychain-ai.com>\nSUBJECT: SHORT-SHIPMENT MANIFEST NOTICE — PO-4402 (AA6061-T6 Aluminum Sheet)\n\nDear Procurement Team,\n\nFollowing an unplanned rolling mill allocation cap at our Batangas facility, please be advised that Purchase Order PO-4402 has been dispatched with a partial quantity:\n\n• Contracted PO Quantity: 15,000 kg (AA6061-T6 Automotive Sheet)\n• Actual Loaded Quantity: 12,000 kg (Waybill #PM-3092)\n• Net Shortfall: 3,000 kg (20% Quantity Shortage)\n\nThe remaining 3,000 kg is backordered by approximately 12 business days. A commercial credit memo for the undelivered balance can be issued upon request.\n\nRegards,\nElena Rostova\nKey Account Fulfillment Lead, Prime Materials`,
        aiAnalysisText: "Prime Materials transmitted a formal short-shipment manifest on PO-4402 showing a 20% quantity deficit (3,000 kg missing). While PO-101 (Oct 25) is covered by existing stock, PO-104 (EV Battery Enclosure on Nov 5) faces a 3,000 kg shortfall unless backup stock is quoted.",
        summary: "Prime Materials short-ships Aluminum PO-4402 by 20% (3,000 kg missing). Puts PO-104 (EV Battery Enclosure) at risk and triggers backup RFQ.",
        affectedOrdersDetail: [
          { orderId: "PO-104", product: "EV Battery Enclosure", materialSpec: "3,200 kg Aluminum", requiredDate: "Required Nov 5", status: "AT RISK" }
        ],
        workflowSteps: [
          "1. Reading commercial packing manifest from Prime Materials...",
          "2. Quantity shortage detected: 20% missing (3,000 kg short)",
          "3. Checking current Aluminum warehouse stock...",
          "4. Effective Aluminum buffer drops to 11 days remaining",
          "5. Checking Aluminum-dependent production orders...",
          "6. 1 production order at risk: PO-104 (EV Battery Enclosure)",
          "7. Searching pre-approved backup suppliers...",
          "8. 3 backup suppliers identified for 3,000 kg spot inquiry",
          "9. Drafting RFQs to request stock availability & unit price...",
          "10. Evaluating schedule buffer for PO-104 (Nov 5)...",
          "11. Recommendation ready for human review."
        ],
        recommendations: [
          {
            key: "REC_RFQ_METRO",
            text: "Send RFQ to MetroSteel Industries to check 3,000 kg spot stock availability and pricing.",
            actionLabel: "Send RFQ Inquiry"
          },
          {
            key: "REC_RFQ_BACKUPS",
            text: "Request secondary quotes from IronWorks Supply and FastMetals Co. to compare pricing.",
            actionLabel: "Send Backup RFQs"
          },
          {
            key: "REC_SCHEDULE",
            text: "Adjust PO-104 (EV Battery Enclosure) schedule window pending backup delivery confirmation.",
            actionLabel: "Review Schedule"
          },
          {
            key: "REC_PRIORITIZE",
            text: "Issue 20% short-shipment debit memo on PO-4402 to Prime Materials.",
            actionLabel: "Confirm Debit Memo"
          }
        ]
      },
      {
        id: "SUPPLIER_CANCELLATION",
        title: "Supplier Cancellation",
        alertTitle: "Supplier order cancellation — 5,000 kg Specialty Steel cancelled",
        category: "Delays",
        alertType: "Supplier Cancellation",
        badge: "CRITICAL · Order Cancelled",
        badgeType: "CRITICAL",
        badgeColor: "bg-red-100 text-red-700 border-red-200",
        supplier: "Apex Alloys Ltd.",
        material: "Steel Coil",
        severity: "HIGH",
        delayLabel: "Order Cancelled (100%)",
        stockDaysRemaining: "5 days remaining (5,000 kg)",
        inventoryGapLabel: "9 days",
        requiredMaterialLabel: "5,000 kg replacement",
        deficitPct: 65,
        emailPreview: `FROM: Operations Directorate <contracts@apexalloys.com>\nTO: Materials Planning & Procurement <procurement@supplychain-ai.com>\nSUBJECT: FORCE MAJEURE ORDER CANCELLATION — PO-4408 (5,000 kg Steel Coil)\n\nDear Procurement Manager,\n\nWe regret to inform you that due to a transformer failure on our #2 Electric Arc Furnace last night, Apex Alloys Ltd. is invoking Force Majeure and must cancel Purchase Order PO-4408 (5,000 kg Cold-Rolled Steel Coil scheduled for October 26 delivery).\n\nAll prepayment holds have been released so your team may source emergency replacement tonnage immediately.\n\nSincerely,\nArthur Pendelton\nVP of Mill Operations, Apex Alloys Ltd.`,
        aiAnalysisText: "Apex Alloys Ltd. issued a Force Majeure cancellation on PO-4408 (5,000 kg Steel Coil). Without emergency replacement sourcing, PO-102 (Car Chassis) will halt on Oct 28.",
        summary: "Apex Alloys invokes Force Majeure and cancels a 5,000 kg Steel Coil order. Requires immediate stock & price RFQ to backup mills.",
        affectedOrdersDetail: [
          { orderId: "PO-102", product: "Car Chassis", materialSpec: "5,000 kg Steel Coil", requiredDate: "Required Oct 28", status: "AT RISK" }
        ],
        workflowSteps: [
          "1. Reading Force Majeure notice from Apex Alloys Ltd....",
          "2. Critical exception detected: 100% Order Cancellation (5,000 kg)",
          "3. Checking current Steel Coil inventory...",
          "4. Unallocated stock remaining: 5 days",
          "5. Tracing cancelled PO-4408 to production schedule...",
          "6. PO-102 (Car Chassis) flagged CRITICAL AT RISK",
          "7. Querying pre-approved domestic backup mills...",
          "8. Found 3 pre-approved mills: MetroSteel, IronWorks, FastMetals",
          "9. Generating urgent RFQs to request stock & unit pricing...",
          "10. Preparing +7 day contingency schedule for PO-102...",
          "11. Recommendation ready for human review."
        ],
        recommendations: [
          {
            key: "REC_RFQ_METRO",
            text: "Send urgent RFQ to MetroSteel Industries to verify 5,000 kg stock availability and unit pricing.",
            actionLabel: "Send RFQ to MetroSteel"
          },
          {
            key: "REC_RFQ_BACKUPS",
            text: "Send parallel RFQs to IronWorks Supply and FastMetals Co. to compare stock and pricing.",
            actionLabel: "Send Backup RFQs"
          },
          {
            key: "REC_SCHEDULE",
            text: "Reschedule PO-102 to Nov 4 (+7 days) to match replacement mill lead time.",
            actionLabel: "Approve +7d Schedule"
          },
          {
            key: "REC_PRIORITIZE",
            text: "Void PO-4408 liability in ERP and reallocate budget to backup supplier.",
            actionLabel: "Confirm ERP Void"
          }
        ]
      },
      {
        id: "PORT_DELAY",
        title: "Port Delay",
        alertTitle: "Port customs & crane hold — Copper & Steel containers delayed 10 days",
        category: "Delays",
        alertType: "Port Delay",
        badge: "HIGH · 10-Day Port Hold",
        badgeType: "CRITICAL",
        badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
        supplier: "Pacific Maritime / Global Metals",
        material: "Steel Coil & Copper Wire",
        severity: "HIGH",
        delayLabel: "10 days (Port Hold)",
        stockDaysRemaining: "6 days remaining (6,000 kg)",
        inventoryGapLabel: "4 days",
        requiredMaterialLabel: "4,000 kg bridge lot",
        deficitPct: 42,
        emailPreview: `FROM: Port Operations Advisory <advisory@manila-port-edi.ph>\nTO: Importer of Record — SupplyChain AI Manufacturing\nSUBJECT: TERMINAL BERTH HOLD ADVISORY — Vessel MV Eastern Star (Containers #MSCU-492011)\n\nPORT AUTHORITY & CARRIER EDI BULLETIN:\nPlease be advised that MV Eastern Star carrying industrial metal consignments for PO-4401 and PO-4405 is subject to a mandatory 10-day terminal release hold at South Harbor Berth 4 due to gantry crane structural repairs and customs X-ray queue backlogs.\n\nEstimated Gate-Out Release: Delayed by 10 Calendar Days.`,
        aiAnalysisText: "Port authority advisory indicates a 10-day terminal release hold affecting incoming containers. A 4-day inventory gap is projected for PO-103 (Engine Part) starting Nov 2.",
        summary: "Port gantry crane repairs hold incoming containers for 10 days, creating a 4-day material gap for PO-103 (Engine Part).",
        affectedOrdersDetail: [
          { orderId: "PO-103", product: "Engine Part", materialSpec: "3,000 kg Steel Coil", requiredDate: "Required Nov 2", status: "AT RISK" }
        ],
        workflowSteps: [
          "1. Reading Port Authority & Carrier EDI advisory...",
          "2. Port hold detected: 10-day terminal release delay",
          "3. Checking plant buffer for affected containers...",
          "4. Buffer covers 6 days; 4-day gap identified",
          "5. Checking production schedule...",
          "6. PO-103 (Engine Part, Nov 2) flagged AT RISK",
          "7. Searching domestic suppliers bypassing port congestion...",
          "8. 3 domestic overland suppliers available",
          "9. Drafting RFQs for 4,000 kg domestic bridge lot...",
          "10. Generating schedule adjustment for PO-103...",
          "11. Recommendation ready for human review."
        ],
        recommendations: [
          {
            key: "REC_RFQ_METRO",
            text: "Request domestic overland quote (RFQ) from MetroSteel Industries (Manila warehouse).",
            actionLabel: "Send Overland RFQ"
          },
          {
            key: "REC_RFQ_BACKUPS",
            text: "Request backup quotes from IronWorks Supply and FastMetals Co.",
            actionLabel: "Send Backup RFQs"
          },
          {
            key: "REC_SCHEDULE",
            text: "Postpone PO-103 (Engine Part) from Nov 2 to Nov 9 (+7 days).",
            actionLabel: "Approve Schedule"
          },
          {
            key: "REC_PRIORITIZE",
            text: "Prioritize PO-101 and customs-cleared domestic inventory runs.",
            actionLabel: "Confirm Priority"
          }
        ]
      }
    ];

    const buildAlertFromScenario = (sc, idSuffix = "001", timeAgo = "12 mins ago", detectedAt = "October 21, 2026") => ({
      id: `ALT-${idSuffix}`,
      scenarioId: sc.id,
      title: sc.alertTitle,
      category: sc.category,
      alertType: sc.alertType,
      material: sc.material,
      supplier: sc.supplier,
      source: sc.id === "PORT_DELAY" ? "Port Authority EDI" : sc.id === "ALUMINUM_SHORTAGE" ? "Carrier Packing List" : "Supplier Email",
      detectedAt,
      timeAgo,
      severity: sc.severity,
      badgeType: sc.badgeType,
      delayLabel: sc.delayLabel,
      stockDaysRemaining: sc.stockDaysRemaining,
      inventoryGapLabel: sc.inventoryGapLabel,
      requiredMaterialLabel: sc.requiredMaterialLabel,
      deficitPct: sc.deficitPct,
      emailMessage: sc.emailPreview,
      aiAnalysisText: sc.aiAnalysisText,
      affectedOrdersDetail: sc.affectedOrdersDetail,
      affectedOrderIds: sc.affectedOrdersDetail.map(o => o.orderId),
      workflowSteps: sc.workflowSteps,
      recommendations: sc.recommendations
    });

    const INITIAL_ALERTS = [
      buildAlertFromScenario(SIMULATE_SCENARIO_OPTIONS[0], "001", "12 mins ago", "October 21, 2026"),
      buildAlertFromScenario(SIMULATE_SCENARIO_OPTIONS[1], "002", "1 hour ago", "October 21, 2026"),
      {
        id: "ALT-003",
        scenarioId: "EARLY_DELIVERY",
        title: "Delivery arrived earlier than expected",
        category: "Information",
        alertType: "Early Delivery",
        material: "Chemical Coating Resin",
        supplier: "ChemSolutions",
        source: "Warehouse Gate Scanner",
        detectedAt: "October 20, 2026",
        timeAgo: "Yesterday",
        severity: "LOW",
        badgeType: "INFO",
        delayLabel: "2 days early",
        stockDaysRemaining: "24 days remaining (8,400 kg)",
        inventoryGapLabel: "0 days (No gap)",
        requiredMaterialLabel: "0 kg needed",
        deficitPct: 10,
        emailMessage: `GATE RECEIPT CONFIRMATION #GR-99201\nSupplier: ChemSolutions Inc.\nPurchase Order: PO-4398 (6,000 kg Chemical Coating Resin)\nStatus: Arrived 48 hours ahead of scheduled window. Quality assurance passed; stored in Climate Bay C-4.`,
        aiAnalysisText: "ChemSolutions delivered PO-4398 two days ahead of schedule. Stock coverage for Chemical Coating Resin increased to 24 days remaining. No corrective action required.",
        affectedOrdersDetail: [],
        affectedOrderIds: [],
        workflowSteps: [
          "1. Reading Warehouse Gate Scanner receipt...",
          "2. Early arrival detected: 2 days ahead of schedule",
          "3. Updating Chemical Coating Resin inventory...",
          "4. Stock level healthy: 24 days remaining",
          "5. No production orders negatively impacted."
        ],
        recommendations: [
          {
            key: "REC_PRIORITIZE",
            text: "Acknowledge early delivery receipt and update ChemSolutions reliability score (+1.2%).",
            actionLabel: "Confirm Receipt"
          }
        ]
      }
    ];

    const INITIAL_PURCHASE_ORDERS = [
      { poNumber: "PO-4401", supplier: "Global Metals Co.", material: "Steel Coil", quantity: "14,000 kg", expectedDelivery: "Nov 4, 2026 (+14d)", status: "Delayed", riskLevel: "HIGH", unitPrice: "₱60/kg", totalValue: "₱840,000", notes: "Held at port due to congestion. Impacts PO-102 and PO-103." },
      { poNumber: "PO-4402", supplier: "Prime Materials", material: "Aluminum", quantity: "12,000 kg", expectedDelivery: "Oct 26, 2026", status: "At Risk", riskLevel: "MEDIUM", unitPrice: "₱115/kg", totalValue: "₱1,725,000", notes: "20% quantity shortage reported on manifest." },
      { poNumber: "PO-4403", supplier: "ChemSolutions", material: "Chemical Coating Resin", quantity: "6,000 kg", expectedDelivery: "Oct 20, 2026", status: "Completed", riskLevel: "LOW", unitPrice: "₱95/kg", totalValue: "₱570,000", notes: "Arrived 2 days early." },
      { poNumber: "PO-4404", supplier: "MetroSteel Industries", material: "Steel Coil", quantity: "10,000 kg", expectedDelivery: "Oct 29, 2026", status: "On Time", riskLevel: "LOW", unitPrice: "₱68/kg", totalValue: "₱680,000", notes: "Standard scheduled domestic lot." },
      { poNumber: "PO-4405", supplier: "Pacific Copper Corp", material: "Copper Wire", quantity: "5,000 kg", expectedDelivery: "Oct 30, 2026", status: "On Time", riskLevel: "LOW", unitPrice: "₱210/kg", totalValue: "₱1,050,000", notes: "In transit via coastal freight." },
      { poNumber: "PO-4406", supplier: "IronWorks Supply", material: "Steel Fasteners", quantity: "4,500 kg", expectedDelivery: "Nov 1, 2026", status: "On Time", riskLevel: "LOW", unitPrice: "₱75/kg", totalValue: "₱337,500", notes: "On schedule." }
    ];

    const INITIAL_INVENTORY = [
      { material: "Steel Coil", currentStock: "7,000 kg", currentStockNum: 7000, dailyUsage: "1,000 kg/day", daysRemaining: 7, minRequiredDays: 14, status: "CRITICAL" },
      { material: "Aluminum", currentStock: "15,000 kg", currentStockNum: 15000, dailyUsage: "800 kg/day", daysRemaining: 18, minRequiredDays: 14, status: "HEALTHY" },
      { material: "Copper Wire", currentStock: "9,600 kg", currentStockNum: 9600, dailyUsage: "400 kg/day", daysRemaining: 24, minRequiredDays: 10, status: "HEALTHY" },
      { material: "Chemical Coating Resin", currentStock: "8,400 kg", currentStockNum: 8400, dailyUsage: "350 kg/day", daysRemaining: 24, minRequiredDays: 12, status: "HEALTHY" }
    ];

    const INITIAL_PRODUCTION_ORDERS = [
      {
        orderId: "PO-101",
        product: "Product B (Aluminum Housing)",
        material: "Aluminum",
        requiredQty: "2,400 kg",
        currentDate: "Oct 25",
        suggestedDate: "Oct 25",
        changeLabel: "NO CHANGE",
        materialStatus: "MATERIAL READY",
        status: "ON TRACK",
        risk: "LOW",
        relatedAlert: "None — Stock Healthy",
        modifiedByUser: false
      },
      {
        orderId: "PO-102",
        product: "Car Chassis",
        material: "Steel Coil",
        requiredQty: "5,000 kg",
        currentDate: "Oct 28",
        suggestedDate: "Nov 4",
        changeLabel: "+7 DAYS",
        materialStatus: "SHORTAGE (7d Gap)",
        status: "AT RISK",
        risk: "HIGH",
        relatedAlert: "Steel coil shipment delayed by 14 days",
        modifiedByUser: false
      },
      {
        orderId: "PO-103",
        product: "Engine Part",
        material: "Steel Coil",
        requiredQty: "3,000 kg",
        currentDate: "Nov 2",
        suggestedDate: "Nov 9",
        changeLabel: "+7 DAYS",
        materialStatus: "SHORTAGE (7d Gap)",
        status: "AT RISK",
        risk: "HIGH",
        relatedAlert: "Steel coil shipment delayed by 14 days",
        modifiedByUser: false
      },
      {
        orderId: "PO-104",
        product: "EV Battery Enclosure",
        material: "Aluminum",
        requiredQty: "3,200 kg",
        currentDate: "Nov 5",
        suggestedDate: "Nov 5",
        changeLabel: "NO CHANGE",
        materialStatus: "MATERIAL READY",
        status: "ON TRACK",
        risk: "LOW",
        relatedAlert: "Aluminum quantity shortage — 20% missing (3,000 kg short)",
        modifiedByUser: false
      }
    ];

    // IMPORTANT: Price, Available Stock, and Price-Based Ranking are NOT predetermined!
    // They remain hidden ("Pending RFQ Quote" / "Pending Stock Check") until the RFQ email is sent and the supplier replies!
    const INITIAL_SUPPLIERS = [
      {
        id: "SUP-METRO",
        name: "MetroSteel Industries",
        material: "Steel Coil",
        location: "Manila, Philippines",
        leadTime: "3–7 days",
        leadTimeDays: 5,
        status: "PRE-APPROVED",
        reliability: 95,
        quoteReceived: false,
        quotedPricePerKg: "₱68/kg",
        quotedTotal: "₱340,000 (for 5,000 kg)",
        confirmedAvailableQty: "5,000 kg",
        quoteStatus: "Not Sent — Send RFQ to Check Stock & Price",
        recommendedAfterQuote: true,
        postQuoteBadge: "BEST OPTION (Fastest + Stock Confirmed)",
        contactEmail: "sales@metrosteel.com.ph",
        phone: "+63 (02) 8842-1900",
        notes: "Pre-approved Manila service center with 3–7 day domestic trucking. Send an RFQ to verify current coil stock and spot price."
      },
      {
        id: "SUP-IRON",
        name: "IronWorks Supply",
        material: "Steel Coil",
        location: "Cebu, Philippines",
        leadTime: "5–10 days",
        leadTimeDays: 7,
        status: "PRE-APPROVED",
        reliability: 91,
        quoteReceived: false,
        quotedPricePerKg: "₱64/kg",
        quotedTotal: "₱512,000 (for 8,000 kg)",
        confirmedAvailableQty: "8,000 kg",
        quoteStatus: "Not Sent — Send RFQ to Check Stock & Price",
        recommendedAfterQuote: false,
        postQuoteBadge: "RUNNER-UP (Full Lot Available)",
        contactEmail: "quotes@ironworkssupply.ph",
        phone: "+63 (32) 412-8800",
        notes: "Regional steel distributor in Cebu with 5–10 day inter-island RoRo transit. Send an RFQ to check current warehouse tonnage and price."
      },
      {
        id: "SUP-FAST",
        name: "FastMetals Co.",
        material: "Steel Coil",
        location: "Davao, Philippines",
        leadTime: "7–14 days",
        leadTimeDays: 10,
        status: "PRE-APPROVED",
        reliability: 88,
        quoteReceived: false,
        quotedPricePerKg: "₱61/kg",
        quotedTotal: "₱305,000 (for 5,000 kg)",
        confirmedAvailableQty: "10,000 kg",
        quoteStatus: "Not Sent — Send RFQ to Check Stock & Price",
        recommendedAfterQuote: false,
        postQuoteBadge: "LOWEST UNIT PRICE",
        contactEmail: "rfq@fastmetals.com.ph",
        phone: "+63 (82) 298-4410",
        notes: "Bulk metal trader in Davao with 7–14 day sea freight lead time. Send an RFQ to request bulk spot pricing and stock availability."
      }
    ];

    // Executive-grade B2B RFQ Email Drafts that explicitly ask for Stock Availability, Unit Price, and Delivery Date
    const INITIAL_RFQS = [
      {
        id: "RFQ-METRO",
        supplierId: "SUP-METRO",
        supplierName: "MetroSteel Industries",
        recipientEmail: "sales@metrosteel.com.ph",
        location: "Manila, Philippines",
        leadTime: "3–7 days",
        requestedQty: "5,000 kg",
        status: "Ready for Approval",
        supplierReply: null,
        subject: "URGENT RFQ [Ref: EXP-2026-102] — Stock Availability & Price Inquiry: 5,000 kg Cold-Rolled Steel Coil (ASTM A1008)",
        message: `Dear MetroSteel Industries Commercial Desk,\n\nDue to an unexpected 14-day port berth delay affecting our primary overseas vessel (Ref: PO-4401), our Laguna stamping facility requires an urgent bridge allocation of Cold-Rolled Steel Coil to support our upcoming October 28 production run.\n\nAs a Pre-Approved Vendor under our Master Supply Agreement, please provide an official quotation and stock confirmation for the following specification:\n\n• Material Specification: Cold-Rolled Steel Coil, 2.0mm Gauge, Grade ASTM A1008 / JIS G3141 SPCC-SD\n• Target Quantity: 5,000 kg (up to 8,000 kg if available in slit master coils)\n• Required Delivery Window: Within 3–7 calendar days (DDP Laguna Receiving Dock B)\n• Quality Documentation: Mill Test Certificate (EN 10204 Type 3.1) required upon dispatch\n\nPLEASE CONFIRM BY RETURN EMAIL:\n1. Immediate Stock Availability: How many kilograms of ASTM A1008 2.0mm coil do you currently hold in your Manila warehouse ready for immediate slitting?\n2. Commercial Pricing: Your best unit price (PHP/kg, VAT-exclusive) and dedicated flatbed freight rate.\n3. Guaranteed Delivery Date: Earliest confirmed dock arrival date upon Purchase Order issuance.\n\nWe are prepared to issue an immediate Purchase Order upon receipt of your stock and price confirmation.\n\nBest regards,\nProcurement Manager\nSupplyChain AI Manufacturing Operations`
      },
      {
        id: "RFQ-IRON",
        supplierId: "SUP-IRON",
        supplierName: "IronWorks Supply",
        recipientEmail: "quotes@ironworkssupply.ph",
        location: "Cebu, Philippines",
        leadTime: "5–10 days",
        requestedQty: "8,000 kg",
        status: "Draft",
        supplierReply: null,
        subject: "URGENT RFQ [Ref: EXP-2026-103] — Stock & Quotation Request: 8,000 kg Cold-Rolled Steel Coil (ASTM A1008)",
        message: `Dear IronWorks Supply Quotations Team,\n\nWe are soliciting an urgent stock availability check and commercial quotation to cover a temporary 7-day raw material gap for our Car Chassis (PO-102) and Engine Part (PO-103) stamping schedules.\n\n• Material Specification: Cold-Rolled Steel Coil, 2.0mm Gauge, Grade ASTM A1008 / SPCC-SD\n• Requested Lot Size: 8,000 kg (or partial lot minimum 5,000 kg)\n• Target Delivery Window: Within 5–10 calendar days (CIP / DDP Laguna Plant)\n\nPLEASE PROVIDE THE FOLLOWING DETAILS:\n1. Confirmed Stock on Hand: Exact tonnage currently available in your Cebu depot.\n2. Unit Pricing: Best spot unit price (PHP/kg) and inter-island RoRo freight charges.\n3. Transit Schedule: Earliest vessel departure and guaranteed arrival date at our facility.\n\nThank you for your prompt attention to this inquiry.\n\nBest regards,\nProcurement Manager\nSupplyChain AI Manufacturing Operations`
      },
      {
        id: "RFQ-FAST",
        supplierId: "SUP-FAST",
        supplierName: "FastMetals Co.",
        recipientEmail: "rfq@fastmetals.com.ph",
        location: "Davao, Philippines",
        leadTime: "7–14 days",
        requestedQty: "8,000 kg",
        status: "Draft",
        supplierReply: null,
        subject: "RFQ INQUIRY [Ref: EXP-2026-104] — Stock Availability & Volume Pricing: 8,000 kg Steel Coil (ASTM A1008)",
        message: `Dear FastMetals Co. Trading Desk,\n\nFollowing a 14-day transit delay on an inbound international steel shipment, we are requesting a formal stock check and quotation for secondary buffer replenishment:\n\n• Material Specification: Cold-Rolled Steel Coil, 2.0mm Gauge, Grade ASTM A1008\n• Inquiry Volume: 5,000 kg to 10,000 kg\n• Required Delivery Window: Within 7–14 calendar days\n\nPLEASE CONFIRM:\n1. Current warehouse stock volume available for immediate reservation.\n2. Volume-tiered unit price (PHP/kg) and freight cost to Luzon.\n3. Earliest guaranteed delivery date.\n\nBest regards,\nProcurement Manager\nSupplyChain AI Manufacturing Operations`
      }
    ];

    // ============================================================================
    // MAIN APPLICATION COMPONENT
    // ============================================================================
    function App() {
      // STRICTLY 5 MAIN SIDEBAR ITEMS: dashboard | alerts | orders | suppliers | schedule
      const [activeNav, setActiveNav] = useState("dashboard");
      const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

      // Sub-tabs inside main pages
      const [alertFilterTab, setAlertFilterTab] = useState("All");
      const [alertDetailTab, setAlertDetailTab] = useState("Summary");
      const [ordersTab, setOrdersTab] = useState("Purchase Orders");
      const [suppliersTab, setSuppliersTab] = useState("Suppliers");
      const [scheduleTab, setScheduleTab] = useState("AI Recommended Schedule");

      // Core Stateful Data
      const [alerts, setAlerts] = useState(INITIAL_ALERTS);
      const [purchaseOrders, setPurchaseOrders] = useState(INITIAL_PURCHASE_ORDERS);
      const [inventory, setInventory] = useState(INITIAL_INVENTORY);
      const [productionOrders, setProductionOrders] = useState(INITIAL_PRODUCTION_ORDERS);
      const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
      const [rfqs, setRfqs] = useState(INITIAL_RFQS);

      // Track which AI Recommendations the user has performed (shows Green Check Icon!)
      const [completedRecs, setCompletedRecs] = useState({
        REC_RFQ_METRO: false,
        REC_RFQ_BACKUPS: false,
        REC_SCHEDULE: false,
        REC_PRIORITIZE: false
      });

      // Individual Schedule Card Editing State (allows editing ANY schedule card individually!)
      const [editingScheduleOrderId, setEditingScheduleOrderId] = useState(null);
      const [singleCardEditForm, setSingleCardEditForm] = useState({
        suggestedDate: "",
        changeLabel: ""
      });

      // Search & Header UI
      const [searchQuery, setSearchQuery] = useState("");
      const [showNotifications, setShowNotifications] = useState(false);
      const [showProfileMenu, setShowProfileMenu] = useState(false);
      const [toast, setToast] = useState(null);

      // Selected Alert for Alert Details Drawer
      const [selectedAlertId, setSelectedAlertId] = useState(null);
      const selectedAlert = useMemo(
        () => alerts.find(a => a.id === selectedAlertId) || null,
        [alerts, selectedAlertId]
      );
      const [workflowVisibleStep, setWorkflowVisibleStep] = useState(11);

      // Selected Purchase Order or Supplier for Detail Modals
      const [selectedPoDetail, setSelectedPoDetail] = useState(null);
      const [selectedSupplierDetail, setSelectedSupplierDetail] = useState(null);

      // Inline RFQ Editing State
      const [editingRfqId, setEditingRfqId] = useState(null);

      // Schedule State
      const [scheduleApproved, setScheduleApproved] = useState("PENDING");
      const [showScheduleExplanation, setShowScheduleExplanation] = useState(false);
      const [showModifyScheduleModal, setShowModifyScheduleModal] = useState(false);
      const [customDates, setCustomDates] = useState({
        "PO-101": "Oct 25",
        "PO-102": "Nov 4",
        "PO-103": "Nov 9",
        "PO-104": "Nov 5"
      });

      // Human-in-the-Loop Approval Modal State
      const [approvalModal, setApprovalModal] = useState(null);

      // Simulate Disruption Modal State
      const [showSimulateModal, setShowSimulateModal] = useState(false);
      const [selectedSimScenarioId, setSelectedSimScenarioId] = useState("STEEL_DELAY");
      const [simStageIndex, setSimStageIndex] = useState(-1);

      // Nested Reports & Settings Modals
      const [showReportsModal, setShowReportsModal] = useState(false);
      const [showSettingsModal, setShowSettingsModal] = useState(false);

      // Reports Metrics State
      const [reportStats, setReportStats] = useState({
        totalDisruptions: 14,
        disruptionsResolved: 11,
        productionOrdersSaved: 19,
        avgResponseTime: "1.4 mins",
        emergencyPurchaseCosts: "₱340,000",
        lineStoppagesAvoided: "7 days (14 shifts)",
        estimatedSavings: "₱4,850,000"
      });

      // Approval History Log
      const [approvalHistory, setApprovalHistory] = useState([
        {
          id: "HIST-101",
          timestamp: "Oct 20, 2026 · 16:40",
          actionType: "Schedule & Buffer Check",
          summary: "Verified early arrival of ChemSolutions PO-4398. No schedule change needed.",
          actor: "Procurement Manager",
          status: "APPROVED"
        }
      ]);

      // Settings State
      const [settingsState, setSettingsState] = useState({
        emailNotifications: true,
        criticalSmsAlerts: true,
        autoDraftRfqs: true,
        strictHumanApproval: true,
        minSupplierReliability: 85,
        erpSystem: "SAP S/4HANA + SQLite Sandbox (Connected)",
        emailIntegration: "Microsoft 365 Inbound Procurement Inbox (Active)",
        shippingApi: "MarineTraffic Port AIS + Carrier EDI Webhook (Active)"
      });

      const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 4500);
      };

      const markRecComplete = (key) => {
        setCompletedRecs(prev => ({ ...prev, [key]: true }));
      };

      // Check how many suppliers have replied with quotes
      const anyQuoteReceived = useMemo(
        () => suppliers.some(s => s.quoteReceived),
        [suppliers]
      );

      const [selectedCalendarDay, setSelectedCalendarDay] = useState("Oct 21");
      const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
      const [selectedPlant, setSelectedPlant] = useState("Laguna & Cebu Stamping");

      // Interactive Calendar Pop-up & Scheduled Deliveries State
      const [showCalendarModal, setShowCalendarModal] = useState(false);
      const [calendarEvents, setCalendarEvents] = useState([
        {
          id: "up-1",
          dateKey: "Oct 21",
          icon: "schedule",
          category: "Supplier Delivery",
          title: "Steel Coil Bridge (80t)",
          supplierName: "MetroSteel Industries",
          time: "Oct 21 · 08:00 AM (GMT-8) · MetroSteel",
          nav: "suppliers",
        },
        {
          id: "up-2",
          dateKey: "Oct 22",
          icon: "truck",
          category: "Shift Resequence",
          title: "PO-103 Line A (+2d Swap)",
          supplierName: "Laguna Plant",
          time: "Oct 22 · 06:00 AM (GMT-8) · Laguna Plant",
          nav: "schedule",
        },
        {
          id: "up-3",
          dateKey: "Oct 24",
          icon: "orders",
          category: "Buffer Allocation",
          title: "PO-102 Chassis Expedite",
          supplierName: "Global Metals Co.",
          time: "Oct 24 · 02:00 PM (GMT-8) · Dock B",
          nav: "orders",
        },
      ]);
      const MONTH_NAMES = useMemo(() => [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ], []);

      const [calendarYear, setCalendarYear] = useState(2026);
      const [calendarMonthIndex, setCalendarMonthIndex] = useState(9); // 9 = October
      const [showMonthPicker, setShowMonthPicker] = useState(false);

      const [calendarScheduleForm, setCalendarScheduleForm] = useState({
        dateKey: "Oct 20",
        isoDate: "2026-10-20",
        supplierId: "SUP-METRO",
        material: "Steel Coil",
        quantity: "5,000 kg",
        timeSlot: "08:00 AM (GMT-8) · Morning Dock A",
      });

      // Dynamic Month Days Calculation for Calendar Grid
      const currentMonthDays = useMemo(() => {
        const daysInMonth = new Date(calendarYear, calendarMonthIndex + 1, 0).getDate();
        const firstDayWeekday = new Date(calendarYear, calendarMonthIndex, 1).getDay(); // 0 for Sun
        const monthShort = MONTH_NAMES[calendarMonthIndex].slice(0, 3);
        const days = [];
        for (let num = 1; num <= daysInMonth; num++) {
          days.push({
            rawNum: num,
            dateNum: String(num).padStart(2, "0"),
            key: `${monthShort} ${num}`,
          });
        }
        return {
          daysInMonth,
          firstDayWeekday,
          days,
          monthName: MONTH_NAMES[calendarMonthIndex],
          year: calendarYear,
        };
      }, [calendarYear, calendarMonthIndex, MONTH_NAMES]);

      // Full October 2026 Days Array (Oct 1 = Thursday)
      const allOctoberDays = useMemo(() => {
        const dayNames = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
        return Array.from({ length: 31 }, (_, i) => {
          const num = i + 1;
          return {
            dayName: dayNames[i % 7],
            dateNum: String(num).padStart(2, "0"),
            rawNum: num,
            key: `Oct ${num}`,
          };
        });
      }, []);

      // 5-day horizontal window centered on selectedCalendarDay
      const visibleCalendarDays = useMemo(() => {
        const match = /^Oct\s+(\d+)$/i.exec(selectedCalendarDay);
        const dayNum = match ? parseInt(match[1], 10) : 20;
        let startIdx = Math.max(0, Math.min(26, dayNum - 3));
        return allOctoberDays.slice(startIdx, startIdx + 5);
      }, [selectedCalendarDay, allOctoberDays]);

      // Add New Supplier Modal State (Pre-Approved Backup Supplier enabled, Historical Reliability handled by backend)
      const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
      const [newSupplierForm, setNewSupplierForm] = useState({
        name: "",
        material: "Steel Coil",
        location: "Batangas, Philippines",
        leadTime: "2–5 days",
        leadTimeDays: 4,
        isBackupApproved: true,
        contactEmail: "",
        phone: "+63 (02) 8555-0199",
        notes: "",
      });

      const handleOpenCalendarPopup = (dayKey = selectedCalendarDay) => {
        let mIdx = 9; // October default
        let dNum = 20;
        const parts = dayKey.split(" ");
        if (parts.length >= 2) {
          const mStr = parts[0];
          const foundIdx = MONTH_NAMES.findIndex(m => m.toLowerCase().startsWith(mStr.toLowerCase()));
          if (foundIdx !== -1) mIdx = foundIdx;
          const parsed = parseInt(parts[1], 10);
          if (!isNaN(parsed)) dNum = parsed;
        }
        setCalendarYear(2026);
        setCalendarMonthIndex(mIdx);
        setShowMonthPicker(false);
        setSelectedCalendarDay(dayKey);
        setCalendarScheduleForm((prev) => ({
          ...prev,
          dateKey: dayKey,
          isoDate: `2026-${String(mIdx + 1).padStart(2, "0")}-${String(dNum).padStart(2, "0")}`,
        }));
        setShowCalendarModal(true);
      };

      const handleScheduleCalendarEvent = (e) => {
        if (e) e.preventDefault();
        const chosenSup =
          suppliers.find((s) => s.id === calendarScheduleForm.supplierId) || suppliers[0];
        const chosenDateKey = calendarScheduleForm.dateKey || "Oct 20";
        setSelectedCalendarDay(chosenDateKey);
        const newEvent = {
          id: `up-${Date.now().toString().slice(-4)}`,
          dateKey: chosenDateKey,
          icon: "truck",
          category: `Scheduled · ${chosenSup ? chosenSup.name : "Supplier"}`,
          title: `${calendarScheduleForm.material} (${calendarScheduleForm.quantity})`,
          supplierName: chosenSup ? chosenSup.name : "Custom Supplier",
          time: `${chosenDateKey} · ${calendarScheduleForm.timeSlot} (${chosenSup ? chosenSup.name : "Supplier"})`,
          nav: "suppliers",
        };
        setCalendarEvents((prev) => [newEvent, ...prev]);
        setShowCalendarModal(false);
        showToast(
          `Scheduled ${calendarScheduleForm.quantity} ${calendarScheduleForm.material} with ${
            chosenSup ? chosenSup.name : "Supplier"
          } on ${chosenDateKey} (${calendarScheduleForm.timeSlot}).`
        );
      };

      const handleAddSupplier = (e) => {
        if (e) e.preventDefault();
        const cleanName = newSupplierForm.name.trim();
        if (!cleanName) {
          showToast("Please enter a Supplier Name.");
          return;
        }
        const suffix = Date.now().toString().slice(-3);
        const supId = `SUP-CUSTOM-${suffix}`;
        const rfqId = `RFQ-CUSTOM-${suffix}`;
        const email =
          newSupplierForm.contactEmail.trim() ||
          `sales@${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com.ph`;

        const createdSupplier = {
          id: supId,
          rfqId,
          name: cleanName,
          material: newSupplierForm.material || "Steel Coil",
          location: newSupplierForm.location || "Manila, Philippines",
          leadTime: newSupplierForm.leadTime || "3–6 days",
          leadTimeDays: Number(newSupplierForm.leadTimeDays) || 4,
          status: newSupplierForm.isBackupApproved ? "PRE-APPROVED" : "PENDING-REVIEW",
          isBackupApproved: Boolean(newSupplierForm.isBackupApproved),
          reliability: 92, // Handled automatically by backend historical scoring
          quoteReceived: false,
          quotedPricePerKg: "₱65/kg",
          quotedTotal: "₱325,000 (for 5,000 kg)",
          confirmedAvailableQty: "6,000 kg",
          quoteStatus: "Not Sent — Send RFQ to Check Stock & Price",
          recommendedAfterQuote: false,
          postQuoteBadge: newSupplierForm.isBackupApproved ? "PRE-APPROVED BACKUP" : "VERIFIED CUSTOM SUPPLIER",
          contactEmail: email,
          phone: newSupplierForm.phone || "+63 (02) 8555-0199",
          notes:
            newSupplierForm.notes.trim() ||
            `Custom ${newSupplierForm.isBackupApproved ? "pre-approved " : ""}backup supplier in ${newSupplierForm.location}. Send an RFQ to confirm current stock and unit pricing.`,
        };

        const createdRfq = {
          id: rfqId,
          supplierId: supId,
          supplierName: cleanName,
          recipientEmail: email,
          location: createdSupplier.location,
          leadTime: createdSupplier.leadTime,
          requestedQty: "5,000 kg",
          status: "Ready for Approval",
          supplierReply: null,
          subject: `URGENT RFQ [Ref: EXP-2026-${suffix}] — Stock Availability & Price Inquiry: 5,000 kg ${createdSupplier.material}`,
          message: `Dear ${cleanName} Commercial Desk,\n\nWe are requesting an immediate stock availability check and unit price quotation for our upcoming production schedule:\n\n• Material Specification: ${createdSupplier.material} (Industrial Grade)\n• Requested Quantity: 5,000 kg\n• Target Delivery Window: ${createdSupplier.leadTime} (DDP Receiving Dock)\n\nPLEASE CONFIRM BY RETURN EMAIL:\n1. Immediate Stock Availability in your ${createdSupplier.location} warehouse.\n2. Best unit price (PHP/kg) and delivery freight charges.\n3. Earliest guaranteed dock arrival date.\n\nBest regards,\nProcurement Manager\nSupplyChain AI Manufacturing Operations`,
        };

        setSuppliers((prev) => [...prev, createdSupplier]);
        setRfqs((prev) => [...prev, createdRfq]);
        setCalendarScheduleForm((prev) => ({
          ...prev,
          supplierId: supId,
          material: createdSupplier.material,
        }));
        setNewSupplierForm({
          name: "",
          material: "Steel Coil",
          location: "Batangas, Philippines",
          leadTime: "2–5 days",
          leadTimeDays: 4,
          isBackupApproved: true,
          contactEmail: "",
          phone: "+63 (02) 8555-0199",
          notes: "",
        });
        setShowAddSupplierModal(false);
        showToast(`Added supplier "${cleanName}" and generated a draft RFQ!`);
      };

      const [amdTelemetry, setAmdTelemetry] = useState({
        model_id: "Gemma-4-31B-IT",
        gpu_device: "AMD Instinct MI300X (192GB HBM3, ROCm 6.3)",
        endpoint: "https://developer.amd.com.cn/radeon/api/v1",
        live_key_configured: true,
        mode_active: "AMD_LIVE"
      });

      // Sync with backend API on mount
      useEffect(() => {
        fetch("/api/erp/snapshot")
          .then(r => r.json())
          .then(d => {
            if (d && d.amd_telemetry) {
              setAmdTelemetry(d.amd_telemetry);
            }
          })
          .catch(() => {});
      }, []);

      // Universal zero-scrollbar runtime injection to guarantee no browser scrollbars
      useEffect(() => {
        const id = "zero-scrollbar-dyn";
        if (!document.getElementById(id)) {
          const st = document.createElement("style");
          st.id = id;
          st.textContent = `
            html, body, #root, #main-scroll-container, div, aside, main, section, nav, article, table, tbody, * {
              scrollbar-width: none !important;
              -ms-overflow-style: none !important;
            }
            ::-webkit-scrollbar {
              width: 0px !important;
              height: 0px !important;
              display: none !important;
              background: transparent !important;
            }
            ::-webkit-scrollbar-thumb {
              display: none !important;
              background: transparent !important;
            }
            ::-webkit-scrollbar-track {
              display: none !important;
              background: transparent !important;
            }
            ::-webkit-scrollbar-corner {
              display: none !important;
              background: transparent !important;
            }
            #main-scroll-container::-webkit-scrollbar,
            div::-webkit-scrollbar,
            aside::-webkit-scrollbar,
            main::-webkit-scrollbar,
            table::-webkit-scrollbar {
              width: 0px !important;
              height: 0px !important;
              display: none !important;
              background: transparent !important;
            }
          `;
          document.head.appendChild(st);
        }
      }, []);

      // Animate AI Activity steps when Alert Details is opened
      const openAlertDetails = (alertItem, defaultTab = "Summary") => {
        setSelectedAlertId(alertItem.id);
        setAlertDetailTab(defaultTab);
        setWorkflowVisibleStep(1);
      };

      useEffect(() => {
        if (!selectedAlert) return;
        const maxSteps = (selectedAlert.workflowSteps || []).length || 11;
        if (workflowVisibleStep < maxSteps) {
          const t = setTimeout(() => {
            setWorkflowVisibleStep(prev => prev + 1);
          }, 150);
          return () => clearTimeout(t);
        }
      }, [selectedAlert, workflowVisibleStep]);

      // Active scenario object for Simulate Disruption modal
      const chosenSimScenario = useMemo(
        () => SIMULATE_SCENARIO_OPTIONS.find(s => s.id === selectedSimScenarioId) || SIMULATE_SCENARIO_OPTIONS[0],
        [selectedSimScenarioId]
      );

      // Dynamic 8-stage simulation messages based on the chosen scenario
      const currentSimStages = useMemo(() => {
        const steps = chosenSimScenario.workflowSteps || [];
        return [
          { label: "Reading Email", detail: steps[0] || `Reading message from ${chosenSimScenario.supplier}...` },
          { label: "Detecting Issue", detail: steps[1] || `Detected ${chosenSimScenario.title}` },
          { label: "Checking Inventory", detail: `${steps[2] || ""} ${steps[3] || ""}`.trim() },
          { label: "Finding Affected Orders", detail: `${steps[4] || ""} ${steps[5] || ""}`.trim() },
          { label: "Finding Backup Suppliers", detail: `${steps[6] || ""} ${steps[7] || ""}`.trim() },
          { label: "Generating RFQs", detail: steps[8] || "Drafting stock & price inquiry RFQs..." },
          { label: "Generating Schedule Recommendation", detail: steps[9] || "Calculating production schedule adjustments..." },
          { label: "Complete", detail: steps[10] || "Recommendation ready for human review." }
        ];
      }, [chosenSimScenario]);

      const startSimulationRun = () => {
        setSimStageIndex(0);
        const backendScenarioMap = {
          STEEL_DELAY: "SCENARIO_1_STEEL_DELAY",
          ALUMINUM_SHORTAGE: "SCENARIO_2_RESIN_SHORTAGE",
          SUPPLIER_CANCELLATION: "SCENARIO_1_STEEL_DELAY",
          PORT_DELAY: "SCENARIO_4_AMBIGUOUS_EMAIL"
        };
        fetch("/api/signals/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scenario_id: backendScenarioMap[selectedSimScenarioId] || "SCENARIO_1_STEEL_DELAY" })
        }).catch(() => {});
      };

      const finalizeSimulationAlert = (sc) => {
        const newAlert = buildAlertFromScenario(
          sc,
          Date.now().toString().slice(-3),
          "Just now",
          "October 21, 2026 (Just now)"
        );
        setAlerts(prev => {
          const withoutDuplicate = prev.filter(a => a.title !== newAlert.title);
          return [newAlert, ...withoutDuplicate];
        });
        if (sc.id === "ALUMINUM_SHORTAGE") {
          setInventory(prev =>
            prev.map(item =>
              item.material === "Aluminum"
                ? { ...item, currentStock: "8,800 kg", daysRemaining: 11, status: "CRITICAL" }
                : item
            )
          );
          setProductionOrders(prev =>
            prev.map(po =>
              po.orderId === "PO-104"
                ? { ...po, status: "AT RISK", risk: "HIGH", materialStatus: "SHORTAGE (-20%)", suggestedDate: "Nov 10", changeLabel: "+5 DAYS" }
                : po
            )
          );
        }
        setReportStats(prev => ({ ...prev, totalDisruptions: prev.totalDisruptions + 1 }));
        showToast(`Simulated "${sc.title}" (${sc.material} · ${sc.supplier}). Click "Open AI Alert Analysis" to inspect.`);
        return newAlert;
      };

      useEffect(() => {
        if (simStageIndex >= 0 && simStageIndex < currentSimStages.length) {
          const timer = setTimeout(() => {
            setSimStageIndex(prev => prev + 1);
          }, 460);
          return () => clearTimeout(timer);
        } else if (simStageIndex === currentSimStages.length) {
          finalizeSimulationAlert(chosenSimScenario);
        }
      }, [simStageIndex]);

      // Dispatches RFQ via live AMD LLM backend endpoint (POST /api/rfq/dispatch-and-reply)
      const dispatchRfqViaBackend = async (rfqId) => {
        const targetSupplier =
          rfqId === "RFQ-IRON" ? "IronWorks Supply" :
          rfqId === "RFQ-FAST" ? "FastMetals Corp" :
          "MetroSteel Industries";

        try {
          const res = await fetch("/api/rfq/dispatch-and-reply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              rfq_id: rfqId || "ALL_BACKUPS",
              supplier_name: targetSupplier,
              plant: "Laguna & Cebu Stamping"
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.amd_telemetry) {
              setAmdTelemetry(data.amd_telemetry);
            }
            applySupplierQuoteReply(rfqId, data.replies);
            return;
          }
        } catch (err) {
          console.warn("Backend RFQ dispatch error, using local fallback:", err);
        }
        applySupplierQuoteReply(rfqId);
      };

      // Reveal supplier stock & price ONLY AFTER the RFQ email is sent!
      const applySupplierQuoteReply = (rfqId, customReplies = null) => {
        const replyData = customReplies || {
          "RFQ-METRO": {
            stockConfirmed: "5,000 kg in stock (Manila warehouse)",
            quotedPrice: "₱68/kg (₱340,000 total)",
            promisedDelivery: "5 days (Guaranteed Oct 26)",
            note: "We confirm 5,000 kg of ASTM A1008 2.0mm Steel Coil is in stock in Manila ready for immediate slitting at ₱68/kg (DDP Laguna Stamping). Dedicated direct trucking ready."
          },
          "RFQ-IRON": {
            stockConfirmed: "8,000 kg in stock (Cebu depot)",
            quotedPrice: "₱64/kg (₱512,000 total)",
            promisedDelivery: "8 days (Oct 29)",
            note: "We confirm 8,000 kg available in our Cebu depot at ₱64/kg; earliest RoRo vessel arrival to Luzon is 8 calendar days."
          },
          "RFQ-FAST": {
            stockConfirmed: "10,000 kg in stock (Davao warehouse)",
            quotedPrice: "₱61/kg (₱305,000 for 5,000 kg)",
            promisedDelivery: "11 days (Nov 1)",
            note: "We hold 10,000 kg in Davao at ₱61/kg; container sea freight lead time to Laguna dock is 11 calendar days."
          }
        };

        setRfqs(prev =>
          prev.map(r => {
            if (rfqId && r.id !== rfqId) return r;
            const rep = replyData[r.id] || {
              stockConfirmed: "6,000 kg in stock (Confirmed)",
              quotedPrice: "₱65/kg (₱325,000 for 5,000 kg)",
              promisedDelivery: `${r.leadTime} (Confirmed)`,
              note: `We confirm 6,000 kg of ${r.supplierName} stock ready for immediate dispatch at ₱65/kg.`
            };
            return {
              ...r,
              status: "Quote Received (Stock & Price Revealed)",
              supplierReply: rep
            };
          })
        );

        setSuppliers(prev =>
          prev.map(s => {
            if (s.id === "SUP-METRO" && (!rfqId || rfqId === "RFQ-METRO")) {
              return {
                ...s,
                quoteReceived: true,
                quoteStatus: "✓ Quote Received: 5,000 kg in stock @ ₱68/kg (5d)"
              };
            }
            if (s.id === "SUP-IRON" && (!rfqId || rfqId === "RFQ-IRON")) {
              return {
                ...s,
                quoteReceived: true,
                quoteStatus: "✓ Quote Received: 8,000 kg in stock @ ₱64/kg (8d)"
              };
            }
            if (s.id === "SUP-FAST" && (!rfqId || rfqId === "RFQ-FAST")) {
              return {
                ...s,
                quoteReceived: true,
                quoteStatus: "✓ Quote Received: 10,000 kg in stock @ ₱61/kg (11d)"
              };
            }
            if (s.rfqId && (!rfqId || rfqId === s.rfqId)) {
              return {
                ...s,
                quoteReceived: true,
                quoteStatus: `✓ Quote Received: ${s.confirmedAvailableQty} in stock @ ${s.quotedPricePerKg}`
              };
            }
            return s;
          })
        );
      };

      // Open individual card edit on the Schedule page
      const startEditingSingleCard = (ord) => {
        setEditingScheduleOrderId(ord.orderId);
        setSingleCardEditForm({
          suggestedDate: ord.suggestedDate,
          changeLabel: ord.changeLabel
        });
      };

      const saveSingleCardSchedule = (orderId) => {
        setProductionOrders(prev =>
          prev.map(po => {
            if (po.orderId !== orderId) return po;
            const newDate = singleCardEditForm.suggestedDate.trim() || po.suggestedDate;
            const newChange =
              newDate === po.currentDate
                ? "NO CHANGE"
                : singleCardEditForm.changeLabel.trim() || "MODIFIED";
            return {
              ...po,
              suggestedDate: newDate,
              changeLabel: newChange,
              modifiedByUser: true
            };
          })
        );
        setCustomDates(prev => ({
          ...prev,
          [orderId]: singleCardEditForm.suggestedDate.trim() || prev[orderId]
        }));
        setEditingScheduleOrderId(null);
        markRecComplete("REC_SCHEDULE");
        setApprovalHistory(prev => [
          {
            id: `HIST-${Date.now().toString().slice(-3)}`,
            timestamp: "Oct 21, 2026 · Just now",
            actionType: "Individual Schedule Edit",
            summary: `Modified ${orderId} schedule date to ${singleCardEditForm.suggestedDate}`,
            actor: "Procurement Manager",
            status: "APPROVED"
          },
          ...prev
        ]);
        showToast(`Updated schedule for ${orderId} to ${singleCardEditForm.suggestedDate}.`);
      };

      // Handle Human-in-the-Loop Approval Confirmation
      const handleConfirmApproval = (decision) => {
        if (!approvalModal) return;
        const { type, targetId, subAction, title, recKey } = approvalModal;

        if (decision === "EDIT") {
          setApprovalModal(null);
          if (type === "RFQ" || type === "SUPPLIER") {
            setActiveNav("suppliers");
            setSuppliersTab("RFQ Drafts");
            setEditingRfqId(targetId && targetId.startsWith("RFQ") ? targetId : "RFQ-METRO");
          } else if (type === "SCHEDULE") {
            setActiveNav("schedule");
            setScheduleTab("AI Recommended Schedule");
            setShowModifyScheduleModal(true);
          }
          return;
        }

        if (decision === "REJECT") {
          if (type === "SCHEDULE") {
            setScheduleApproved("REJECTED");
          }
          setApprovalHistory(prev => [
            {
              id: `HIST-${Date.now().toString().slice(-3)}`,
              timestamp: "Oct 21, 2026 · Just now",
              actionType: `${type} Rejection`,
              summary: `Rejected: ${title}`,
              actor: "Procurement Manager",
              status: "REJECTED"
            },
            ...prev
          ]);
          setApprovalModal(null);
          showToast(`Rejected recommendation: ${title}`);
          return;
        }

        // APPROVED
        if (type === "RFQ") {
          if (targetId === "ALL_BACKUPS") {
            setRfqs(prev => prev.map(r => ({ ...r, status: "Sent — Awaiting Quote" })));
            dispatchRfqViaBackend("ALL_BACKUPS");
            markRecComplete("REC_RFQ_METRO");
            markRecComplete("REC_RFQ_BACKUPS");
            showToast("All 3 RFQs dispatched! Suppliers replied with their confirmed stock & unit prices.");
          } else {
            const nextStatus = subAction === "SEND" ? "Sent — Awaiting Quote" : "Approved (Ready to Send)";
            setRfqs(prev =>
              prev.map(r => (r.id === targetId ? { ...r, status: nextStatus } : r))
            );
            if (subAction === "SEND") {
              dispatchRfqViaBackend(targetId);
            }
            if (targetId === "RFQ-METRO") {
              markRecComplete("REC_RFQ_METRO");
            } else {
              markRecComplete("REC_RFQ_BACKUPS");
            }
            showToast(
              subAction === "SEND"
                ? `RFQ sent to ${title}. Supplier replied with confirmed stock & unit price!`
                : `RFQ draft for ${title} approved. Click "Send Email" to request stock & price.`
            );
          }
        } else if (type === "SUPPLIER") {
          setSuppliers(prev =>
            prev.map(s => (s.id === targetId ? { ...s, status: "ORDER AWARDED", quoteReceived: true, quoteStatus: `PO Issued (${s.confirmedAvailableQty} @ ${s.quotedPricePerKg})` } : s))
          );
          setRfqs(prev =>
            prev.map(r => (r.supplierId === targetId ? { ...r, status: "Order Placed" } : r))
          );
          markRecComplete("REC_RFQ_METRO");
          showToast(`Emergency Purchase Order awarded to ${title}!`);
        } else if (type === "SCHEDULE") {
          setScheduleApproved("APPROVED");
          setProductionOrders(prev =>
            prev.map(po => ({
              ...po,
              currentDate: po.suggestedDate,
              status: "RESCHEDULED (SAFE)",
              risk: "LOW"
            }))
          );
          markRecComplete("REC_SCHEDULE");
          markRecComplete("REC_PRIORITIZE");
          showToast("Approved AI Production Schedule! PO-102 and PO-103 updated.");
        }

        if (recKey) {
          markRecComplete(recKey);
        }

        setReportStats(prev => ({
          ...prev,
          disruptionsResolved: prev.disruptionsResolved + 1,
          productionOrdersSaved: prev.productionOrdersSaved + 2
        }));

        setApprovalHistory(prev => [
          {
            id: `HIST-${Date.now().toString().slice(-3)}`,
            timestamp: "Oct 21, 2026 · Just now",
            actionType: `${type} Approval`,
            summary: `Approved: ${title}`,
            actor: "Procurement Manager",
            status: "APPROVED"
          },
          ...prev
        ]);

        setApprovalModal(null);
      };

      // Trigger an AI Recommendation action directly from the Alert Details drawer
      const triggerRecommendationAction = (rec) => {
        if (rec.key === "REC_RFQ_METRO") {
          setApprovalModal({
            type: "RFQ",
            subAction: "SEND",
            targetId: "RFQ-METRO",
            recKey: "REC_RFQ_METRO",
            stepBadge: "Step 1 of 2 · Send RFQ to Ask Stock & Price",
            title: "MetroSteel Industries — 5,000 kg RFQ Inquiry",
            summary: "Send formal RFQ email to MetroSteel Industries asking to confirm how much Steel Coil stock they have on hand and their unit price.",
            delivery: "3–7 days (To be confirmed in supplier quote)",
            reason: "Price and stock availability are unknown until we send the RFQ inquiry."
          });
        } else if (rec.key === "REC_RFQ_BACKUPS") {
          setApprovalModal({
            type: "RFQ",
            subAction: "SEND",
            targetId: "ALL_BACKUPS",
            recKey: "REC_RFQ_BACKUPS",
            stepBadge: "Step 1 of 2 · Send All 3 Stock & Price RFQs",
            title: "MetroSteel, IronWorks & FastMetals — Stock & Price RFQs",
            summary: "Send RFQ emails to all 3 pre-approved backup suppliers so they reply with their available stock and unit pricing.",
            delivery: "3–14 days",
            reason: "Allows the AI to compare real quoted prices and confirmed stock before ranking the best supplier."
          });
        } else if (rec.key === "REC_SCHEDULE") {
          setApprovalModal({
            type: "SCHEDULE",
            targetId: "SCHED-01",
            recKey: "REC_SCHEDULE",
            stepBadge: "Production Schedule Adjustment",
            title: "Reschedule PO-102 (Nov 4) & PO-103 (Nov 9)",
            summary: "Postpone PO-102 and PO-103 by +7 days so emergency backup steel arrives before line setup.",
            delivery: "Eliminates 7-day inventory gap",
            reason: "Prevents unscheduled factory line stoppage while backup supplier delivery is in transit."
          });
        } else {
          markRecComplete(rec.key);
          showToast(`Completed: ${rec.text}`);
        }
      };

      // Filtered Alerts for Alerts Page
      const filteredAlerts = useMemo(() => {
        return alerts.filter(a => {
          const matchesTab = alertFilterTab === "All" || a.category === alertFilterTab;
          const q = searchQuery.trim().toLowerCase();
          const matchesSearch =
            !q ||
            a.title.toLowerCase().includes(q) ||
            a.supplier.toLowerCase().includes(q) ||
            a.material.toLowerCase().includes(q);
          return matchesTab && matchesSearch;
        });
      }, [alerts, alertFilterTab, searchQuery]);

      // Filtered Purchase Orders for Orders Page
      const filteredPurchaseOrders = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return purchaseOrders;
        return purchaseOrders.filter(
          po =>
            po.poNumber.toLowerCase().includes(q) ||
            po.supplier.toLowerCase().includes(q) ||
            po.material.toLowerCase().includes(q)
        );
      }, [purchaseOrders, searchQuery]);

      // Strictly 5 Main Navigation Items
      const SIDEBAR_ITEMS = [
        { id: "dashboard", label: "Dashboard", icon: "dashboard", badge: null },
        { id: "alerts", label: "Alerts", icon: "alerts", badge: alerts.length },
        { id: "orders", label: "Orders", icon: "orders", badge: null },
        { id: "suppliers", label: "Suppliers", icon: "suppliers", badge: anyQuoteReceived ? "Quotes In" : "3 RFQs" },
        { id: "schedule", label: "Schedule", icon: "schedule", badge: scheduleApproved === "APPROVED" ? "Updated" : null }
      ];

      const navigateMain = (navId) => {
        setActiveNav(navId);
        setMobileSidebarOpen(false);
        const scrollEl = document.getElementById("main-scroll-container");
        if (scrollEl) {
          scrollEl.scrollTo({ top: 0, behavior: "smooth" });
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      const completedRecCount = Object.values(completedRecs).filter(Boolean).length;

      return (
        <div className="h-screen w-full overflow-hidden flex bg-[#f8f9fc] text-[#1e293b]">
          {/* Toast Notification */}
          {toast && (
            <div className="fixed bottom-5 right-5 z-50 bg-[#111827] text-white px-4 py-3 rounded-[16px] shadow-xl border border-slate-700 flex items-center gap-3 text-sm max-w-md animate-in">
              <span className="w-6 h-6 rounded-full bg-[#10b981]/20 text-[#10b981] flex items-center justify-center shrink-0">
                <Icon name="check" className="w-4 h-4" />
              </span>
              <span>{toast}</span>
            </div>
          )}

          {/* =========================================================================
              COLUMN 1: LEFT NAVIGATION SIDEBAR (256px · #ffffff · Fixed Height 100vh)
              Stays locked in place and never scrolls down with the page content.
             ========================================================================= */}
          {mobileSidebarOpen && (
            <div
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden"
            />
          )}

          <aside
            aria-label="Main Sidebar Navigation"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className={`fixed lg:static inset-y-0 left-0 z-50 w-64 lg:w-60 xl:w-64 h-screen overflow-y-auto no-scrollbar bg-[#ffffff] border-r border-[#f3f4f6] text-[#1e293b] flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 select-none ${
              mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          >
            <div className="p-5 space-y-5">
              {/* Brand Logo with Two Overlapping Circular Glyphs (#0d6efd & #f97316) */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col items-center w-full text-center relative">
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="lg:hidden absolute right-0 top-0 text-[#64748b] hover:text-[#1e293b] p-1"
                    aria-label="Close sidebar"
                  >
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                  <div className="inline-flex items-center justify-center h-12">
                    <span className="w-9 h-9 rounded-full border-[5px] border-[#0d6efd] bg-blue-50/30 inline-block" />
                    <span className="w-9 h-9 rounded-full border-[5px] border-[#f97316] bg-orange-50/30 inline-block -ml-3.5" />
                  </div>
                  <div className="font-extrabold text-lg tracking-tight text-[#1e293b] mt-1">
                    SupplyChain AI
                  </div>
                  <div className="text-[11px] font-medium text-[#64748b]">
                    Autonomous Exception Handler · Laguna & Cebu Stamping
                  </div>
                </div>
              </div>

              {/* STRICTLY 5 MAIN NAVIGATION ITEMS with #0d6efd Active State + Right Vertical Indicator Pill */}
              <nav className="space-y-1.5" aria-label="Primary Sidebar Links">
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateMain(item.id)}
                      className={`relative w-full flex items-center justify-between px-3.5 py-3 rounded-[14px] text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-blue-50/90 text-[#0d6efd] font-extrabold"
                          : "text-[#64748b] font-semibold hover:bg-[#f8f9fc] hover:text-[#1e293b]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          name={item.icon}
                          className={`w-5 h-5 ${isActive ? "text-[#0d6efd]" : "text-[#64748b]"}`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span
                            className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              isActive
                                ? "bg-[#0d6efd] text-white"
                                : item.id === "alerts"
                                ? "bg-orange-100 text-[#f97316]"
                                : "bg-slate-100 text-[#64748b]"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {/* Rounded Vertical Indicator Pill on the Right Edge (matches Mockup) */}
                      {isActive && (
                        <span className="absolute -right-5 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-l-full bg-[#0d6efd]" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Simulate Disruption Action Button in Sidebar Navigation */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSimStageIndex(-1);
                    setShowSimulateModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3.5 py-3 rounded-[14px] bg-[#0d6efd] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0d6efd]/20 transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  <Icon name="bolt" className="w-4 h-4" />
                  <span>Simulate Disruption</span>
                </button>
              </div>
            </div>

            {/* Bottom Section: Gradient Promo & AMD Live Telemetry Card with Non-Overlapping Floating Badge */}
            <div className="p-5 pt-2">
              <div className="relative pt-4">
                {/* Floating Icon Badge placed at top-right so it never overlaps text */}
                <div className="w-10 h-10 rounded-[14px] bg-white shadow-md border border-blue-100 flex items-center justify-center text-[#0d6efd] absolute top-0 right-4 z-10">
                  <Icon name="cpu" className="w-5 h-5" />
                </div>
                <div className="rounded-[24px] bg-gradient-to-br from-blue-50 via-indigo-50/90 to-purple-50 border border-blue-100/80 p-4 pt-5 space-y-2">
                  <div className="pr-10">
                    <span className="badge-pill whitespace-nowrap inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 text-[#0d6efd] shrink-0">
                      AMD MI300X · ROCm
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-[#1e293b]">
                    {amdTelemetry.model_id || "Gemma-4-31B-IT"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="badge-pill whitespace-nowrap inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#111827] text-white shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                      Live
                    </span>
                    <span className="text-[10px] font-semibold text-[#64748b]">
                      Triage & RFQ Engine
                    </span>
                  </div>
                  <div className="pt-1.5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setShowReportsModal(true)}
                      className="flex-1 py-2 px-3 rounded-[12px] bg-[#0d6efd] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-[#0d6efd]/20 transition-all duration-300 whitespace-nowrap shrink-0"
                    >
                      ROI Report
                    </button>
                    <button
                      onClick={() => setShowSettingsModal(true)}
                      title="System Settings"
                      aria-label="Open Settings"
                      className="p-2 rounded-[12px] bg-white hover:bg-slate-50 text-[#64748b] hover:text-[#1e293b] border border-blue-100 transition-all duration-300 shrink-0"
                    >
                      <Icon name="settings" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* =========================================================================
              COLUMN 2: CENTRAL MAIN CONTENT AREA (Independent Scroll Container)
              Header sits at the top of the content flow (does NOT scroll down over cards)
             ========================================================================= */}
          <div
            id="main-scroll-container"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="flex-1 h-screen overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col min-w-0 bg-[#f8f9fc]"
          >
            {/* Top Header with 3xl Greeting & Pill-Shaped Search Bar */}
            <header className="px-4 sm:px-5 xl:px-6 2xl:px-8 pt-6 pb-4 bg-[#f8f9fc]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileSidebarOpen(true)}
                    className="lg:hidden p-2.5 rounded-[12px] bg-white border border-[#f3f4f6] text-[#1e293b] shadow-xs"
                    aria-label="Open navigation menu"
                  >
                    <Icon name="menu" className="w-5 h-5" />
                  </button>
                  {activeNav === "dashboard" && (
                    <div>
                      <h1 className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-[#1e293b] tracking-tight">
                        Welcome back, Procurement Manager
                      </h1>
                      <p className="text-xs sm:text-sm font-medium text-[#64748b] mt-0.5">
                        SupplyChain AI Command Center · Autonomous Supply Chain Exception Handler
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Elongated Pill-Shaped Search Bar + Simulate CTA + Notification Bell */}
                <div className="flex items-center gap-3 w-full 2xl:w-auto 2xl:flex-1 justify-end max-w-full">
                  <div className="relative flex-1 min-w-[200px] sm:min-w-[280px] xl:min-w-[340px] 2xl:min-w-[480px]">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#64748b]">
                      <Icon name="search" className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search purchase orders, suppliers, materials..."
                      className="w-full pl-11 pr-12 py-3 text-xs sm:text-sm bg-white border border-[#f3f4f6] rounded-full shadow-xs text-[#1e293b] placeholder-[#64748b] focus:outline-none focus:border-[#0d6efd] transition-all duration-300"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute inset-y-0 right-4 flex items-center text-xs font-bold text-[#64748b] hover:text-[#1e293b] whitespace-nowrap shrink-0"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Notification Bell */}
                  <div className="relative shrink-0">
                    <button
                      onClick={() => {
                        setShowNotifications(!showNotifications);
                        setShowProfileMenu(false);
                      }}
                      className="relative p-2.5 rounded-[12px] bg-white border border-[#f3f4f6] text-[#64748b] hover:text-[#1e293b] shadow-xs transition-all duration-300"
                      aria-label="Notifications"
                    >
                      <Icon name="bell" className="w-5 h-5" />
                      <span className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0d6efd] text-white text-[10px] font-bold select-none" role="status" aria-label={`${alerts.length} active disruptions`}>
                        {alerts.length}
                      </span>
                    </button>

                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-[24px] shadow-xl border border-[#f3f4f6] p-4 z-50 animate-in">
                        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#f3f4f6]">
                          <span className="text-xs font-extrabold text-[#1e293b]">Recent Disruptions</span>
                          <button
                            onClick={() => {
                              setShowNotifications(false);
                              navigateMain("alerts");
                            }}
                            className="text-xs text-[#0d6efd] hover:underline font-bold whitespace-nowrap shrink-0"
                          >
                            View All
                          </button>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
                          {alerts.map(a => (
                            <button
                              key={a.id}
                              onClick={() => {
                                setShowNotifications(false);
                                openAlertDetails(a);
                              }}
                              className="w-full text-left p-3 rounded-[16px] hover:bg-[#f8f9fc] border border-[#f3f4f6] transition-all duration-300"
                            >
                              <div className="flex items-center justify-between text-[11px] font-bold">
                                <span className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none ${
                                  a.badgeType === "CRITICAL" ? "text-[#f97316]" :
                                  a.badgeType === "WARNING" ? "text-amber-600" : "text-[#10b981]"
                                }`}>
                                  {a.badgeType}
                                </span>
                                <span className="text-[#64748b]">{a.timeAgo}</span>
                              </div>
                              <div className="text-xs font-bold text-[#1e293b] mt-0.5">{a.title}</div>
                              <div className="text-[11px] font-medium text-[#64748b]">Supplier: {a.supplier}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>

            {/* =======================================================================
                MAIN PAGE ROUTER (Dashboard | Alerts | Orders | Suppliers | Schedule)
               ======================================================================= */}
            <main className="flex-1 min-w-0 px-4 sm:px-5 xl:px-6 2xl:px-8 pb-10 pt-2 space-y-6">

              {/* =====================================================================
                  1. DASHBOARD PAGE (Matches Approved 3-Column Mockup Layout)
                 ===================================================================== */}
              {activeNav === "dashboard" && (
                <div className="space-y-6 animate-in">
                  {/* ROW 1: 4 Distinct Executive KPI Cards across full width */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 2xl:gap-6">
                    {/* Card 1: Active Disruptions */}
                    <div
                      onClick={() => navigateMain("alerts")}
                      className="saas-card p-5 2xl:p-6 cursor-pointer hover:border-blue-300 transition-all duration-300 flex items-center gap-4 tabular shadow-xs hover:shadow-md"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 text-[#0d6efd] flex items-center justify-center shrink-0">
                        <Icon name="alerts" className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-[#64748b]">Active Disruptions</div>
                        <div className="text-xl 2xl:text-2xl fluid-kpi-val font-extrabold text-[#1e293b] mt-0.5">{alerts.length} Critical</div>
                        <div className="text-[11px] font-semibold text-[#f97316] truncate mt-0.5">
                          {alerts[0]?.title}
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Purchase Orders */}
                    <div
                      onClick={() => {
                        navigateMain("orders");
                        setOrdersTab("Purchase Orders");
                      }}
                      className="saas-card p-5 2xl:p-6 cursor-pointer hover:border-orange-300 transition-all duration-300 flex items-center gap-4 tabular shadow-xs hover:shadow-md"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#fff7ed] border border-orange-100 text-[#f97316] flex items-center justify-center shrink-0">
                        <Icon name="orders" className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-[#64748b]">Purchase Orders</div>
                        <div className="text-xl 2xl:text-2xl fluid-kpi-val font-extrabold text-[#1e293b] mt-0.5">12 Active</div>
                        <div className="text-[11px] font-medium text-[#64748b] truncate mt-0.5">
                          9 On Time · 1 Delayed · 2 At Risk
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Inventory Health */}
                    <div
                      onClick={() => {
                        navigateMain("orders");
                        setOrdersTab("Inventory");
                      }}
                      className="saas-card p-5 2xl:p-6 cursor-pointer hover:border-emerald-300 transition-all duration-300 flex items-center gap-4 tabular shadow-xs hover:shadow-md"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 text-[#10b981] flex items-center justify-center shrink-0">
                        <Icon name="shield" className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-[#64748b]">Supply Chain Resilience</div>
                        <div className="text-xl 2xl:text-2xl fluid-kpi-val font-extrabold text-[#1e293b] mt-0.5">85.0%</div>
                        <div className="text-[11px] font-semibold text-[#10b981] truncate mt-0.5">
                          Steel Coil: 7 days runway active
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Production Orders at Risk */}
                    <div
                      onClick={() => {
                        navigateMain("orders");
                        setOrdersTab("Affected Orders");
                      }}
                      className="saas-card p-5 2xl:p-6 cursor-pointer hover:border-emerald-300 transition-all duration-300 flex items-center gap-4 tabular shadow-xs hover:shadow-md"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 text-[#10b981] flex items-center justify-center shrink-0">
                        <Icon name="clock" className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-[#64748b]">Production Orders at Risk</div>
                        <div className="text-xl 2xl:text-2xl fluid-kpi-val font-extrabold text-[#1e293b] mt-0.5">
                          {scheduleApproved === "APPROVED" ? "0 At Risk" : `${productionOrders.filter(o => o.status === "AT RISK").length} Orders`}
                        </div>
                        <div className="text-[11px] font-medium text-[#64748b] truncate mt-0.5">
                          {scheduleApproved === "APPROVED"
                            ? "Mitigated via shift swap"
                            : "Lead time: 5d 4h · PO-102 & PO-103"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ROW 2: Full-Width Custom CSS Bar Chart (Matches Center Analytics Card in Mockup) */}
                  <div className="saas-card p-6 fluid-card-p">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-lg font-extrabold text-[#1e293b]">
                          Analytics · Inventory Runway & Delivery Horizon
                        </h2>
                        <p className="text-xs font-medium text-[#64748b]">
                          Click or hover any bar to inspect live runway duration, lead time, and shipment status
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#64748b]">
                        <span className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                          <span className="w-3 h-3 rounded-[4px] bg-[#f97316] inline-block shrink-0" />
                          Critical Shortage / Delayed
                        </span>
                        <span className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                          <span className="w-3 h-3 rounded-[4px] bg-[#0d6efd] inline-block shrink-0" />
                          Scheduled Inbound / Shift Realignment
                        </span>
                        <span className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                          <span className="w-3 h-3 rounded-[4px] bg-[#10b981] inline-block shrink-0" />
                          Optimal Stock Coverage
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowReportsModal(true)}
                          className="px-3 py-1.5 rounded-[10px] bg-[#f8f9fc] hover:bg-blue-50 text-[#1e293b] hover:text-[#0d6efd] border border-[#e2e8f0] text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                        >
                          All Analytics ▾
                        </button>
                      </div>
                    </div>

                    {/* Bar Chart Container with Y-Axis Labels & Horizontal Grid Lines */}
                    <div className="relative pt-10 pb-2">
                      <div className="flex items-end gap-3 sm:gap-5">
                        {/* Y-Axis Scale */}
                        <div className="hidden sm:flex flex-col justify-between h-44 text-[11px] font-bold text-[#94a3b8] pr-2 pb-1 select-none tabular">
                          <span>160</span>
                          <span>120</span>
                          <span>80</span>
                          <span>40</span>
                          <span>0</span>
                        </div>

                        {/* Plot Area */}
                        <div className="relative flex-1 h-44 flex items-end justify-around border-b border-[#e2e8f0] px-2">
                          {/* Background Horizontal Grid Lines */}
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            <div className="border-b border-dashed border-[#f1f5f9] w-full h-0" />
                            <div className="border-b border-dashed border-[#f1f5f9] w-full h-0" />
                            <div className="border-b border-dashed border-[#f1f5f9] w-full h-0" />
                            <div className="border-b border-dashed border-[#f1f5f9] w-full h-0" />
                            <div className="w-full h-0" />
                          </div>

                          {[
                            { label: "Jan · Steel", pxHeight: 108, color: "#f97316", duration: "7d 0h Runway (-14d Delay)", nav: "alerts" },
                            { label: "Feb · Alum", pxHeight: 146, color: "#0d6efd", duration: "18d 6h Stock (PO-4402)", nav: "orders" },
                            { label: "Mar · Split", pxHeight: 128, secondPx: 94, color: "#f97316", secondColor: "#10b981", duration: "5d 0h Manila RFQ Ready", nav: "suppliers" },
                            { label: "Apr · Swap", pxHeight: 118, color: "#0d6efd", duration: "0h Idle · 85% On Track", highlighted: true, nav: "schedule" },
                            { label: "May · Resin", pxHeight: 112, color: "#10b981", duration: "20d 0h Coverage (Optimal)", nav: "orders" },
                            { label: "Jun · Lead", pxHeight: 114, color: "#10b981", duration: "Lead Time: 5d 4h", defaultDarkBadge: true, nav: "suppliers" },
                            { label: "Jul · Port", pxHeight: 78, color: "#f97316", duration: "8d 4h RoRo Transit", nav: "alerts" },
                            { label: "Aug · Mill", pxHeight: 138, secondPx: 88, color: "#f97316", secondColor: "#0d6efd", duration: "14d Primary + 5d Bridge", nav: "orders" },
                            { label: "Sep · Safe", pxHeight: 110, color: "#10b981", duration: "22d 12h Coverage (Secured)", nav: "schedule" }
                          ].map((bar, idx) => (
                            <div
                              key={bar.label}
                              onMouseEnter={() => setHoveredBarIndex(idx)}
                              onMouseLeave={() => setHoveredBarIndex(null)}
                              onClick={() => navigateMain(bar.nav)}
                              className="relative z-10 flex flex-col items-center justify-end h-full cursor-pointer group px-1"
                            >
                              {/* Highlighted Bar Floating White Tooltip (⚡ 85% On Track) */}
                              {bar.highlighted && hoveredBarIndex !== idx && (
                                <div className="absolute -top-10 z-20 bg-white shadow-lg border border-[#e2e8f0] rounded-[12px] px-3 py-1.5 text-xs font-extrabold text-[#1e293b] whitespace-nowrap flex items-center gap-1.5">
                                  <span>⚡</span>
                                  <span>85% On Track</span>
                                </div>
                              )}

                              {/* Default Dark Badge on Jun Bar or Hovered Bar (Lead Time: 5d 4h) */}
                              {(hoveredBarIndex === idx || (bar.defaultDarkBadge && hoveredBarIndex === null)) && (
                                <div className="absolute -top-10 z-30 bg-[#111827] text-white shadow-lg rounded-[12px] px-3 py-1.5 text-xs font-bold whitespace-nowrap pointer-events-none">
                                  {bar.duration}
                                </div>
                              )}

                              {/* Bars with 12px radius & explicit pixel height */}
                              <div className="flex items-end gap-1">
                                <div
                                  className="w-5 sm:w-7 rounded-[10px] chart-bar-transition group-hover:brightness-105"
                                  style={{
                                    height: `${bar.pxHeight}px`,
                                    backgroundColor: bar.color,
                                    boxShadow: bar.highlighted ? "0 8px 20px -4px rgba(13, 110, 253, 0.35)" : "none"
                                  }}
                                />
                                {bar.secondPx && (
                                  <div
                                    className="hidden md:block w-5 sm:w-6 rounded-[10px] chart-bar-transition group-hover:brightness-105"
                                    style={{
                                      height: `${bar.secondPx}px`,
                                      backgroundColor: bar.secondColor
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* X-Axis Labels */}
                      <div className="flex items-center gap-3 sm:gap-5 pt-3">
                        <div className="hidden sm:block w-7 pr-2" />
                        <div className="flex-1 flex items-center justify-around text-center px-2">
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((lbl) => (
                            <div key={lbl} className="text-[11px] font-semibold text-[#64748b]">
                              {lbl}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ROW 3: Production Orders Table Card (Full Width) */}
                  <div className="saas-card p-5 2xl:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-lg font-extrabold text-[#1e293b]">Production Orders</h2>
                        <p className="text-xs font-medium text-[#64748b]">At-risk and scheduled manufacturing runs</p>
                      </div>
                      <button
                        onClick={() => {
                          navigateMain("orders");
                          setOrdersTab("Affected Orders");
                        }}
                        className="px-3 py-1.5 rounded-[10px] bg-[#f8f9fc] hover:bg-blue-50 text-[#1e293b] hover:text-[#0d6efd] border border-[#e2e8f0] text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                      >
                        All Orders ▾
                      </button>
                    </div>

                    <div className="w-full overflow-x-auto no-scrollbar rounded-xl border border-slate-200 shadow-2xs" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                      <table className="w-full text-left text-xs sm:text-sm tabular responsive-table">
                        <thead>
                          <tr>
                            <th>Order</th>
                            <th>Product</th>
                            <th>Material</th>
                            <th>Required Date</th>
                            <th className="text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productionOrders.map((ord) => (
                            <tr
                              key={ord.orderId}
                              onClick={() => navigateMain("schedule")}
                              className="hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                              <td className="whitespace-nowrap">
                                <div className="font-mono font-extrabold text-[#1e293b]">{ord.orderId}</div>
                                <div className="text-[11px] text-[#64748b] font-sans font-medium mt-0.5">LINE-A</div>
                              </td>
                              <td>
                                <div className="font-bold text-[#1e293b]">{ord.product}</div>
                                <div className="text-[11px] text-[#64748b] mt-0.5">{ord.orderId === "PO-102" || ord.orderId === "PO-103" ? "EV Component" : "Standard Stamping"}</div>
                              </td>
                              <td>
                                <div className="font-semibold text-slate-800">{ord.material}</div>
                                <div className="text-[11px] font-mono text-[#64748b] mt-0.5">Qty: {ord.requiredQty}</div>
                              </td>
                              <td className="whitespace-nowrap">
                                <div className="font-mono font-semibold text-[#1e293b]">{ord.currentDate}</div>
                                <div className="text-[11px] text-[#64748b] mt-0.5">Scheduled Date</div>
                              </td>
                              <td className="text-right whitespace-nowrap">
                                <div className="flex flex-col items-end gap-1">
                                  <span role="status" aria-label={`Order Status: ${ord.status}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-3 py-1.5 rounded-full ${
                                    ord.status === "AT RISK"
                                      ? "bg-[#fff7ed] text-[#f97316]"
                                      : "bg-emerald-50 text-[#10b981]"
                                  }`}>
                                    {ord.status}
                                  </span>
                                  <span className="text-[10px] text-[#64748b] font-medium">
                                    {ord.status === "AT RISK" ? "Requires shift swap" : "On schedule"}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ROW 4: Quick Recovery Actions (Full Width) */}
                  <div className="saas-card p-5 2xl:p-6 flex flex-col justify-between gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-extrabold text-[#1e293b]">Quick Recovery Actions</h2>
                        <p className="text-xs font-medium text-[#64748b]">Jump directly to RFQ negotiation, inventory buffers, or schedule adjustments</p>
                      </div>
                      <span className="text-xs font-extrabold text-[#0d6efd]">{completedRecCount}/4 Completed</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <button
                        onClick={() => {
                          navigateMain("suppliers");
                          setSuppliersTab("RFQ Drafts");
                        }}
                        className="p-3 rounded-[14px] bg-[#f8f9fc] hover:bg-blue-50 border border-[#f3f4f6] hover:border-blue-200 text-left transition-all"
                      >
                        <div className="text-xs font-extrabold text-[#1e293b]">Generate RFQs</div>
                        <div className="text-[10px] font-medium text-[#64748b] mt-0.5">Unlock stock & price</div>
                      </button>
                      <button
                        onClick={() => {
                          navigateMain("orders");
                          setOrdersTab("Inventory");
                        }}
                        className="p-3 rounded-[14px] bg-[#f8f9fc] hover:bg-blue-50 border border-[#f3f4f6] hover:border-blue-200 text-left transition-all"
                      >
                        <div className="text-xs font-extrabold text-[#1e293b]">Check Inventory</div>
                        <div className="text-[10px] font-medium text-[#64748b] mt-0.5">7d Steel buffer</div>
                      </button>
                      <button
                        onClick={() => openAlertDetails(alerts[0], "AI Recommendations")}
                        className="p-3 rounded-[14px] bg-[#f8f9fc] hover:bg-blue-50 border border-[#f3f4f6] hover:border-blue-200 text-left transition-all"
                      >
                        <div className="text-xs font-extrabold text-[#1e293b]">AI Action Plan</div>
                        <div className="text-[10px] font-medium text-[#64748b] mt-0.5">Review 4 steps</div>
                      </button>
                      <button
                        onClick={() => {
                          navigateMain("schedule");
                          setScheduleTab("AI Recommended Schedule");
                        }}
                        className="p-3 rounded-[14px] bg-[#f8f9fc] hover:bg-blue-50 border border-[#f3f4f6] hover:border-blue-200 text-left transition-all"
                      >
                        <div className="text-xs font-extrabold text-[#1e293b]">Edit Schedule</div>
                        <div className="text-[10px] font-medium text-[#64748b] mt-0.5">Per-card dates</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* =====================================================================
                  2. ALERTS PAGE
                 ===================================================================== */}
              {activeNav === "alerts" && (
                <div className="space-y-6 animate-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-bold text-slate-900">Supply Chain Alerts</h2>
                      <p className="text-xs sm:text-sm text-slate-500">
                        All AI-detected supplier delays, shortages, cancellations, and port notifications
                      </p>
                    </div>

                    <div className="flex flex-nowrap items-center gap-1 sm:gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shrink-0 select-none overflow-x-auto no-scrollbar">
                      {["All", "Delays", "Shortages", "Information"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setAlertFilterTab(tab)}
                          className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                            alertFilterTab === tab
                              ? "bg-brand-600 text-white"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {filteredAlerts.map((alert) => {
                      const sevStyle =
                        alert.severity === "HIGH"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : alert.severity === "MEDIUM"
                          ? "bg-amber-100 text-amber-800 border-amber-200"
                          : "bg-emerald-100 text-emerald-700 border-emerald-200";
                      return (
                        <div key={alert.id} className="saas-card saas-card-hover p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-0.5 rounded-full border ${sevStyle}`}>
                                  Severity: {alert.severity}
                                </span>
                                <span className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                  {alert.alertType}
                                </span>
                                <span className="text-xs text-slate-400 font-mono">
                                  Detected: {alert.detectedAt}
                                </span>
                              </div>

                              <h3 className="text-lg font-bold text-slate-900">{alert.title}</h3>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1 text-xs">
                                <div>
                                  <span className="text-slate-400 block">Supplier</span>
                                  <span className="font-semibold text-slate-800">{alert.supplier}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block">Material</span>
                                  <span className="font-semibold text-slate-800">{alert.material}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block">Detected from</span>
                                  <span className="font-semibold text-slate-800">{alert.source}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block">Affected Orders</span>
                                  <span className="font-semibold text-slate-800">
                                    {alert.affectedOrderIds?.length > 0 ? alert.affectedOrderIds.join(", ") : "None"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 shrink-0">
                              <button
                                onClick={() => openAlertDetails(alert)}
                                className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-colors whitespace-nowrap shrink-0"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* =====================================================================
                  3. ORDERS PAGE (Tabs: Purchase Orders | Inventory | Affected Orders)
                 ===================================================================== */}
              {activeNav === "orders" && (
                <div className="space-y-6 animate-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-bold text-slate-900">Orders & Inventory Management</h2>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Monitor active Purchase Orders, real-time Warehouse Inventory levels, and Affected Production Orders
                      </p>
                    </div>

                    <div className="flex flex-nowrap items-center gap-1 sm:gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shrink-0 select-none overflow-x-auto no-scrollbar">
                      {["Purchase Orders", "Inventory", "Affected Orders"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setOrdersTab(tab)}
                          className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                            ordersTab === tab
                              ? "bg-brand-600 text-white"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* TAB 1: PURCHASE ORDERS */}
                  {ordersTab === "Purchase Orders" && (
                    <div className="saas-card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-slate-900">Purchase Orders</h3>
                        <span className="text-xs text-slate-500">Click any order row to inspect full PO details</span>
                      </div>
                      <div className="w-full overflow-x-auto no-scrollbar rounded-xl border border-slate-200 shadow-2xs" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        <table className="w-full text-left text-xs sm:text-sm tabular responsive-table">
                          <thead>
                            <tr>
                              <th>PO Number</th>
                              <th>Supplier</th>
                              <th>Material</th>
                              <th>Quantity</th>
                              <th>Expected Delivery</th>
                              <th>Status</th>
                              <th>Risk Level</th>
                              <th className="text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredPurchaseOrders.map((po) => {
                              const statusBadge =
                                po.status === "Delayed"
                                  ? "bg-red-100 text-red-700"
                                  : po.status === "At Risk"
                                  ? "bg-amber-100 text-amber-800"
                                  : po.status === "Completed"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-emerald-100 text-emerald-700";
                              return (
                                <tr
                                  key={po.poNumber}
                                  onClick={() => setSelectedPoDetail(po)}
                                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                                >
                                  <td className="whitespace-nowrap">
                                    <div className="font-mono font-bold text-brand-700">{po.poNumber}</div>
                                    <div className="text-[11px] text-slate-500 font-sans mt-0.5">PO Ref #{po.poNumber.replace("PO-", "INV-")}</div>
                                  </td>
                                  <td>
                                    <div className="font-semibold text-slate-900">{po.supplier}</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">Primary Supplier</div>
                                  </td>
                                  <td>
                                    <div className="font-medium text-slate-900">{po.material}</div>
                                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">Industrial Spec</div>
                                  </td>
                                  <td className="whitespace-nowrap">
                                    <div className="font-mono font-bold text-slate-800">{po.quantity}</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">Total Batch</div>
                                  </td>
                                  <td className="whitespace-nowrap">
                                    <div className="font-mono font-semibold text-slate-800">{po.expectedDelivery}</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">Receiving Bay</div>
                                  </td>
                                  <td className="whitespace-nowrap">
                                    <div className="flex flex-col items-start gap-1">
                                      <span role="status" aria-label={`PO Status: ${po.status}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-1 rounded-full ${statusBadge}`}>
                                        {po.status}
                                      </span>
                                      <span className="text-[10px] text-slate-500 font-medium">
                                        {po.status === "Delayed" ? "+14d ETA slip" : po.status === "At Risk" ? "Buffer breach" : "On schedule"}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap">
                                    <div className="flex flex-col items-start gap-1">
                                      <span role="status" aria-label={`Risk Level: ${po.riskLevel}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-0.5 rounded-md ${
                                        po.riskLevel === "HIGH" ? "bg-red-50 text-red-700 border border-red-200" :
                                        po.riskLevel === "MEDIUM" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                      }`}>
                                        {po.riskLevel}
                                      </span>
                                      <span className="text-[10px] text-slate-500">
                                        {po.riskLevel === "HIGH" ? "Critical Path" : po.riskLevel === "MEDIUM" ? "Monitored" : "Nominal"}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-right whitespace-nowrap">
                                    <div className="flex flex-col items-end gap-1">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedPoDetail(po);
                                        }}
                                        className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-brand-600 font-semibold text-xs whitespace-nowrap transition-colors"
                                      >
                                        View Details
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: INVENTORY */}
                  {ordersTab === "Inventory" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 tabular">
                        {inventory.map((item) => {
                          const isCrit = item.status === "CRITICAL";
                          const pct = Math.min(100, Math.round((item.daysRemaining / (item.minRequiredDays * 1.5)) * 100));
                          return (
                            <div key={item.material} className="saas-card p-5 space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-base font-bold text-slate-900">{item.material}</h3>
                                  <p className="text-xs text-slate-500">
                                    Daily Usage: {item.dailyUsage} · Minimum Required: {item.minRequiredDays} days
                                  </p>
                                </div>
                                <span className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-1 rounded-full ${
                                  isCrit ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                                }`}>
                                  {item.status}
                                </span>
                              </div>

                              <div className="flex items-baseline justify-between text-xs pt-1">
                                <span>Current Stock: <strong className="text-slate-900">{item.currentStock}</strong></span>
                                <span className={isCrit ? "text-red-600 font-bold" : "text-emerald-700 font-bold"}>
                                  {item.daysRemaining} days remaining
                                </span>
                              </div>

                              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${isCrit ? "bg-red-600" : "bg-emerald-500"}`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="saas-card p-6">
                        <h3 className="text-base font-bold text-slate-900 mb-4">Raw Material Inventory Table</h3>
                        <div className="w-full overflow-x-auto no-scrollbar rounded-xl border border-slate-200 shadow-2xs" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                          <table className="w-full text-left text-xs sm:text-sm tabular responsive-table">
                            <thead>
                              <tr>
                                <th>Material</th>
                                <th>Current Stock</th>
                                <th>Daily Usage</th>
                                <th>Days Remaining</th>
                                <th>Minimum Required</th>
                                <th className="text-right">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {inventory.map((item) => (
                                <tr key={item.material} className="hover:bg-slate-50 transition-colors">
                                  <td>
                                    <div className="font-bold text-slate-900">{item.material}</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">Warehouse Silo A</div>
                                  </td>
                                  <td className="whitespace-nowrap">
                                    <div className="font-mono font-bold text-slate-900">{item.currentStock}</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">Verified on-hand</div>
                                  </td>
                                  <td className="whitespace-nowrap">
                                    <div className="font-mono font-medium text-slate-700">{item.dailyUsage}</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">2-shift burn rate</div>
                                  </td>
                                  <td className="whitespace-nowrap">
                                    <div className="font-mono font-bold text-slate-900">{item.daysRemaining} days remaining</div>
                                    <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                                      {item.status === "CRITICAL" ? "Stockout in 6 days" : "Buffer adequate"}
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap">
                                    <div className="font-medium text-slate-800">Minimum {item.minRequiredDays} days</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">Safety stock threshold</div>
                                  </td>
                                  <td className="text-right whitespace-nowrap">
                                    <div className="flex flex-col items-end gap-1">
                                      <span role="status" aria-label={`Inventory Status: ${item.status}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-1 rounded-full ${
                                        item.status === "CRITICAL"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-emerald-100 text-emerald-700"
                                      }`}>
                                        {item.status}
                                      </span>
                                      <span className="text-[10px] text-slate-500">
                                        {item.status === "CRITICAL" ? "Replenish immediately" : "Normal inventory"}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: AFFECTED ORDERS */}
                  {ordersTab === "Affected Orders" && (
                    <div className="saas-card p-6">
                      <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-3 mb-4">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-slate-900">Affected Production Orders</h3>
                          <p className="text-xs text-slate-500">
                            Production orders impacted by active raw material delays or shortages
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigateMain("schedule");
                            setScheduleTab("AI Recommended Schedule");
                          }}
                          className="bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
                        >
                          Review Schedule Recommendations →
                        </button>
                      </div>

                      <div className="w-full overflow-x-auto no-scrollbar rounded-xl border border-slate-200 shadow-2xs" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        <table className="w-full text-left text-xs sm:text-sm tabular responsive-table">
                          <thead>
                            <tr>
                              <th>Order</th>
                              <th>Product</th>
                              <th>Material</th>
                              <th>Required Quantity</th>
                              <th>Scheduled Date</th>
                              <th>Risk</th>
                              <th className="text-right">Related Alert</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productionOrders.filter(o => o.orderId === "PO-102" || o.orderId === "PO-103" || o.status === "AT RISK").map((ord) => (
                              <tr key={ord.orderId} className="hover:bg-slate-50 transition-colors">
                                <td className="whitespace-nowrap">
                                  <div className="font-mono font-bold text-slate-900">{ord.orderId}</div>
                                  <div className="text-[11px] text-slate-500 font-sans mt-0.5">LINE-A</div>
                                </td>
                                <td>
                                  <div className="font-semibold text-slate-900">{ord.product}</div>
                                  <div className="text-[11px] text-slate-500 mt-0.5">{ord.orderId === "PO-102" ? "Apex EV Motors" : "Boreal Commercial"}</div>
                                </td>
                                <td>
                                  <div className="font-semibold text-slate-800">{ord.material}</div>
                                  <div className="text-[11px] text-slate-500 mt-0.5">Impacted raw input</div>
                                </td>
                                <td className="whitespace-nowrap">
                                  <div className="font-mono font-bold text-slate-900">{ord.requiredQty}</div>
                                  <div className="text-[11px] text-slate-500 mt-0.5">Batch requirement</div>
                                </td>
                                <td className="whitespace-nowrap">
                                  <div className="font-mono font-semibold text-slate-900">{ord.currentDate}</div>
                                  <div className="text-[11px] text-slate-500 mt-0.5">Planned run</div>
                                </td>
                                <td className="whitespace-nowrap">
                                  <div className="flex flex-col items-start gap-1">
                                    <span role="status" aria-label={`Impacted Order Status: ${ord.status}`} className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                                      {ord.status}
                                    </span>
                                    <span className="text-[10px] text-red-600 font-medium">Material starved at D+6</span>
                                  </div>
                                </td>
                                <td className="text-right whitespace-nowrap">
                                  <div className="flex flex-col items-end gap-1">
                                    <button
                                      onClick={() => openAlertDetails(alerts[0])}
                                      className="text-xs text-brand-600 hover:underline font-bold whitespace-nowrap"
                                    >
                                      {ord.relatedAlert}
                                    </button>
                                    <span className="text-[10px] text-slate-500">Click to investigate</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =====================================================================
                  4. SUPPLIERS PAGE (Tabs: Suppliers | Compare | RFQ Drafts)
                  Price, Stock Quantity, and Price-Based Ranking remain HIDDEN ("Pending RFQ")
                  until the RFQ email is sent!
                 ===================================================================== */}
              {activeNav === "suppliers" && (
                <div className="space-y-6 animate-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-bold text-slate-900">Suppliers & Automated RFQ Center</h2>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Step 1: Send RFQ emails to ask for stock & pricing → Step 2: Reveal quotes & AI ranking → Step 3: Award PO
                      </p>
                    </div>

                    <div className="flex flex-nowrap items-center gap-2 sm:gap-2.5 shrink-0">
                      {suppliersTab === "Suppliers" && (
                        <button
                          type="button"
                          onClick={() => setShowAddSupplierModal(true)}
                          className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-[12px] bg-[#0d6efd] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#0d6efd]/20 transition-all duration-300 whitespace-nowrap shrink-0"
                        >
                          <Icon name="plus" className="w-4 h-4" />
                          <span>Add Supplier</span>
                        </button>
                      )}

                      <div className="flex flex-nowrap items-center gap-1 sm:gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shrink-0 select-none overflow-x-auto no-scrollbar">
                        {["Suppliers", "Compare", "RFQ Drafts"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setSuppliersTab(tab)}
                            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                              suppliersTab === tab
                                ? "bg-brand-600 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>



                  {/* Once RFQs are Sent: Prominent Supplier Quote Replies (Step 1 Required is COMPLETELY REMOVED) */}
                  {anyQuoteReceived && (
                    <div className="saas-card p-5 2xl:p-6 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/60 border border-emerald-200 space-y-4 animate-in">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-emerald-100 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                            <Icon name="check" className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                              <span>Incoming Supplier Quote Replies (3/3 Received)</span>
                              <span className="badge-pill whitespace-nowrap inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white">
                                Stock & Pricing Unlocked
                              </span>
                            </h3>
                            <p className="text-xs text-slate-600">
                              Official commercial desk responses received for Laguna & Cebu Stamping. Confirmed stock, binding unit prices, and transit times:
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="badge-pill whitespace-nowrap inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#111827] text-white shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                            AMD MI300X Sourcing Engine
                          </span>
                        </div>
                      </div>

                      {/* 3 Supplier Reply Cards Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* MetroSteel Industries */}
                        <div className="p-4 rounded-2xl bg-white border-2 border-emerald-500 shadow-sm space-y-3 relative flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-extrabold text-slate-900 text-sm">MetroSteel Industries</span>
                              <span className="badge-pill whitespace-nowrap text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                BEST OPTION
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">Manila, Philippines · Direct Trucking</p>
                            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 italic">
                              “We confirm 5,000 kg of ASTM A1008 2.0mm Steel Coil is in stock in Manila ready for immediate slitting at ₱68/kg (DDP Laguna Stamping). Dedicated direct trucking ready.”
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">Confirmed Stock</span>
                                <span className="font-bold text-emerald-700">5,000 kg</span>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">Quoted Price</span>
                                <span className="font-bold text-slate-900">₱68/kg</span>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">Guaranteed Delivery</span>
                                <span className="font-bold text-blue-700">5 days (Oct 26)</span>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">Total Quote</span>
                                <span className="font-bold text-slate-900">₱340,000</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              setApprovalModal({
                                type: "SUPPLIER",
                                targetId: "SUP-METRO",
                                stepBadge: "Step 2 of 2 · Award Emergency Purchase Order",
                                title: "Award PO to MetroSteel Industries",
                                summary: "Issue emergency purchase order for 5,000 kg of ASTM A1008 Steel Coil at confirmed price of ₱68/kg (₱340,000 total).",
                                delivery: "5 days (Guaranteed arrival Oct 26)",
                                reason: "Fastest confirmed delivery window directly prevents line starvation on PO-102 & PO-103."
                              })
                            }
                            className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                          >
                            Award Emergency PO to MetroSteel →
                          </button>
                        </div>

                        {/* IronWorks Supply */}
                        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 relative flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-extrabold text-slate-900 text-sm">IronWorks Supply</span>
                              <span className="badge-pill whitespace-nowrap text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                Option B · Regional Mill
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">Cebu, Philippines · Inter-Island RoRo</p>
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 italic">
                              “We confirm 8,000 kg available in our Cebu depot at ₱64/kg; earliest RoRo vessel arrival to Luzon is 8 calendar days.”
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">Confirmed Stock</span>
                                <span className="font-bold text-emerald-700">8,000 kg</span>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">Quoted Price</span>
                                <span className="font-bold text-slate-900">₱64/kg</span>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">Transit Lead Time</span>
                                <span className="font-bold text-slate-800">8 days (Oct 29)</span>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">Total Quote</span>
                                <span className="font-bold text-slate-900">₱512,000</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              setApprovalModal({
                                type: "SUPPLIER",
                                targetId: "SUP-IRON",
                                stepBadge: "Step 2 of 2 · Award Emergency Purchase Order",
                                title: "Award PO to IronWorks Supply",
                                summary: "Issue emergency purchase order for 8,000 kg of ASTM A1008 Steel Coil at ₱64/kg.",
                                delivery: "8 days (RoRo arrival Oct 29)",
                                reason: "Higher inventory reserve but requires 2-day aluminum shift swap."
                              })
                            }
                            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors"
                          >
                            Award PO to IronWorks →
                          </button>
                        </div>

                        {/* FastMetals Corp */}
                        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 relative flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-extrabold text-slate-900 text-sm">FastMetals Corp</span>
                              <span className="badge-pill whitespace-nowrap text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                Option C · Cost Optimized
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">Davao, Philippines · Coastal Freight</p>
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 italic">
                              “We hold 10,000 kg in Davao at ₱61/kg; container sea freight lead time to Laguna dock is 11 calendar days.”
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">Confirmed Stock</span>
                                <span className="font-bold text-emerald-700">10,000 kg</span>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">Quoted Price</span>
                                <span className="font-bold text-slate-900">₱61/kg</span>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">Transit Lead Time</span>
                                <span className="font-bold text-slate-800">11 days (Nov 1)</span>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-sans text-slate-500 block uppercase">5,000 kg Total</span>
                                <span className="font-bold text-slate-900">₱305,000</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              setApprovalModal({
                                type: "SUPPLIER",
                                targetId: "SUP-FAST",
                                stepBadge: "Step 2 of 2 · Award Emergency Purchase Order",
                                title: "Award PO to FastMetals Corp",
                                summary: "Issue emergency purchase order for 5,000 kg of ASTM A1008 Steel Coil at ₱61/kg.",
                                delivery: "11 days (Arrival Nov 1)",
                                reason: "Lowest unit price, but transit time exceeds stockout threshold."
                              })
                            }
                            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors"
                          >
                            Award PO to FastMetals →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 1: SUPPLIERS DIRECTORY */}
                  {suppliersTab === "Suppliers" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {suppliers.map((sup) => (
                        <div key={sup.id} className="saas-card saas-card-hover p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span role="status" aria-label={`Supplier Status: ${sup.status}`} className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                                {sup.status}
                              </span>
                              {sup.quoteReceived ? (
                                sup.recommendedAfterQuote ? (
                                  <span role="status" aria-label="AI Recommendation: BEST OPTION" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-700">
                                    BEST OPTION
                                  </span>
                                ) : (
                                  <span role="status" aria-label="Quote Status: Quote Received" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                    Quote Received
                                  </span>
                                )
                              ) : (
                                <span role="status" aria-label="RFQ Status: Awaiting RFQ" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 gap-1">
                                  <Icon name="lock" className="w-3 h-3" />
                                  <span>Awaiting RFQ</span>
                                </span>
                              )}
                            </div>

                            <h3 className="text-lg font-bold text-slate-900">{sup.name}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">{sup.location}</p>

                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 text-xs tabular">
                              <div className="flex justify-between">
                                <span className="text-slate-500">Material:</span>
                                <span className="font-semibold text-slate-900">{sup.material}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Historical Lead Time:</span>
                                <span className="font-semibold text-slate-900">{sup.leadTime}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-500">Backup Pre-Approval:</span>
                                <span className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Pre-Approved Backup Supplier
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-500">Available Stock:</span>
                                {sup.quoteReceived ? (
                                  <span className="font-mono font-bold text-emerald-700">{sup.confirmedAvailableQty} (Confirmed)</span>
                                ) : (
                                  <span role="status" aria-label="Available Stock: Pending RFQ Stock Check" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                                    Pending RFQ Stock Check
                                  </span>
                                )}
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-500">Unit Price:</span>
                                {sup.quoteReceived ? (
                                  <span className="font-mono font-bold text-slate-900">{sup.quotedPricePerKg}</span>
                                ) : (
                                  <span role="status" aria-label="Unit Price: Hidden until RFQ Sent" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                                    Hidden until RFQ Sent
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                            <button
                              onClick={() => setSelectedSupplierDetail(sup)}
                              className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 whitespace-nowrap shrink-0"
                            >
                              View Supplier
                            </button>
                            {sup.quoteReceived ? (
                              <button
                                onClick={() =>
                                  setApprovalModal({
                                    type: "SUPPLIER",
                                    targetId: sup.id,
                                    recKey: "REC_RFQ_METRO",
                                    stepBadge: "Step 2 · Award Purchase Order (Quote Confirmed)",
                                    title: `${sup.name} (${sup.confirmedAvailableQty} @ ${sup.quotedPricePerKg})`,
                                    summary: `Award Purchase Order for ${sup.confirmedAvailableQty} Steel Coil to ${sup.name} at their confirmed quote of ${sup.quotedPricePerKg}.`,
                                    delivery: `${sup.leadTimeDays} days (${sup.leadTime})`,
                                    reason: "Stock availability and unit price have been verified via supplier RFQ response."
                                  })
                                }
                                className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                              >
                                Award Order
                              </button>
                            ) : (
                              <button
                                onClick={() => setSuppliersTab("RFQ Drafts")}
                                className="flex-1 py-2 px-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                              >
                                Send RFQ First
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 2: SUPPLIER COMPARISON (Price & Ranking locked until RFQ is sent!) */}
                  {suppliersTab === "Compare" && (
                    <div className="space-y-5">
                      {anyQuoteReceived ? (
                        <div className="saas-card p-5 bg-brand-50/70 border-brand-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="text-xs font-bold uppercase tracking-wider text-brand-700">
                              AI Post-Quote Recommendation (Based on Confirmed Stock & Price)
                            </div>
                            <p className="text-sm font-semibold text-slate-900">
                              “Now that supplier quotes have arrived, MetroSteel Industries is ranked #1 (BEST OPTION) because they confirmed 5,000 kg in stock in Manila at ₱68/kg with the fastest 5-day delivery.”
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setApprovalModal({
                                type: "SUPPLIER",
                                targetId: "SUP-METRO",
                                recKey: "REC_RFQ_METRO",
                                stepBadge: "Step 2 · Award Emergency Purchase Order",
                                title: "MetroSteel Industries (5,000 kg @ ₱68/kg)",
                                summary: "Purchase 5,000 kg Steel Coil from MetroSteel Industries based on their confirmed stock & ₱68/kg quote.",
                                delivery: "5 days (3–7 days window)",
                                reason: "Shortest lead time and confirmed 5,000 kg stock on hand."
                              })
                            }
                            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold shrink-0 whitespace-nowrap"
                          >
                            Approve & Award MetroSteel
                          </button>
                        </div>
                      ) : null}

                      <div className="saas-card p-6">
                        <h3 className="text-base font-bold text-slate-900 mb-4">Backup Supplier Comparison Table</h3>
                        <div className="w-full overflow-x-auto no-scrollbar rounded-xl border border-slate-200 shadow-2xs" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                          <table className="w-full text-left text-xs sm:text-sm tabular responsive-table">
                            <thead>
                              <tr>
                                <th>Supplier</th>
                                <th>Quoted Price</th>
                                <th>Available Quantity</th>
                                <th>Lead Time</th>
                                <th>Reliability</th>
                                <th>AI Ranking</th>
                                <th className="text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {suppliers.map((sup) => (
                                <tr
                                  key={sup.id}
                                  className={sup.quoteReceived && sup.recommendedAfterQuote ? "bg-emerald-50/40 hover:bg-emerald-50/60 transition-colors" : "hover:bg-slate-50 transition-colors"}
                                >
                                  <td>
                                    <div className="font-bold text-slate-900">{sup.name}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{sup.location}</div>
                                  </td>
                                  <td className="whitespace-nowrap">
                                    {sup.quoteReceived ? (
                                      <div>
                                        <div className="font-bold text-slate-900 font-mono">{sup.quotedPricePerKg}</div>
                                        <div className="text-[11px] text-slate-500 mt-0.5">{sup.quotedTotal}</div>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-start gap-1">
                                        <span role="status" aria-label="Price locked" className="badge-pill whitespace-nowrap inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-semibold font-sans">
                                          <Icon name="lock" className="w-3.5 h-3.5" />
                                          <span>Price Locked</span>
                                        </span>
                                        <span className="text-[11px] text-slate-500">Send RFQ to reveal</span>
                                      </div>
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap">
                                    {sup.quoteReceived ? (
                                      <div>
                                        <div className="font-bold text-emerald-700 font-mono">{sup.confirmedAvailableQty}</div>
                                        <div className="text-[11px] text-emerald-600 mt-0.5">Confirmed Available</div>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-start gap-1">
                                        <span role="status" aria-label="Stock locked" className="badge-pill whitespace-nowrap inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-semibold font-sans">
                                          <Icon name="lock" className="w-3.5 h-3.5" />
                                          <span>Stock Unknown</span>
                                        </span>
                                        <span className="text-[11px] text-slate-500">Pending Stock Check</span>
                                      </div>
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap">
                                    <div className="font-semibold text-slate-800">{sup.leadTime}</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">Delivery window</div>
                                  </td>
                                  <td className="whitespace-nowrap">
                                    <div className="font-mono font-bold text-emerald-700">{sup.reliability}%</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">Historical fulfillment</div>
                                  </td>
                                  <td className="whitespace-nowrap">
                                    <div className="flex flex-col items-start gap-1">
                                      <span role="status" aria-label={`Ranking: ${sup.quoteReceived ? (sup.recommendedAfterQuote ? "BEST OPTION" : sup.postQuoteBadge) : "Awaiting Quote"}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-1 rounded-full ${
                                        sup.quoteReceived
                                          ? sup.recommendedAfterQuote
                                            ? "bg-emerald-100 text-emerald-800"
                                            : "bg-slate-100 text-slate-600"
                                          : "text-amber-700 bg-amber-50 border border-amber-200"
                                      }`}>
                                        {sup.quoteReceived
                                          ? (sup.recommendedAfterQuote ? "BEST OPTION" : sup.postQuoteBadge)
                                          : "Awaiting Quote"}
                                      </span>
                                      <span className="text-[10px] text-slate-500">
                                        {sup.quoteReceived
                                          ? (sup.recommendedAfterQuote ? "Ranked #1" : "Secondary option")
                                          : "Requires vendor quote"}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-right whitespace-nowrap">
                                    <div className="flex flex-col items-end gap-1">
                                      {sup.quoteReceived ? (
                                        <button
                                          onClick={() =>
                                            setApprovalModal({
                                              type: "SUPPLIER",
                                              targetId: sup.id,
                                              recKey: "REC_RFQ_METRO",
                                              stepBadge: "Step 2 · Award Emergency PO",
                                              title: `${sup.name} (${sup.confirmedAvailableQty} @ ${sup.quotedPricePerKg})`,
                                              summary: `Purchase ${sup.confirmedAvailableQty} Steel Coil from ${sup.name} at their confirmed quote of ${sup.quotedPricePerKg}.`,
                                              delivery: sup.leadTime,
                                              reason: "Quote and stock availability verified."
                                            })
                                          }
                                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold whitespace-nowrap shadow-xs transition-colors"
                                        >
                                          Award Emergency PO
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => setSuppliersTab("RFQ Drafts")}
                                          className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold whitespace-nowrap shadow-xs transition-colors"
                                        >
                                          Send RFQ First
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: RFQ DRAFTS */}
                  {suppliersTab === "RFQ Drafts" && (
                    <div className="space-y-5">
                      {!anyQuoteReceived ? (
                        <div className="saas-card p-4 bg-amber-50/70 border-amber-200 flex flex-col xl:flex-row xl:items-center justify-between gap-3 text-xs text-amber-900">
                          <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-2.5 min-w-0 flex-1">
                            <span role="status" aria-label="Workflow Step: Step 1 Required" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none px-2.5 py-1 rounded-md font-bold bg-amber-600 text-white">
                              Step 1 Required
                            </span>
                            <span className="min-w-0">
                              <strong>Send Formal RFQs to Reveal Stock & Pricing:</strong> Click <strong>Send Email</strong> on any supplier below (or <strong>Send All 3 RFQs</strong>) to transmit the inquiry. Once sent, the supplier replies with their confirmed warehouse stock and unit price, unlocking the AI ranking on the <strong>Compare</strong> tab!
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setApprovalModal({
                                type: "RFQ",
                                subAction: "SEND",
                                targetId: "ALL_BACKUPS",
                                recKey: "REC_RFQ_BACKUPS",
                                stepBadge: "Step 1 of 2 · Send All 3 Stock & Price RFQs",
                                title: "All 3 Backup Suppliers (MetroSteel, IronWorks, FastMetals)",
                                summary: "Dispatch formal RFQ emails to all 3 pre-approved backup suppliers to request their current stock availability and unit pricing.",
                                delivery: "3–14 days (Historical window)",
                                reason: "Suppliers must reply with their stock quantity and price before the AI can rank the best option."
                              })
                            }
                            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-semibold shrink-0 whitespace-nowrap"
                          >
                            Send All 3 RFQs
                          </button>
                        </div>
                      ) : (
                        <div className="saas-card p-4 bg-emerald-50/70 border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950 animate-in">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none px-2.5 py-1 rounded-md font-bold bg-emerald-700 text-white">
                              ✓ RFQs Dispatched & Quotations Received
                            </span>
                            <span className="truncate">
                              All 3 backup suppliers have replied with official quotes. Review confirmed stock & revealed pricing below or on the Compare tab.
                            </span>
                          </div>
                          <button
                            onClick={() => setSuppliersTab("Compare")}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs whitespace-nowrap shrink-0 transition-colors"
                          >
                            View Best Option Ranking →
                          </button>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-5">
                        {rfqs.map((rfq) => {
                          const isEditing = editingRfqId === rfq.id;
                          const statusColor =
                            rfq.status.includes("Quote Received") || rfq.status === "Order Placed"
                              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                              : rfq.status.includes("Sent") || rfq.status.includes("Approved")
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : rfq.status === "Ready for Approval"
                              ? "bg-amber-100 text-amber-800 border-amber-200"
                              : "bg-slate-100 text-slate-700 border-slate-200";

                          return (
                            <div key={rfq.id} className="saas-card p-6 space-y-4">
                              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-base font-bold text-slate-900">
                                      To: {rfq.supplierName}
                                    </h3>
                                    <span role="status" aria-label={`RFQ Status: ${rfq.status}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                                      {rfq.status}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500 mt-0.5">
                                    {rfq.recipientEmail} · {rfq.location} · Historical Lead Time: {rfq.leadTime} · Price: <strong>{rfq.supplierReply ? rfq.supplierReply.quotedPrice : "Hidden until RFQ sent"}</strong>
                                  </p>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setEditingRfqId(isEditing ? null : rfq.id)}
                                    className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 whitespace-nowrap shrink-0"
                                  >
                                    <Icon name="edit" className="w-3.5 h-3.5" />
                                    <span>{isEditing ? "Done Editing" : "Edit"}</span>
                                  </button>

                                  <button
                                    onClick={() =>
                                      setApprovalModal({
                                        type: "RFQ",
                                        subAction: "APPROVE",
                                        targetId: rfq.id,
                                        stepBadge: "Approve RFQ Draft",
                                        title: `${rfq.supplierName} (${rfq.requestedQty} RFQ)`,
                                        summary: `Approve quotation request (RFQ) draft for ${rfq.supplierName}.`,
                                        delivery: rfq.leadTime,
                                        reason: "Approves the email text so it is ready to be sent."
                                      })
                                    }
                                    className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                                  >
                                    Approve
                                  </button>

                                  <button
                                    onClick={() =>
                                      setApprovalModal({
                                        type: "RFQ",
                                        subAction: "SEND",
                                        targetId: rfq.id,
                                        stepBadge: "Step 1 · Send RFQ to Reveal Stock & Price",
                                        title: `${rfq.supplierName} (${rfq.requestedQty} RFQ)`,
                                        summary: `Send this RFQ email to ${rfq.supplierName} to ask if ${rfq.requestedQty} is in stock and reveal their unit price.`,
                                        delivery: rfq.leadTime,
                                        reason: "Price and stock availability are only revealed after the supplier responds to this RFQ."
                                      })
                                    }
                                    className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0"
                                  >
                                    <Icon name="send" className="w-3.5 h-3.5" />
                                    <span>Send Email</span>
                                  </button>
                                </div>
                              </div>

                              {isEditing ? (
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Subject</label>
                                    <input
                                      type="text"
                                      value={rfq.subject}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setRfqs(prev => prev.map(item => item.id === rfq.id ? { ...item, subject: val } : item));
                                      }}
                                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Message</label>
                                    <textarea
                                      rows={10}
                                      value={rfq.message}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setRfqs(prev => prev.map(item => item.id === rfq.id ? { ...item, message: val } : item));
                                      }}
                                      className="w-full p-3 text-xs sm:text-sm border border-slate-300 rounded-lg font-sans leading-relaxed"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                                  <div className="text-xs font-bold text-slate-800">
                                    Subject: <span className="font-semibold">{rfq.subject}</span>
                                  </div>
                                  <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                    {rfq.message}
                                  </pre>
                                </div>
                              )}

                              {/* Supplier Stock & Price Quote Reply Box (Appears ONLY once RFQ is sent!) */}
                              {rfq.supplierReply && (
                                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in">
                                  <div className="space-y-1 text-xs">
                                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                                      <Icon name="check" className="w-4 h-4 text-emerald-600" />
                                      <span>Supplier Quote & Stock Confirmation Received from {rfq.supplierName}</span>
                                    </div>
                                    <p className="text-emerald-800">“{rfq.supplierReply.note}”</p>
                                    <div className="flex flex-wrap gap-4 pt-1 font-mono text-[11px] text-emerald-900">
                                      <span><strong>Confirmed Stock:</strong> {rfq.supplierReply.stockConfirmed}</span>
                                      <span><strong>Revealed Price:</strong> {rfq.supplierReply.quotedPrice}</span>
                                      <span><strong>Delivery:</strong> {rfq.supplierReply.promisedDelivery}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      onClick={() => setSuppliersTab("Compare")}
                                      className="px-3.5 py-2 rounded-lg border border-emerald-300 bg-white text-emerald-800 text-xs font-semibold hover:bg-emerald-100 whitespace-nowrap shrink-0"
                                    >
                                      Compare Ranking
                                    </button>
                                    <button
                                      onClick={() =>
                                        setApprovalModal({
                                          type: "SUPPLIER",
                                          targetId: rfq.supplierId,
                                          recKey: "REC_RFQ_METRO",
                                          stepBadge: "Step 2 · Award Purchase Order (Quote Confirmed)",
                                          title: `${rfq.supplierName} (${rfq.supplierReply.quotedPrice})`,
                                          summary: `Place emergency Purchase Order with ${rfq.supplierName}: ${rfq.supplierReply.stockConfirmed} at ${rfq.supplierReply.quotedPrice}.`,
                                          delivery: rfq.supplierReply.promisedDelivery,
                                          reason: "Stock availability and unit price have now been confirmed by the supplier."
                                        })
                                      }
                                      className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                                    >
                                      Step 2: Award PO →
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =====================================================================
                  5. SCHEDULE PAGE (Tabs: Current Schedule | AI Recommended Schedule | Approval History)
                  Every schedule card has its own individual "Edit" button!
                 ===================================================================== */}
              {activeNav === "schedule" && (
                <div className="space-y-6 animate-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-bold text-slate-900">Production Schedule & AI Optimization</h2>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Compare current factory dates with AI-recommended rescheduling, or edit any order card individually
                      </p>
                    </div>

                    <div className="flex flex-nowrap items-center gap-1 sm:gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shrink-0 select-none overflow-x-auto no-scrollbar">
                      {["Current Schedule", "AI Recommended Schedule", "Approval History"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setScheduleTab(tab)}
                          className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                            scheduleTab === tab
                              ? "bg-brand-600 text-white"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* TAB 1: CURRENT SCHEDULE */}
                  {scheduleTab === "Current Schedule" && (
                    <div className="saas-card p-6">
                      <h3 className="text-base font-bold text-slate-900 mb-4">Current Production Schedule</h3>
                      <div className="w-full overflow-x-auto no-scrollbar rounded-xl border border-slate-200 shadow-2xs" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        <table className="w-full text-left text-xs sm:text-sm tabular responsive-table">
                          <thead>
                            <tr>
                              <th>Production Order</th>
                              <th>Product</th>
                              <th>Current Date</th>
                              <th>Material</th>
                              <th>Material Status</th>
                              <th className="text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productionOrders.map((ord) => (
                              <tr key={ord.orderId} className="hover:bg-slate-50 transition-colors">
                                <td className="whitespace-nowrap">
                                  <div className="font-mono font-bold text-slate-900">{ord.orderId}</div>
                                  <div className="text-[11px] text-slate-500 font-sans mt-0.5">Assembly LINE-A</div>
                                </td>
                                <td>
                                  <div className="font-semibold text-slate-800">{ord.product}</div>
                                  <div className="text-[11px] text-slate-500 mt-0.5">{ord.orderId === "PO-102" || ord.orderId === "PO-103" ? "EV Chassis Line" : "Standard Line"}</div>
                                </td>
                                <td className="whitespace-nowrap">
                                  <div className="font-mono font-semibold text-slate-900">{ord.currentDate}</div>
                                  <div className="text-[11px] text-slate-500 mt-0.5">Shift 1 & 2</div>
                                </td>
                                <td>
                                  <div className="font-semibold text-slate-900">{ord.material}</div>
                                  <div className="text-xs text-slate-500 font-mono mt-0.5">Required: {ord.requiredQty}</div>
                                </td>
                                <td className="whitespace-nowrap">
                                  <div className="flex flex-col items-start gap-1">
                                    <span role="status" aria-label={`Material Status: ${ord.materialStatus}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-1 rounded-full ${
                                      ord.materialStatus.includes("SHORTAGE")
                                        ? "bg-red-100 text-red-700"
                                        : "bg-emerald-100 text-emerald-700"
                                    }`}>
                                      {ord.materialStatus}
                                    </span>
                                    <span className="text-[10px] text-slate-500">
                                      {ord.materialStatus.includes("SHORTAGE") ? "Stockout risk D+6" : "Available in warehouse"}
                                    </span>
                                  </div>
                                </td>
                                <td className="text-right whitespace-nowrap">
                                  <div className="flex flex-col items-end gap-1">
                                    <button
                                      onClick={() => {
                                        setScheduleTab("AI Recommended Schedule");
                                        startEditingSingleCard(ord);
                                      }}
                                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-brand-600 font-semibold text-xs whitespace-nowrap inline-flex items-center gap-1.5 transition-colors"
                                    >
                                      <Icon name="edit" className="w-3.5 h-3.5" />
                                      <span>Edit Schedule</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: AI RECOMMENDED SCHEDULE */}
                  {scheduleTab === "AI Recommended Schedule" && (
                    <div className="space-y-6">
                      <div className="saas-card p-6 bg-brand-50/60 border-brand-200 space-y-4">
                        <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-2.5">
                          <span role="status" aria-label="AI Schedule Recommendation" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-600 text-white">
                            AI Schedule Recommendation
                          </span>
                          <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 whitespace-nowrap shrink-0">
                            {scheduleApproved === "APPROVED" && (
                              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                <Icon name="check" className="w-3 h-3" />
                              </span>
                            )}
                            <span>Status:</span>
                            <span role="status" aria-label={`Schedule Approval Status: ${scheduleApproved}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              scheduleApproved === "APPROVED" ? "bg-emerald-100 text-emerald-800" :
                              scheduleApproved === "MODIFIED" ? "bg-brand-100 text-brand-800" :
                              "bg-amber-100 text-amber-800"
                            }`}>
                              {scheduleApproved}
                            </span>
                          </span>
                        </div>

                        <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                          “Because the steel coil shipment is delayed, the AI recommends prioritizing products that already have available materials and postponing steel-dependent production orders.”
                        </p>

                        <div className="flex flex-wrap items-center gap-2.5 pt-1">
                          <button
                            onClick={() =>
                              setApprovalModal({
                                type: "SCHEDULE",
                                targetId: "SCHED-01",
                                recKey: "REC_SCHEDULE",
                                stepBadge: "Approve Production Schedule",
                                title: `Reschedule PO-102 (${productionOrders[1]?.suggestedDate}) & PO-103 (${productionOrders[2]?.suggestedDate})`,
                                summary: `Confirm schedule dates: PO-101 on ${productionOrders[0]?.suggestedDate}, PO-102 on ${productionOrders[1]?.suggestedDate}, and PO-103 on ${productionOrders[2]?.suggestedDate}.`,
                                delivery: "Aligns with backup steel delivery window",
                                reason: "Prioritizes products with available materials and eliminates idle factory shifts."
                              })
                            }
                            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-sm whitespace-nowrap shrink-0"
                          >
                            Approve Schedule
                          </button>

                          <button
                            onClick={() =>
                              setApprovalModal({
                                type: "SCHEDULE",
                                targetId: "SCHED-01",
                                stepBadge: "Reject Schedule Recommendation",
                                title: "AI Production Schedule Recommendation",
                                summary: "Confirm rejection of proposed schedule shift on PO-102 and PO-103.",
                                delivery: "N/A",
                                reason: "Manager opted to keep original dates."
                              })
                            }
                            className="px-4 py-2.5 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-red-600 text-xs font-semibold whitespace-nowrap shrink-0"
                          >
                            Reject Recommendation
                          </button>

                          <button
                            onClick={() => setShowModifyScheduleModal(true)}
                            className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold whitespace-nowrap shrink-0"
                          >
                            Modify All Dates
                          </button>

                          <button
                            onClick={() => setShowScheduleExplanation(!showScheduleExplanation)}
                            className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold whitespace-nowrap shrink-0"
                          >
                            {showScheduleExplanation ? "Hide Explanation" : "View Explanation"}
                          </button>
                        </div>

                        {showScheduleExplanation && (
                          <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1.5 animate-in">
                            <div className="font-bold text-slate-900">Why the AI recommends this schedule:</div>
                            <p>• <strong>PO-101 (Product B)</strong> uses Aluminum (15,000 kg in stock = 18 days remaining), so it runs on <strong>Oct 25</strong> with zero delay.</p>
                            <p>• <strong>PO-102 (Car Chassis)</strong> requires 5,000 kg of Steel Coil on Oct 28, right when the 7-day steel buffer runs low. Shifting PO-102 to <strong>Nov 4 (+7 days)</strong> allows backup delivery (3–7 days lead time) to arrive and be inspected before line setup.</p>
                            <p>• <strong>PO-103 (Engine Part)</strong> shifts from Nov 2 to <strong>Nov 9 (+7 days)</strong>, preventing any mid-run line stoppage.</p>
                          </div>
                        )}
                      </div>

                      {/* INDIVIDUAL SCHEDULE CARDS — EVERY CARD HAS ITS OWN EDIT BUTTON! */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 tabular">
                        {productionOrders.map((ord) => {
                          const hasShift = ord.changeLabel !== "NO CHANGE";
                          const isEditingThisCard = editingScheduleOrderId === ord.orderId;

                          return (
                            <div
                              key={ord.orderId}
                              className={`saas-card p-5 flex flex-col justify-between space-y-4 ${
                                isEditingThisCard ? "ring-2 ring-brand-600 border-brand-600" : ""
                              }`}
                            >
                              <div className="space-y-2.5">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-mono font-bold text-base text-slate-900">{ord.orderId}</span>
                                  <div className="flex items-center gap-1.5">
                                    {ord.modifiedByUser && (
                                      <span role="status" aria-label="Order Status: User Edited" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                                        Edited
                                      </span>
                                    )}
                                    <span role="status" aria-label={`Schedule Shift: ${ord.changeLabel}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                      hasShift
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-emerald-100 text-emerald-700"
                                    }`}>
                                      {ord.changeLabel}
                                    </span>
                                  </div>
                                </div>

                                <div>
                                  <div className="text-sm font-bold text-slate-800">{ord.product}</div>
                                  <div className="text-xs text-slate-500 mt-0.5">
                                    Material: {ord.material} ({ord.requiredQty})
                                  </div>
                                </div>

                                {/* Individual Inline Editor vs Standard Display */}
                                {isEditingThisCard ? (
                                  <div className="p-3 rounded-xl bg-slate-50 border border-brand-200 space-y-2.5 text-xs animate-in">
                                    <div>
                                      <label className="block font-semibold text-slate-700 mb-1">
                                        New Suggested Date for {ord.orderId}
                                      </label>
                                      <input
                                        type="text"
                                        value={singleCardEditForm.suggestedDate}
                                        onChange={(e) =>
                                          setSingleCardEditForm(prev => ({ ...prev, suggestedDate: e.target.value }))
                                        }
                                        placeholder="e.g., Nov 2"
                                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs focus:outline-none focus:border-brand-600"
                                      />
                                    </div>
                                    <div>
                                      <label className="block font-semibold text-slate-700 mb-1">
                                        Schedule Change Tag
                                      </label>
                                      <input
                                        type="text"
                                        value={singleCardEditForm.changeLabel}
                                        onChange={(e) =>
                                          setSingleCardEditForm(prev => ({ ...prev, changeLabel: e.target.value }))
                                        }
                                        placeholder="e.g., +5 DAYS or NO CHANGE"
                                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs focus:outline-none focus:border-brand-600"
                                      />
                                    </div>
                                    <div className="flex items-center justify-end gap-2 pt-1">
                                      <button
                                        type="button"
                                        onClick={() => setEditingScheduleOrderId(null)}
                                        className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 font-semibold whitespace-nowrap shrink-0"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => saveSingleCardSchedule(ord.orderId)}
                                        className="px-3 py-1 rounded bg-brand-600 text-white font-semibold whitespace-nowrap shrink-0"
                                      >
                                        Save {ord.orderId}
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                                    <div className="p-2.5 rounded-lg bg-slate-50">
                                      <div className="text-slate-400">Current Date</div>
                                      <div className="font-mono font-bold text-slate-800 mt-0.5">{ord.currentDate}</div>
                                    </div>
                                    <div className={`p-2.5 rounded-lg ${hasShift ? "bg-brand-50 border border-brand-200" : "bg-emerald-50"}`}>
                                      <div className="text-slate-500">Suggested</div>
                                      <div className="font-mono font-bold text-brand-700 mt-0.5">{ord.suggestedDate}</div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Individual Card Footer with Dedicated Edit Button */}
                              {!isEditingThisCard && (
                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                  <span className="text-[11px] text-slate-400">
                                    {ord.modifiedByUser ? "Custom manager date" : "AI suggested slot"}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => startEditingSingleCard(ord)}
                                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-brand-600 hover:bg-brand-50 text-xs font-semibold text-slate-700 hover:text-brand-700 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                                  >
                                    <Icon name="edit" className="w-3.5 h-3.5" />
                                    <span>Edit {ord.orderId}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: APPROVAL HISTORY */}
                  {scheduleTab === "Approval History" && (
                    <div className="saas-card p-6">
                      <h3 className="text-base font-bold text-slate-900 mb-4">Human-in-the-Loop Approval History</h3>
                      <div className="space-y-3">
                        {approvalHistory.map((item) => (
                          <div key={item.id} className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div>
                              <div className="font-bold text-slate-900">{item.summary}</div>
                              <div className="text-slate-500 mt-0.5">
                                {item.actionType} · By {item.actor} · {item.timestamp}
                              </div>
                            </div>
                            <span role="status" aria-label={`Approval Status: ${item.status}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none self-start sm:self-center font-bold px-2.5 py-1 rounded-full ${
                              item.status === "APPROVED" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </main>
          </div>

          {/* =========================================================================
              COLUMN 3: RIGHT SIDEBAR (Profile, Mini-Calendar, Upcoming & AI Todo List)
              Width: lg:w-64 xl:w-72 2xl:w-80 | Fixed Height 100vh | 4 Distinct Cards
             ========================================================================= */}
          <aside
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="hidden lg:flex lg:flex-col lg:w-64 xl:w-72 2xl:w-80 shrink-0 bg-[#f8f9fc] border-l border-[#f3f4f6] h-screen overflow-y-auto no-scrollbar p-4 2xl:p-6 space-y-5 select-none"
          >
            {/* 1. User Profile Card (Matches Top-Right of Mockup) */}
            <div className="saas-card p-4 2xl:p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#0d6efd] via-[#3b82f6] to-[#0d6efd] shrink-0 shadow-xs">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#1e293b] font-extrabold text-sm">
                      PM
                    </div>
                    <span
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#10b981] border-2 border-white"
                      title="Autonomous Agent Active"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold text-[#1e293b] truncate">
                      Procurement Manager
                    </h3>
                    <p className="text-xs font-medium text-[#64748b] truncate mt-0.5">
                      {selectedPlant}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(true)}
                  aria-label="Profile & System Settings"
                  className="p-1.5 rounded-lg text-[#64748b] hover:text-[#1e293b] hover:bg-[#f8f9fc] transition-colors"
                >
                  <Icon name="more-vertical" className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 divide-x divide-[#f3f4f6] pt-3 border-t border-[#f3f4f6] text-center tabular">
                <div className="px-2">
                  <div className="text-base font-extrabold text-[#1e293b]">{alerts.length}</div>
                  <div className="text-[11px] font-medium text-[#64748b] mt-0.5">Alerts</div>
                </div>
                <div className="px-2">
                  <div className="text-base font-extrabold text-[#1e293b]">85%</div>
                  <div className="text-[11px] font-medium text-[#64748b] mt-0.5">Resilience</div>
                </div>
                <div className="px-2">
                  <div className="text-base font-extrabold text-[#1e293b]">₱820K</div>
                  <div className="text-[11px] font-medium text-[#64748b] mt-0.5">Saved</div>
                </div>
              </div>
            </div>

            {/* 2. Mini-Calendar Card (Click to Open Calendar Pop-up, Set Date & Schedule Supplier) */}
            <div className="saas-card p-4 2xl:p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-[#1e293b]">Plant Schedule</h4>
                <button
                  type="button"
                  onClick={() => handleOpenCalendarPopup(selectedCalendarDay)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0d6efd] text-[11px] font-extrabold transition-colors whitespace-nowrap shrink-0"
                  title="Open full calendar to set date & assign supplier"
                >
                  <Icon name="calendar" className="w-3.5 h-3.5" />
                  <span>{selectedCalendarDay}, 2026</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 pt-1">
                {visibleCalendarDays.map((d) => {
                  const isActive = selectedCalendarDay === d.key;
                  const hasEvent = calendarEvents.some((ev) => ev.dateKey === d.key);
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => handleOpenCalendarPopup(d.key)}
                      className={`py-3 px-1 rounded-[16px] flex flex-col items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-[#0d6efd] text-white -translate-y-1 shadow-lg shadow-blue-500/30 font-extrabold"
                          : "bg-white border border-[#f3f4f6] text-[#1e293b] hover:border-blue-200 font-bold shadow-2xs"
                      }`}
                    >
                      <span className={`text-[10px] font-semibold ${isActive ? "text-blue-100" : "text-[#64748b]"}`}>
                        {d.dayName}
                      </span>
                      <span className="text-sm font-extrabold mt-1">{d.dateNum}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1 ${
                          isActive
                            ? "bg-white"
                            : hasEvent
                            ? "bg-[#0d6efd]"
                            : "bg-transparent"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Quick Actions inside Calendar Card: Open Calendar Pop-up + Add Supplier */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenCalendarPopup(selectedCalendarDay)}
                  className="py-2 px-2.5 rounded-[12px] bg-[#f8f9fc] hover:bg-blue-50 text-[#1e293b] hover:text-[#0d6efd] border border-[#e2e8f0] hover:border-blue-200 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap shrink-0"
                >
                  <Icon name="calendar" className="w-3.5 h-3.5 text-[#0d6efd]" />
                  <span>Set Date</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddSupplierModal(true)}
                  className="py-2 px-2.5 rounded-[12px] bg-[#f8f9fc] hover:bg-blue-50 text-[#1e293b] hover:text-[#0d6efd] border border-[#e2e8f0] hover:border-blue-200 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap shrink-0"
                >
                  <Icon name="plus" className="w-3.5 h-3.5 text-[#0d6efd]" />
                  <span>Add Supplier</span>
                </button>
              </div>
            </div>

            {/* 3. Upcoming Deliveries & Shifts Card (Dynamic Calendar Events + Supplier Deliveries) */}
            <div className="saas-card p-4 2xl:p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-[#1e293b]">Upcoming Deliveries & Shifts</h4>
                <button
                  type="button"
                  onClick={() => handleOpenCalendarPopup(selectedCalendarDay)}
                  className="text-[11px] font-bold text-[#0d6efd] hover:underline whitespace-nowrap shrink-0"
                >
                  + Schedule
                </button>
              </div>
              <div className="space-y-3">
                {calendarEvents.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedCalendarDay(item.dateKey || "Oct 21");
                      navigateMain(item.nav || "schedule");
                    }}
                    className="p-2.5 rounded-[16px] hover:bg-[#f8f9fc] transition-all duration-300 cursor-pointer flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#f8f9fc] border border-[#e2e8f0] flex items-center justify-center text-[#334155] shrink-0 mt-0.5">
                      <Icon name={item.icon || "truck"} className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-medium text-[#64748b] truncate">{item.category}</div>
                      <div className="text-xs font-extrabold text-[#1e293b] truncate mt-0.5">{item.title}</div>
                      <div className="text-[11px] font-medium text-[#94a3b8] truncate mt-0.5">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* =========================================================================
              ALERT DETAILS / AI ANALYSIS LARGE DRAWER
             ========================================================================= */}
          {selectedAlert && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
              <div className="bg-white w-full max-w-4xl h-full overflow-y-auto no-scrollbar p-6 sm:p-8 space-y-6 shadow-2xl animate-in">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span role="status" aria-label={`Alert Severity: ${selectedAlert.severity}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        selectedAlert.severity === "HIGH" ? "bg-red-100 text-red-700" :
                        selectedAlert.severity === "MEDIUM" ? "bg-amber-100 text-amber-800" :
                        "bg-emerald-100 text-emerald-700"
                      }`}>
                        Severity: {selectedAlert.severity}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        Detected: {selectedAlert.detectedAt}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {selectedAlert.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Supplier: <strong>{selectedAlert.supplier}</strong> · Material: <strong>{selectedAlert.material}</strong> · Source: {selectedAlert.source}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAlertId(null)}
                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 shrink-0"
                    aria-label="Close modal"
                  >
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                {/* AI Analysis Card */}
                <div className="p-5 rounded-xl bg-brand-50/80 border border-brand-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-700 flex items-center gap-1.5">
                      <Icon name="cpu" className="w-4 h-4" />
                      <span>AI Impact Analysis</span>
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 leading-relaxed">
                    “{selectedAlert.aiAnalysisText}”
                  </p>
                </div>

                {/* 4 Alert Details Tabs */}
                <div className="border-b border-slate-200 flex flex-wrap items-center gap-2 no-scrollbar">
                  {["Summary", "Affected Orders", "Inventory Impact", "AI Recommendations"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setAlertDetailTab(tab)}
                      className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 -mb-px whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
                        alertDetailTab === tab
                          ? "border-brand-600 text-brand-600"
                          : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <span>{tab}</span>
                      {tab === "AI Recommendations" && (
                        <span role="status" aria-label={`Completed Recommendations: ${completedRecCount} of ${(selectedAlert.recommendations || []).length}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          completedRecCount > 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                        }`}>
                          {completedRecCount}/{(selectedAlert.recommendations || []).length} ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* TAB 1: SUMMARY */}
                {alertDetailTab === "Summary" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold uppercase text-slate-500 mb-2">
                        Incoming Supplier Message ({selectedAlert.source})
                      </div>
                      <pre className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                        {selectedAlert.emailMessage}
                      </pre>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 tabular">
                      <div className="p-3.5 rounded-xl border border-slate-200">
                        <div className="text-xs text-slate-500">{selectedAlert.material} Stock</div>
                        <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{selectedAlert.stockDaysRemaining}</div>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-200">
                        <div className="text-xs text-slate-500">Disruption Impact</div>
                        <div className="text-sm sm:text-base font-bold text-red-600 mt-0.5">{selectedAlert.delayLabel}</div>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-200">
                        <div className="text-xs text-slate-500">Inventory Gap</div>
                        <div className="text-sm sm:text-base font-bold text-red-600 mt-0.5">{selectedAlert.inventoryGapLabel}</div>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-200">
                        <div className="text-xs text-slate-500">Required Material</div>
                        <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{selectedAlert.requiredMaterialLabel}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: AFFECTED ORDERS */}
                {alertDetailTab === "Affected Orders" && (
                  <div className="space-y-3">
                    {(selectedAlert.affectedOrdersDetail || []).length === 0 ? (
                      <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50 text-xs sm:text-sm text-emerald-800 font-medium">
                        No production orders are negatively affected by this event.
                      </div>
                    ) : (
                      (selectedAlert.affectedOrdersDetail || []).map((ord) => (
                        <div key={ord.orderId} className="p-4 rounded-xl border border-red-200 bg-red-50/40 flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="font-mono font-bold text-sm text-slate-900 truncate" title={`${ord.orderId} — ${ord.product}`}>
                              {ord.orderId} — {ord.product}
                            </div>
                            <div className="text-xs text-slate-600 mt-0.5 truncate" title={`${ord.materialSpec} · ${ord.requiredDate}`}>
                              {ord.materialSpec} · {ord.requiredDate}
                            </div>
                          </div>
                          <span role="status" aria-label={`Status: ${ord.status}`} className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                            {ord.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* TAB 3: INVENTORY IMPACT */}
                {alertDetailTab === "Inventory Impact" && (
                  <div className="p-5 rounded-xl border border-slate-200 space-y-4 tabular">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                      <div>
                        <span className="text-slate-500 block">Material</span>
                        <strong className="text-slate-900">{selectedAlert.material}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Current Stock</span>
                        <strong className="text-red-600">{selectedAlert.stockDaysRemaining}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Incoming Shipment</span>
                        <strong className="text-red-600">{selectedAlert.delayLabel}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Inventory Gap</span>
                        <strong className="text-red-600">{selectedAlert.inventoryGapLabel}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Required Material</span>
                        <strong className="text-slate-900">{selectedAlert.requiredMaterialLabel}</strong>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-red-600">
                          Inventory Coverage vs. Disruption Window ({selectedAlert.inventoryGapLabel} gap)
                        </span>
                        <span className="font-mono">{selectedAlert.deficitPct || 50}% Deficit</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-600 rounded-full"
                          style={{ width: `${selectedAlert.deficitPct || 50}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: AI RECOMMENDATIONS (With Green Check Icons when Performed!) */}
                {alertDetailTab === "AI Recommendations" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Perform each recommendation below — completed actions show a green check icon:</span>
                      <span className="font-bold text-emerald-700">
                        {completedRecCount} of {(selectedAlert.recommendations || []).length} Completed
                      </span>
                    </div>

                    <ol className="space-y-3 text-xs sm:text-sm text-slate-800">
                      {(selectedAlert.recommendations || []).map((rec, i) => {
                        const isDone = Boolean(completedRecs[rec.key]);
                        return (
                          <li
                            key={i}
                            className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isDone
                                ? "bg-emerald-50/70 border-emerald-300"
                                : "bg-slate-50 border-slate-200"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {isDone ? (
                                <span
                                  title="Completed"
                                  className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
                                >
                                  <Icon name="check" className="w-3.5 h-3.5" />
                                </span>
                              ) : (
                                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                              )}

                              <div>
                                <span className={`font-medium ${isDone ? "text-emerald-950 line-through decoration-emerald-500/60" : "text-slate-900"}`}>
                                  {rec.text}
                                </span>
                                {isDone && (
                                  <div className="text-[11px] font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                                    <span>✓ Action Performed & Logged</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                              {isDone ? (
                                <button
                                  onClick={() => setCompletedRecs(prev => ({ ...prev, [rec.key]: false }))}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0"
                                >
                                  <Icon name="check" className="w-3.5 h-3.5" />
                                  <span>Completed</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => triggerRecommendationAction(rec)}
                                  className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs whitespace-nowrap shrink-0"
                                >
                                  {rec.actionLabel || "Perform Action"}
                                </button>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ol>

                    {/* 3 Required Navigation Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setSelectedAlertId(null);
                          navigateMain("suppliers");
                          setSuppliersTab("RFQ Drafts");
                        }}
                        className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        {completedRecs.REC_RFQ_METRO && <Icon name="check" className="w-3.5 h-3.5" />}
                        <span>Generate RFQs (Ask Stock & Price)</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedAlertId(null);
                          navigateMain("suppliers");
                          setSuppliersTab("Compare");
                        }}
                        className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        {completedRecs.REC_RFQ_BACKUPS && <Icon name="check" className="w-3.5 h-3.5 text-emerald-600" />}
                        <span>View Backup Suppliers</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedAlertId(null);
                          navigateMain("schedule");
                          setScheduleTab("AI Recommended Schedule");
                        }}
                        className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        {completedRecs.REC_SCHEDULE && <Icon name="check" className="w-3.5 h-3.5 text-emerald-600" />}
                        <span>Review Schedule Changes</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              SIMULATE DISRUPTION MODAL
             ========================================================================= */}
          {showSimulateModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 animate-in max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Simulate Supply Chain Disruption</h3>
                    <p className="text-xs text-slate-500">
                      Choose any of the 4 events below — each generates its own unique B2B email, inventory math, and alert
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSimulateModal(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 shrink-0"
                    aria-label="Close modal"
                  >
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                {/* Scenario Picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SIMULATE_SCENARIO_OPTIONS.map((sc) => {
                    const active = selectedSimScenarioId === sc.id;
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => {
                          setSelectedSimScenarioId(sc.id);
                          setSimStageIndex(-1);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          active
                            ? "border-brand-600 bg-brand-50/50 ring-1 ring-brand-600"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 min-w-0 truncate" title={sc.title}>{sc.title}</span>
                          <span role="status" aria-label={`Scenario Severity: ${sc.badge}`} className={`badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[10px] font-bold px-2 py-0.5 rounded-full border ${sc.badgeColor}`}>
                            {sc.badge}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-700 mb-1">
                          {sc.supplier} · {sc.material}
                        </div>
                        <p className="text-xs text-slate-500 leading-snug">{sc.summary}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Incoming Supplier Email Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-slate-700">
                      Incoming Message ({chosenSimScenario.supplier} — {chosenSimScenario.material})
                    </span>
                    <span className="font-mono">Severity: {chosenSimScenario.severity}</span>
                  </div>
                  <pre className="text-xs text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                    {chosenSimScenario.emailPreview}
                  </pre>
                </div>

                {/* Live Animated AI Processing Stages */}
                {simStageIndex >= 0 && (
                  <div className="p-4 rounded-xl bg-navy-900 text-slate-100 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold uppercase tracking-wider text-emerald-400">
                        AI Agent Processing Pipeline ({chosenSimScenario.title})
                      </span>
                      <span className="font-mono text-slate-400">
                        {Math.min(simStageIndex + 1, currentSimStages.length)} / {currentSimStages.length}
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs font-mono">
                      {currentSimStages.map((st, idx) => {
                        const done = idx < simStageIndex || simStageIndex === currentSimStages.length;
                        if (idx > simStageIndex) return null;
                        return (
                          <div
                            key={st.label}
                            className={`px-3 py-1.5 rounded flex items-center justify-between ${
                              done ? "bg-slate-800 text-emerald-300" : "bg-brand-600/30 text-white font-bold"
                            }`}
                          >
                            <span>{st.label}: <span className="font-normal text-slate-300">{st.detail}</span></span>
                            <span>{done ? "✓" : "..."}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Modal Footer Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setShowSimulateModal(false)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 whitespace-nowrap shrink-0"
                  >
                    Close
                  </button>

                  <div className="flex items-center gap-2">
                    {simStageIndex < 0 ? (
                      <button
                        onClick={startSimulationRun}
                        className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
                      >
                        <Icon name="bolt" className="w-4 h-4" />
                        <span>Simulate “{chosenSimScenario.title}”</span>
                      </button>
                    ) : simStageIndex < currentSimStages.length ? (
                      <button
                        onClick={() => setSimStageIndex(currentSimStages.length)}
                        className="px-4 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                      >
                        Skip Animation →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowSimulateModal(false);
                          openAlertDetails(alerts[0]);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0"
                      >
                        Open “{chosenSimScenario.title}” AI Analysis →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              HUMAN-IN-THE-LOOP APPROVAL MODAL
             ========================================================================= */}
          {approvalModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-brand-50 text-brand-600">
                      <Icon name="shield" className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                        {approvalModal.stepBadge || "Human-in-the-Loop Confirmation"}
                      </div>
                      <h3 className="text-base font-bold text-slate-900">AI Recommendation</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setApprovalModal(null)}
                    className="text-slate-400 hover:text-slate-700 shrink-0"
                    aria-label="Close modal"
                  >
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs sm:text-sm">
                  <div className="font-bold text-slate-900 text-sm">
                    {approvalModal.summary}
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200/70 gap-2">
                    <span className="text-slate-500 shrink-0">Estimated delivery:</span>
                    <strong className="text-slate-900 text-right">{approvalModal.delivery}</strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500 shrink-0">Procurement logic:</span>
                    <strong className="text-slate-900 text-right">{approvalModal.reason}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    onClick={() => handleConfirmApproval("REJECT")}
                    className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleConfirmApproval("EDIT")}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleConfirmApproval("APPROVE")}
                    className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm whitespace-nowrap shrink-0"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              MODIFY ALL SCHEDULE DATES MODAL
             ========================================================================= */}
          {showModifyScheduleModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Modify All Production Schedule Dates</h3>
                  <button onClick={() => setShowModifyScheduleModal(false)} className="text-slate-400 hover:text-slate-700 shrink-0" aria-label="Close modal">
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {["PO-101", "PO-102", "PO-103", "PO-104"].map(id => (
                    <div key={id}>
                      <label className="block font-semibold text-slate-700 mb-1">{id} Suggested Date</label>
                      <input
                        type="text"
                        value={customDates[id] || ""}
                        onChange={(e) => setCustomDates(prev => ({ ...prev, [id]: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowModifyScheduleModal(false)}
                    className="whitespace-nowrap shrink-0 px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setProductionOrders(prev =>
                        prev.map(po =>
                          customDates[po.orderId]
                            ? { ...po, suggestedDate: customDates[po.orderId], modifiedByUser: true }
                            : po
                        )
                      );
                      setScheduleApproved("MODIFIED");
                      markRecComplete("REC_SCHEDULE");
                      setShowModifyScheduleModal(false);
                      showToast("Updated suggested schedule dates.");
                    }}
                    className="whitespace-nowrap shrink-0 px-4 py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold"
                  >
                    Save Modified Schedule
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              REPORTS MODAL
             ========================================================================= */}
          {showReportsModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">SupplyChain AI — Executive Impact Reports</h3>
                    <p className="text-xs text-slate-500">
                      Cumulative exception recovery metrics and cost avoidance summary
                    </p>
                  </div>
                  <button onClick={() => setShowReportsModal(false)} className="text-slate-400 hover:text-slate-700 shrink-0" aria-label="Close modal">
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 tabular">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500">Total disruptions</div>
                    <div className="text-2xl font-bold text-slate-900 mt-1">{reportStats.totalDisruptions}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-xs text-emerald-800">Disruptions resolved</div>
                    <div className="text-2xl font-bold text-emerald-700 mt-1">{reportStats.disruptionsResolved}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-brand-50 border border-brand-200">
                    <div className="text-xs text-brand-800">Production orders saved</div>
                    <div className="text-2xl font-bold text-brand-700 mt-1">{reportStats.productionOrdersSaved}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500">Average response time</div>
                    <div className="text-2xl font-bold text-slate-900 mt-1">{reportStats.avgResponseTime}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="text-xs text-amber-800">Emergency purchase costs</div>
                    <div className="text-2xl font-bold text-amber-700 mt-1">{reportStats.emergencyPurchaseCosts}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500">Potential line stoppages avoided</div>
                    <div className="text-2xl font-bold text-slate-900 mt-1">{reportStats.lineStoppagesAvoided}</div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-emerald-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                      Estimated Net Savings
                    </div>
                    <div className="text-3xl font-bold mt-1 tabular">{reportStats.estimatedSavings}</div>
                    <div className="text-xs text-emerald-200 mt-0.5">
                      Prevented SLA penalties and unscheduled factory downtime across PO-102 and PO-103
                    </div>
                  </div>
                  <button
                    onClick={() => setShowReportsModal(false)}
                    className="px-4 py-2 rounded-lg bg-white text-emerald-950 text-xs font-bold self-start sm:self-center whitespace-nowrap shrink-0"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SETTINGS MODAL
             ========================================================================= */}
          {showSettingsModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 animate-in max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Icon name="settings" className="w-5 h-5 text-brand-600" />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">System & AI Agent Settings</h3>
                      <p className="text-xs text-slate-500">Configure notifications, human-in-the-loop guardrails, and integrations</p>
                    </div>
                  </div>
                  <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-slate-700 shrink-0" aria-label="Close modal">
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Notification Settings</div>
                      <div className="text-xs text-slate-500">Instant alerts for HIGH severity shipment delays and shortages</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsState.emailNotifications}
                      onChange={(e) => setSettingsState(s => ({ ...s, emailNotifications: e.target.checked }))}
                      className="w-4 h-4 accent-brand-600"
                    />
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">AI Approval Settings (Human-in-the-Loop)</div>
                      <div className="text-xs text-slate-500">Require explicit manager approval before sending RFQs or changing schedules</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsState.strictHumanApproval}
                      onChange={(e) => setSettingsState(s => ({ ...s, strictHumanApproval: e.target.checked }))}
                      className="w-4 h-4 accent-brand-600"
                    />
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Supplier Qualification Rules</div>
                      <div className="text-xs text-slate-500">Only rank PRE-APPROVED backup suppliers with ≥ {settingsState.minSupplierReliability}% reliability</div>
                    </div>
                    <span role="status" aria-label="Rule Status: Active (≥85%)" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                      Active (≥85%)
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">AMD Radeon Cloud / Token Factory LLM</div>
                      <div className="text-xs text-slate-600 font-mono">
                        {amdTelemetry.model_id} · {amdTelemetry.endpoint}
                      </div>
                    </div>
                    <span role="status" aria-label={`LLM Telemetry Mode: ${amdTelemetry.mode_active || "AMD_LIVE"}`} className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-600 text-white">
                      {amdTelemetry.mode_active || "AMD_LIVE"}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">ERP Integration Placeholder</div>
                      <div className="text-xs text-slate-500">{settingsState.erpSystem}</div>
                    </div>
                    <span role="status" aria-label="Integration Status: Connected" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-brand-600 border border-blue-100">Connected</span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Email Integration Placeholder</div>
                      <div className="text-xs text-slate-500">{settingsState.emailIntegration}</div>
                    </div>
                    <span role="status" aria-label="Integration Status: Connected" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-brand-600 border border-blue-100">Connected</span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Shipping API Placeholder</div>
                      <div className="text-xs text-slate-500">{settingsState.shippingApi}</div>
                    </div>
                    <span role="status" aria-label="Integration Status: Connected" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-brand-600 border border-blue-100">Connected</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setShowSettingsModal(false);
                      showToast("Settings saved.");
                    }}
                    className="px-5 py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              PURCHASE ORDER DETAIL MODAL
             ========================================================================= */}
          {selectedPoDetail && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-base font-bold text-slate-900">
                    Purchase Order {selectedPoDetail.poNumber}
                  </h3>
                  <button onClick={() => setSelectedPoDetail(null)} className="text-slate-400 hover:text-slate-700 shrink-0" aria-label="Close modal">
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Supplier:</span><strong>{selectedPoDetail.supplier}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Material:</span><strong>{selectedPoDetail.material}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Quantity:</span><strong>{selectedPoDetail.quantity}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Unit Price:</span><strong>{selectedPoDetail.unitPrice}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Total Value:</span><strong>{selectedPoDetail.totalValue}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Expected Delivery:</span><strong>{selectedPoDetail.expectedDelivery}</strong></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">Status:</span><span role="status" aria-label={`PO Status: ${selectedPoDetail.status}`} className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-0.5 rounded-full border border-slate-200 bg-slate-100 text-slate-800">{selectedPoDetail.status}</span></div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 mt-2">
                    {selectedPoDetail.notes}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => setSelectedPoDetail(null)} className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap shrink-0">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SUPPLIER DETAIL MODAL
             ========================================================================= */}
          {selectedSupplierDetail && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-base font-bold text-slate-900">{selectedSupplierDetail.name}</h3>
                  <button onClick={() => setSelectedSupplierDetail(null)} className="text-slate-400 hover:text-slate-700 shrink-0" aria-label="Close modal">
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center"><span className="text-slate-500">Status:</span><span role="status" aria-label={`Supplier Status: ${selectedSupplierDetail.status}`} className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800">{selectedSupplierDetail.status}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Material:</span><strong>{selectedSupplierDetail.material}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Location:</span><strong>{selectedSupplierDetail.location}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Historical Lead Time:</span><strong>{selectedSupplierDetail.leadTime}</strong></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">Backup Pre-Approval:</span><span className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800">Pre-Approved Backup Supplier</span></div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Available Stock:</span>
                    {selectedSupplierDetail.quoteReceived ? (
                      <strong className="font-mono text-emerald-700">{selectedSupplierDetail.confirmedAvailableQty} (Confirmed)</strong>
                    ) : (
                      <span role="status" aria-label="Available Stock: Pending RFQ Stock Check" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-sans">
                        Pending RFQ Stock Check
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Unit Price:</span>
                    {selectedSupplierDetail.quoteReceived ? (
                      <strong className="font-mono text-slate-900">{selectedSupplierDetail.quotedPricePerKg}</strong>
                    ) : (
                      <span role="status" aria-label="Unit Price: Hidden until RFQ Sent" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-sans">
                        Hidden until RFQ Sent
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between"><span className="text-slate-500">Contact Email:</span><span className="font-mono">{selectedSupplierDetail.contactEmail}</span></div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 mt-2">
                    {selectedSupplierDetail.notes}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedSupplierDetail(null);
                      setSuppliersTab("RFQ Drafts");
                    }}
                    className="px-4 py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    Ask Stock & Price (RFQ)
                  </button>
                  <button onClick={() => setSelectedSupplierDetail(null)} className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold whitespace-nowrap shrink-0">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              INTERACTIVE CALENDAR POP-UP & SUPPLIER DELIVERY SCHEDULER MODAL
             ========================================================================= */}
          {showCalendarModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-[24px] max-w-3xl w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#f3f4f6] animate-in max-h-[92vh] overflow-y-auto no-scrollbar">
                <div className="flex items-start justify-between gap-4 border-b border-[#f3f4f6] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-[14px] bg-blue-50 text-[#0d6efd] flex items-center justify-center shrink-0">
                      <Icon name="calendar" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#1e293b]">
                        Plant Schedule Calendar & Supplier Delivery Planner
                      </h3>
                      <p className="text-xs font-medium text-[#64748b]">
                        Select any date on the calendar below to set the active plant date or schedule a supplier delivery
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCalendarModal(false)}
                    className="p-2 rounded-[12px] text-[#64748b] hover:text-[#1e293b] hover:bg-[#f8f9fc] shrink-0"
                    aria-label="Close modal"
                  >
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left (7 cols): Full Interactive Calendar Grid + Month/Year Popover (Matches Screenshot) */}
                  <div className="md:col-span-7 p-4 rounded-[20px] bg-[#f8f9fc] border border-[#f3f4f6] space-y-4 relative">
                    {/* Month / Year Selector Header (Click to open dropdown modal) */}
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setShowMonthPicker(!showMonthPicker)}
                        className="flex items-center gap-1.5 text-sm font-extrabold text-[#1e293b] hover:text-[#0d6efd] transition-colors group cursor-pointer"
                      >
                        <span>{currentMonthDays.monthName} {currentMonthDays.year}</span>
                        <Icon name="chevron-down" className={`w-3.5 h-3.5 text-[#64748b] group-hover:text-[#0d6efd] transition-transform duration-200 ${showMonthPicker ? "rotate-180" : ""}`} />
                      </button>
                    </div>

                    {/* Interactive Month Picker Popover (Matches Screenshot Exact Design) */}
                    {showMonthPicker && (
                      <div className="absolute top-12 left-4 z-40 bg-white rounded-[20px] shadow-2xl border border-slate-200 p-4 w-60 animate-in">
                        {/* Year Navigation Bar: < 2026 > */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-extrabold text-[#1e293b]">
                          <button
                            type="button"
                            onClick={() => setCalendarYear((y) => y - 1)}
                            className="p-1 rounded-lg hover:bg-slate-100 text-[#64748b] hover:text-[#1e293b] transition-colors cursor-pointer"
                            aria-label="Previous Year"
                          >
                            <Icon name="chevron-left" className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-extrabold text-[#1e293b]">{calendarYear}</span>
                          <button
                            type="button"
                            onClick={() => setCalendarYear((y) => y + 1)}
                            className="p-1 rounded-lg hover:bg-slate-100 text-[#64748b] hover:text-[#1e293b] transition-colors cursor-pointer"
                            aria-label="Next Year"
                          >
                            <Icon name="chevron-right" className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Scrollable Month List */}
                        <div className="max-h-56 overflow-y-auto space-y-1 pt-2 pr-1 no-scrollbar" style={{ scrollbarWidth: "thin" }}>
                          {MONTH_NAMES.map((mName, mIdx) => {
                            const isSelected = calendarMonthIndex === mIdx;
                            return (
                              <button
                                key={mName}
                                type="button"
                                onClick={() => {
                                  setCalendarMonthIndex(mIdx);
                                  setShowMonthPicker(false);
                                  const shortM = mName.slice(0, 3);
                                  const matchDay = /\d+/.exec(calendarScheduleForm.dateKey);
                                  const dayNum = matchDay ? matchDay[0] : "20";
                                  const newDateKey = `${shortM} ${dayNum}`;
                                  setSelectedCalendarDay(newDateKey);
                                  setCalendarScheduleForm((prev) => ({
                                    ...prev,
                                    dateKey: newDateKey,
                                    isoDate: `${calendarYear}-${String(mIdx + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`,
                                  }));
                                }}
                                className={`w-full text-left px-3.5 py-2 rounded-[12px] text-xs font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-blue-50 text-[#0d6efd] font-extrabold"
                                    : "text-[#1e293b] hover:bg-slate-50 font-semibold"
                                }`}
                              >
                                {mName}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Weekday Header */}
                    <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-bold text-[#94a3b8]">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
                        <div key={w} className="py-1">{w}</div>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1.5">
                      {Array.from({ length: currentMonthDays.firstDayWeekday }).map((_, emptyIdx) => (
                        <div key={`empty-${emptyIdx}`} className="h-10" />
                      ))}
                      {currentMonthDays.days.map((d) => {
                        const isSelected = calendarScheduleForm.dateKey === d.key;
                        const hasEvent = calendarEvents.some((ev) => ev.dateKey === d.key);
                        return (
                          <button
                            key={d.key}
                            type="button"
                            onClick={() => {
                              setSelectedCalendarDay(d.key);
                              setCalendarScheduleForm((prev) => ({
                                ...prev,
                                dateKey: d.key,
                                isoDate: `${calendarYear}-${String(calendarMonthIndex + 1).padStart(2, "0")}-${d.dateNum}`,
                              }));
                            }}
                            className={`h-10 rounded-[12px] flex flex-col items-center justify-center text-xs transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#0d6efd] text-white font-extrabold shadow-md shadow-blue-500/25 scale-105"
                                : "bg-white hover:bg-blue-50 text-[#1e293b] font-bold border border-[#f3f4f6]"
                            }`}
                          >
                            <span>{d.rawNum}</span>
                            <span
                              className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                                isSelected
                                  ? "bg-white"
                                  : hasEvent
                                  ? "bg-[#0d6efd]"
                                  : "bg-transparent"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Events on Selected Day */}
                    <div className="pt-2 border-t border-[#e2e8f0]/70 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-[#1e293b]">
                          Scheduled on {calendarScheduleForm.dateKey}:
                        </span>
                        <span className="font-bold text-[#0d6efd]">
                          {calendarEvents.filter((ev) => ev.dateKey === calendarScheduleForm.dateKey).length} Event(s)
                        </span>
                      </div>
                      {calendarEvents.filter((ev) => ev.dateKey === calendarScheduleForm.dateKey).length === 0 ? (
                        <div className="text-[11px] font-medium text-[#64748b] bg-white p-3 rounded-[12px] border border-[#f3f4f6] leading-relaxed">
                          No supplier deliveries scheduled on {calendarScheduleForm.dateKey} yet. Use the form on the right to assign a supplier delivery.
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          {calendarEvents
                            .filter((ev) => ev.dateKey === calendarScheduleForm.dateKey)
                            .map((ev) => (
                              <div
                                key={ev.id}
                                className="p-2.5 rounded-[12px] bg-white border border-[#f3f4f6] flex items-center justify-between text-xs"
                              >
                                <div className="min-w-0">
                                  <div className="font-extrabold text-[#1e293b] truncate">{ev.title}</div>
                                  <div className="text-[11px] font-medium text-[#64748b] truncate">{ev.time}</div>
                                </div>
                                <span role="status" aria-label="Delivery Status: Scheduled" className="badge-pill whitespace-nowrap inline-flex items-center justify-center shrink-0 leading-none text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#10b981]">
                                  Scheduled
                                </span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right (5 cols): Set Date & Assign Supplier Form */}
                  <form onSubmit={handleScheduleCalendarEvent} className="md:col-span-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-3.5">
                      <div className="p-4 rounded-[18px] bg-blue-50/70 border border-blue-200/70 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#0d6efd]">
                            SELECTED PLANT DATE
                          </div>
                          <div className="text-xl sm:text-2xl font-extrabold text-[#1e293b] mt-0.5">
                            {calendarScheduleForm.dateKey}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCalendarDay(calendarScheduleForm.dateKey);
                            setShowCalendarModal(false);
                            showToast(`Active plant date set to ${calendarScheduleForm.dateKey}.`);
                          }}
                          className="px-4 py-2 rounded-[12px] bg-white hover:bg-blue-50 text-[#0d6efd] border border-blue-200 text-xs font-extrabold transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
                        >
                          Set Date Only
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-extrabold text-[#1e293b]">
                            Select Supplier for Delivery
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowAddSupplierModal(true)}
                            className="text-[11px] font-extrabold text-[#0d6efd] hover:underline flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Icon name="plus" className="w-3.5 h-3.5" />
                            <span>Add New Supplier</span>
                          </button>
                        </div>
                        <select
                          value={calendarScheduleForm.supplierId}
                          onChange={(e) => {
                            const sup = suppliers.find((s) => s.id === e.target.value);
                            setCalendarScheduleForm((prev) => ({
                              ...prev,
                              supplierId: e.target.value,
                              material: sup ? sup.material : prev.material,
                            }));
                          }}
                          className="w-full px-3.5 py-3 rounded-[14px] bg-[#f8f9fc] border border-[#e2e8f0] text-xs font-bold text-[#1e293b] focus:outline-none focus:border-[#0d6efd]"
                        >
                          {suppliers.map((sup) => (
                            <option key={sup.id} value={sup.id}>
                              {sup.name} ({sup.location})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-extrabold text-[#1e293b] mb-1">
                            Material
                          </label>
                          <input
                            type="text"
                            value={calendarScheduleForm.material}
                            onChange={(e) =>
                              setCalendarScheduleForm((prev) => ({
                                ...prev,
                                material: e.target.value,
                              }))
                            }
                            placeholder="e.g. Steel Coil"
                            className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f8f9fc] border border-[#e2e8f0] text-xs font-bold text-[#1e293b] focus:outline-none focus:border-[#0d6efd]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-extrabold text-[#1e293b] mb-1">
                            Quantity
                          </label>
                          <input
                            type="text"
                            value={calendarScheduleForm.quantity}
                            onChange={(e) =>
                              setCalendarScheduleForm((prev) => ({
                                ...prev,
                                quantity: e.target.value,
                              }))
                            }
                            placeholder="e.g. 5,000 kg"
                            className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f8f9fc] border border-[#e2e8f0] text-xs font-bold text-[#1e293b] focus:outline-none focus:border-[#0d6efd]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-[#1e293b] mb-1">
                          Receiving Dock Time Slot
                        </label>
                        <select
                          value={calendarScheduleForm.timeSlot}
                          onChange={(e) =>
                            setCalendarScheduleForm((prev) => ({
                              ...prev,
                              timeSlot: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-3 rounded-[14px] bg-[#f8f9fc] border border-[#e2e8f0] text-xs font-bold text-[#1e293b] focus:outline-none focus:border-[#0d6efd]"
                        >
                          <option value="08:00 AM (GMT-8) · Morning Dock A">08:00 AM (GMT-8) · Morning Dock A</option>
                          <option value="10:30 AM (GMT-8) · Morning Dock B">10:30 AM (GMT-8) · Morning Dock B</option>
                          <option value="01:30 PM (GMT-8) · Afternoon Shift">01:30 PM (GMT-8) · Afternoon Shift</option>
                          <option value="04:00 PM (GMT-8) · Evening Dock A">04:00 PM (GMT-8) · Evening Dock A</option>
                          <option value="06:30 PM (GMT-8) · Express Night Slot">06:30 PM (GMT-8) · Express Night Slot</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#f3f4f6] flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setShowCalendarModal(false)}
                        className="px-4 py-2.5 rounded-[12px] border border-[#e2e8f0] text-xs font-bold text-[#64748b] hover:text-[#1e293b] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-[12px] bg-[#0d6efd] hover:bg-blue-700 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Set Date & Schedule Supplier
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              ADD NEW SUPPLIER MODAL (Accessible from Calendar & Suppliers Page)
             ========================================================================= */}
          {showAddSupplierModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <form
                onSubmit={handleAddSupplier}
                className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-[#f3f4f6] animate-in"
              >
                <div className="flex items-center justify-between border-b border-[#f3f4f6] pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[12px] bg-blue-50 text-[#0d6efd] flex items-center justify-center shrink-0">
                      <Icon name="suppliers" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#1e293b]">
                        Add Pre-Approved Backup Supplier
                      </h3>
                      <p className="text-xs font-medium text-[#64748b]">
                        Register a supplier to generate RFQs and schedule deliveries on the calendar
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddSupplierModal(false)}
                    className="p-1.5 rounded-lg text-[#64748b] hover:text-[#1e293b] shrink-0"
                    aria-label="Close modal"
                  >
                    <Icon name="x" className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-extrabold text-[#1e293b] mb-1">
                      Supplier Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newSupplierForm.name}
                      onChange={(e) =>
                        setNewSupplierForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="e.g., Luzon Steel & Alloys Corp."
                      className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f8f9fc] border border-[#e2e8f0] font-bold text-[#1e293b] focus:outline-none focus:border-[#0d6efd]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-extrabold text-[#1e293b] mb-1">
                        Material Supplied
                      </label>
                      <input
                        type="text"
                        value={newSupplierForm.material}
                        onChange={(e) =>
                          setNewSupplierForm((prev) => ({ ...prev, material: e.target.value }))
                        }
                        placeholder="e.g., Steel Coil, Aluminum"
                        className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f8f9fc] border border-[#e2e8f0] font-bold text-[#1e293b] focus:outline-none focus:border-[#0d6efd]"
                      />
                    </div>
                    <div>
                      <label className="block font-extrabold text-[#1e293b] mb-1">
                        Warehouse Location
                      </label>
                      <input
                        type="text"
                        value={newSupplierForm.location}
                        onChange={(e) =>
                          setNewSupplierForm((prev) => ({ ...prev, location: e.target.value }))
                        }
                        placeholder="e.g., Batangas, Philippines"
                        className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f8f9fc] border border-[#e2e8f0] font-bold text-[#1e293b] focus:outline-none focus:border-[#0d6efd]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-extrabold text-[#1e293b] mb-1">
                        Estimated Lead Time
                      </label>
                      <input
                        type="text"
                        value={newSupplierForm.leadTime}
                        onChange={(e) =>
                          setNewSupplierForm((prev) => ({ ...prev, leadTime: e.target.value }))
                        }
                        placeholder="e.g., 2–5 days"
                        className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f8f9fc] border border-[#e2e8f0] font-bold text-[#1e293b] focus:outline-none focus:border-[#0d6efd]"
                      />
                    </div>
                    <div>
                      <label className="block font-extrabold text-[#1e293b] mb-1">
                        Pre-Approval Qualification
                      </label>
                      <label className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[12px] bg-[#f8f9fc] border border-[#e2e8f0] cursor-pointer hover:border-[#0d6efd] transition-all">
                        <input
                          type="checkbox"
                          checked={Boolean(newSupplierForm.isBackupApproved)}
                          onChange={(e) =>
                            setNewSupplierForm((prev) => ({
                              ...prev,
                              isBackupApproved: e.target.checked,
                            }))
                          }
                          className="w-4 h-4 text-[#0d6efd] rounded border-slate-300 focus:ring-[#0d6efd] cursor-pointer"
                        />
                        <span className="font-bold text-[#1e293b] text-xs">
                          Pre-Approved Backup Supplier
                        </span>
                      </label>
                      <p className="text-[10px] text-[#64748b] mt-1 font-medium">
                        * Historical reliability is handled automatically by the backend
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block font-extrabold text-[#1e293b] mb-1">
                      Commercial Contact Email (for AI RFQ Dispatch)
                    </label>
                    <input
                      type="email"
                      value={newSupplierForm.contactEmail}
                      onChange={(e) =>
                        setNewSupplierForm((prev) => ({ ...prev, contactEmail: e.target.value }))
                      }
                      placeholder="e.g., sales@luzonsteel.com.ph"
                      className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f8f9fc] border border-[#e2e8f0] font-mono font-semibold text-[#1e293b] focus:outline-none focus:border-[#0d6efd]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#f3f4f6]">
                  <button
                    type="button"
                    onClick={() => setShowAddSupplierModal(false)}
                    className="px-4 py-2.5 rounded-[12px] border border-[#e2e8f0] text-xs font-bold text-[#64748b] hover:text-[#1e293b] whitespace-nowrap shrink-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-[12px] bg-[#0d6efd] hover:bg-blue-700 text-white text-xs font-extrabold shadow-lg shadow-[#0d6efd]/20 transition-all whitespace-nowrap shrink-0"
                  >
                    Save Supplier & Generate RFQ Draft
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      );
    }

export default App;
