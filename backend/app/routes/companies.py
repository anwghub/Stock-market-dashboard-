from fastapi import APIRouter
from config import COMPANIES

router = APIRouter(prefix="/companies", tags=["Companies"])

@router.get("/")
def get_companies():
    return COMPANIES
