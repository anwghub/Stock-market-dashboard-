from fastapi import APIRouter
from app.services.prediction import predict_next_day_price

router = APIRouter()

@router.get("/predict/{symbol}")
def predict(symbol: str):
    return predict_next_day_price(symbol)
