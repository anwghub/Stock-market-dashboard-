import pandas as pd
import numpy as np

def df_to_records(df: pd.DataFrame):
    df = df.reset_index()
    df['Date'] = pd.to_datetime(df['Date']).dt.strftime("%Y-%m-%d")
    fields = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume']
    for f in fields:
        if f not in df.columns:
            df[f] = None
    records = df[fields].to_dict(orient='records')

    # Convert all NumPy types to Python types
    safe_records = []
    for r in records:
        safe_row = {}
        for k, v in r.items():
            if isinstance(v, (np.generic, np.number)):
                v = float(v)
            if pd.isna(v):
                v = None
            safe_row[k] = v
        safe_records.append(safe_row)

    return safe_records
