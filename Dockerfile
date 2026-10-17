# Multi-stage or slim Python 3.11 image for Supply Chain Command Center
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

WORKDIR /app

# Install system utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
RUN pip install --no-cache-dir \
    fastapi>=0.110.0 \
    "uvicorn[standard]>=0.28.0" \
    pydantic>=2.6.0 \
    requests>=2.31.0 \
    python-dotenv>=1.0.0

# Copy application files
COPY backend /app/backend
COPY frontend /app/frontend

# Expose FastAPI application port
EXPOSE 8000

# Health check endpoint
HEALTHCHECK --interval=15s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/api/erp/snapshot || exit 1

# Run the FastAPI server
CMD ["python", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
