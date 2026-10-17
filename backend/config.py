"""Configuration and environment settings for AMD Developer Hackathon ACT III."""
import os
from dataclasses import dataclass


@dataclass
class Settings:
    # AMD Infrastructure / Token Factory / vLLM (OpenAI-compatible endpoint)
    AMD_API_BASE_URL: str = os.getenv(
        "AMD_API_BASE_URL", "https://notebooks.amd.com/tokenfactory/v1"
    )
    AMD_API_KEY: str = os.getenv("AMD_API_KEY", "")
    AMD_MODEL_NAME: str = os.getenv("AMD_MODEL_NAME", "google/gemma-2-27b-it")
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
