import pandas as pd
import numpy as np

def df_to_records(df: pd.DataFrame):
    # Reset index to ensure all fields are in columns
    df = df.reset_index()

    # Ensure 'Date' exists and is formatted
    if 'Date' in df.columns:
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce').dt.strftime("%Y-%m-%d")
    else:
        df['Date'] = None

    # Ensure all required fields exist
    fields = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume']
    for f in fields:
        if f not in df.columns:
            df[f] = None

    records = df[fields].to_dict(orient='records')

    safe_records = []
    for row in records:
        safe_row = {}
        for k, v in row.items():
            # Convert NumPy types to native Python
            if isinstance(v, (np.integer, np.int64)):
                v = int(v)
            elif isinstance(v, (np.floating, np.float64)):
                v = float(v)
            elif isinstance(v, (np.bool_)):
                v = bool(v)

            # Replace NaN/NaT with None
            if v is None or (isinstance(v, float) and np.isnan(v)):
                v = None

            safe_row[k] = v
        safe_records.append(safe_row)

    return safe_records
