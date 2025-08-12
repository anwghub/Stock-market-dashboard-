# app/routes/companies.py
from fastapi import APIRouter

router = APIRouter(prefix="/companies", tags=["Companies"])

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
    {"name": "Netflix", "symbol": "NFLX"},
]

@router.get("/")
def get_companies():
    return COMPANIES
