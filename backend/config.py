"""Configuration and environment settings for AMD Developer Hackathon ACT III."""
import os
from dataclasses import dataclass
from pathlib import Path

# Automatically load .env from project root if present
_ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
if _ENV_PATH.exists():
    for _line in _ENV_PATH.read_text(encoding="utf-8").splitlines():
        _s = _line.strip()
        if _s and not _s.startswith("#") and "=" in _s:
            _k, _v = _s.split("=", 1)
            _k = _k.strip()
            _v = _v.strip().strip('"').strip("'")
            if _k and _k not in os.environ:
                os.environ[_k] = _v


@dataclass
class Settings:
    # AMD Infrastructure / Token Factory / vLLM (OpenAI-compatible endpoint)
    AMD_API_BASE_URL: str = os.getenv(
        "AMD_API_BASE_URL", "https://developer.amd.com.cn/radeon/api/v1"
    )
    AMD_API_KEY: str = os.getenv("AMD_API_KEY", "")
    AMD_MODEL_NAME: str = os.getenv("AMD_MODEL_NAME", "Gemma-4-31B-IT")
    AMD_GPU_DEVICE: str = os.getenv(
        "AMD_GPU_DEVICE", "AMD Instinct MI300X (192GB HBM3, ROCm 6.3)"
    )

    # Modes: "auto" (uses live AMD endpoint if AMD_API_KEY is set, else deterministic replay),
    # "live" (force AMD endpoint), "replay" (deterministic golden/heuristic fallback)
    LLM_MODE: str = os.getenv("LLM_MODE", "auto")
    SEND_MODE: str = os.getenv("SEND_MODE", "simulated")

    # Multi-criteria Supplier Scoring Weights
    WEIGHT_LEAD_TIME: float = 0.40
    WEIGHT_RELIABILITY: float = 0.30
    WEIGHT_PRICE: float = 0.20
    WEIGHT_CAPACITY: float = 0.10

    # Factory / Cost Constants
    CHANGEOVER_COST_USD: float = 1500.0
    DATABASE_PATH: str = os.getenv(
        "DATABASE_PATH",
        os.path.join(os.path.dirname(__file__), "database", "erp_sandbox.db"),
    )


settings = Settings()
