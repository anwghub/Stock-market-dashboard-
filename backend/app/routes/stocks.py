from fastapi import APIRouter, HTTPException
from app.services.data_fetcher import fetch_stock_data

router = APIRouter(prefix="/stocks", tags=["Stocks"])

@router.get("/{symbol}")
def get_stock(symbol: str, period: str = "6mo", interval: str = "1d"):
    records = fetch_stock_data(symbol, period, interval)
    if not records:
        raise HTTPException(status_code=404, detail=f"No data for {symbol}")
    
    return {
        "symbol": symbol,
        "data": records  # records is a list of dicts
    }
