from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import companies, stocks, predict

app = FastAPI(title="Stock API for Dashboard")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, change to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def initiate():
    return {"message": "API working"}

# Register routers
app.include_router(companies.router)
app.include_router(stocks.router)
app.include_router(predict.router)
