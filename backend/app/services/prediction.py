import numpy as np
import pandas as pd
import yfinance as yf
from datetime import timedelta
from sklearn.ensemble import RandomForestRegressor
from fastapi import HTTPException

def predict_next_day_price(symbol: str):
    df = yf.download(symbol, period="1y", interval="1d", progress=False)
    if df.empty or len(df) < 20:
        raise HTTPException(status_code=404, detail="Not enough data")
    df = df.dropna(subset=['Close'])

    # Create lag features
    for lag in range(1, 6):
        df[f"lag_{lag}"] = df['Close'].shift(lag)
    df = df.dropna()

    if df.shape[0] < 10:
        raise HTTPException(status_code=400, detail="Not enough rows after lagging")

    X = df[[f"lag_{i}" for i in range(1, 6)]].values
    y = df['Close'].values

    model = RandomForestRegressor(n_estimators=100, random_state=0)
    model.fit(X, y)

    closes = df['Close'].values
    x_pred = closes[-5:][::-1]
    pred = float(model.predict([x_pred])[0])

    last_close = float(closes[-1])
    last_date = pd.to_datetime(df.index[-1]).tz_localize(None)
    predicted_date = (last_date + timedelta(days=1)).strftime("%Y-%m-%d")

    return {
        "symbol": symbol,
        "predicted_close": round(pred, 4),
        "last_close": round(last_close, 4),
        "predicted_date": predicted_date,
        "model": "RandomForestRegressor (demo)",
        "notes": "Simple lag-based model. Not financial advice."
    }
