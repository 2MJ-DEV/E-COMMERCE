from fastapi import FastAPI

app = FastAPI(title="MarcheLocal AI")

@app.get("/health")
async def health():
    return {"ok": True}

@app.get("/recommendations")
async def recommendations(user_id: str | None = None):
    # Mock recommendations
    items = [
        {"id": "veg-01", "name": "Carottes", "score": 0.91},
        {"id": "veg-02", "name": "Tomates", "score": 0.88},
        {"id": "meat-01", "name": "Poulet fermier", "score": 0.84},
    ]
    return {"user_id": user_id, "items": items}
