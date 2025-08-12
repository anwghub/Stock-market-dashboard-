from fastapi import APIRouter
from app.services.prediction import predict_next_day_price

router = APIRouter(prefix="/predicts", tags=["Prediction"])

@router.get("/{symbol}")
def predict(symbol: str):
    prediction = predict_next_day_price(symbol)
    return {"symbol": symbol, "prediction": prediction}
