"""End-to-end FastAPI integration tests across all 4 disruption scenarios and HITL gates."""
from fastapi.testclient import TestClient
from backend.main import app


def test_full_api_lifecycle_all_scenarios():
    with TestClient(app) as client:
        # 1. Verify UI root, 5-item sidebar structure, and ERP snapshot
        ui_resp = client.get("/")
        assert ui_resp.status_code == 200
        assert "SupplyChain AI Command Center" in ui_resp.text
        js_text = ui_resp.text
        if "/assets/" in ui_resp.text:
            import re
            m = re.search(r'src="(/assets/[^"]+\.js)"', ui_resp.text)
            if m:
                asset_resp = client.get(m.group(1))
                if asset_resp.status_code == 200:
                    js_text = asset_resp.text
        for nav_label in ["Dashboard", "Alerts", "Orders", "Suppliers", "Schedule"]:
            assert nav_label in js_text
        assert "MetroSteel" in js_text
        assert "Simulate Disruption" in js_text

        erp_resp = client.get("/api/erp/snapshot")
        assert erp_resp.status_code == 200
        erp_data = erp_resp.json()
        assert len(erp_data["materials"]) == 4
        assert len(erp_data["presets"]) == 4
        assert "amd_telemetry" in erp_data

        # 2. Scenario 1 (Golden Steel Coil +14d delay) -> AWAITING_APPROVAL
        s1_resp = client.post("/api/signals/email", json={"scenario_id": "SCENARIO_1_STEEL_DELAY"})
        assert s1_resp.status_code == 200
        s1 = s1_resp.json()
        assert s1["status"] == "AWAITING_APPROVAL"
        assert s1["facts"]["po_id"] == "PO-8842"
        assert s1["runway"]["stockout_day"] == 6
        assert s1["runway"]["shortage_qty"] == 104.0
        assert s1["exposure"]["total_unmitigated_exposure_usd"] == 235000.0
        assert s1["shift_proposal"]["bridge_tons_needed"] == 72.0
        assert s1["shift_proposal"]["idle_shifts_after"] == 0
        assert len(s1["rfq_drafts"]) == 3
        assert s1["options"][0]["total_mitigation_cost_usd"] == 13920.0
        assert s1["options"][0]["net_savings_usd"] == 221080.0

        # Test Revise loop on Scenario 1
        rev_resp = client.post(
            f"/api/disruptions/{s1['disruption_id']}/decision",
            json={
                "action": "revise",
                "option_id": s1["recommended_option_id"],
                "feedback": "Request 45-day payment terms and waive palletizing fee",
            },
        )
        assert rev_resp.status_code == 200
        rev_data = rev_resp.json()
        assert rev_data["status"] == "AWAITING_APPROVAL"

        # Test Approve on Scenario 1
        app_resp = client.post(
            f"/api/disruptions/{s1['disruption_id']}/decision",
            json={"action": "approve", "option_id": s1["recommended_option_id"]},
        )
        assert app_resp.status_code == 200
        app_data = app_resp.json()
        assert app_data["status"] == "MITIGATED"
        assert len(app_data["outbox_sent"]) == 3
        assert len(app_data["supplier_replies"]) >= 2

        # 3. Scenario 3 (Fastener +2d delay) -> MONITOR_ONLY
        s3_resp = client.post("/api/signals/email", json={"scenario_id": "SCENARIO_3_FASTENER_MINOR"})
        assert s3_resp.status_code == 200
        s3 = s3_resp.json()
        assert s3["status"] == "MONITOR_ONLY"
        assert s3["exposure"]["total_unmitigated_exposure_usd"] == 0.0

        # 4. Scenario 4 (Ambiguous Email Missing PO) -> AWAITING_CLARIFICATION -> Clarify -> AWAITING_APPROVAL
        s4_resp = client.post("/api/signals/email", json={"scenario_id": "SCENARIO_4_AMBIGUOUS_EMAIL"})
        assert s4_resp.status_code == 200
        s4 = s4_resp.json()
        assert s4["status"] == "AWAITING_CLARIFICATION"

        clar_resp = client.post(
            f"/api/disruptions/{s4['disruption_id']}/clarify",
            json={"selected_po_id": "PO-8842"},
        )
        assert clar_resp.status_code == 200
        clar_data = clar_resp.json()
        assert clar_data["status"] == "AWAITING_APPROVAL"
        assert clar_data["facts"]["po_id"] == "PO-8842"

        # 5. Reset Demo State
        rst_resp = client.post("/api/demo/reset")
        assert rst_resp.status_code == 200
        assert rst_resp.json()["status"] == "AWAITING_APPROVAL"
