import yfinance as yf
import pandas as pd
from typing import List, Dict

# Predefined companies list (optional — can be moved to a separate config file)
COMPANIES = [
    {"name": "Google (Alphabet)", "symbol": "GOOGL"},
    {"name": "Microsoft", "symbol": "MSFT"},
    {"name": "Atlassian", "symbol": "TEAM"},
    {"name": "Amazon", "symbol": "AMZN"},
    {"name": "Salesforce", "symbol": "CRM"},
    {"name": "NVIDIA", "symbol": "NVDA"},
    {"name": "Tata Motors (NSE)", "symbol": "TATAMOTORS.NS"},
    {"name": "Infosys (NSE)", "symbol": "INFY.NS"},
    {"name": "Meta (Facebook)", "symbol": "META"},
    {"name": "Apple", "symbol": "AAPL"},
    {"name": "Netflix", "symbol": "NFLX"}
]

def get_company_list() -> List[Dict[str, str]]:
    """
    Returns a static list of companies and their symbols.
    """
    return COMPANIES


def fetch_stock_data(symbol: str, period: str = "6mo", interval: str = "1d") -> List[Dict]:
    """
    Fetch historical stock data from Yahoo Finance.
    Returns a list of dictionaries (safe for JSON encoding).
    """
    try:
        df = yf.download(symbol, period=period, interval=interval, progress=False)
        
        if df.empty:
            return []
        
        # Reset index and format date
        df = df.reset_index()
        df["Date"] = pd.to_datetime(df["Date"]).dt.strftime("%Y-%m-%d")
        
        # Ensure all columns exist
        for col in ["Open", "High", "Low", "Close", "Volume"]:
            if col not in df.columns:
                df[col] = None
        
        # Convert DataFrame to list of dictionaries
        return df[["Date", "Open", "High", "Low", "Close", "Volume"]].to_dict(orient="records")
    
    except Exception as e:
        print(f"Error fetching stock data for {symbol}: {e}")
        return []
