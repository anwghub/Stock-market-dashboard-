import yfinance as yf
import pandas as pd

def fetch_stock_data(symbol, period="6mo", interval="1d"):
    ticker = yf.Ticker(symbol)
    df = ticker.history(period=period, interval=interval)

    if df.empty:
        return []

    # Fill Close from Adj Close if needed
    if "Close" not in df.columns or df["Close"].isna().all():
        df["Close"] = df.get("Adj Close", None)

    # Build list of dictionaries (JSON-friendly)
    records = []
    for date, row in df.iterrows():
        records.append({
            "date": date.strftime("%Y-%m-%d"),
            "close": float(row["Close"]) if pd.notna(row["Close"]) else None
        })

    return records
