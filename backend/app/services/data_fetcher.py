import yfinance as yf
from typing import List, Dict
from app.utils.helpers import df_to_records  # correct import

def fetch_stock_data(symbol: str, period: str = "6mo", interval: str = "1d") -> List[Dict]:
    """
    Fetch historical stock data from Yahoo Finance.
    Returns a JSON-safe list of dictionaries.
    """
    try:
        df = yf.download(symbol, period=period, interval=interval, progress=False)
        if df.empty:
            return []
        # Ensure df_to_records returns list of dicts
        return df_to_records(df)
    except Exception as e:
        print(f"Error fetching stock data for {symbol}: {e}")
        return []