from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from app.routers import register, scales, login, users, recordings, tabs
from app.models.User import User
from app.models.Recording import Recording
from app.models.Scale import Scale
from app.models.Tab import Tab
from app.models.Genre import Genre
from app.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3005",
    "http://127.0.0.1:3005"
]
# To connect react with fastapi 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(scales.router)
app.include_router(register.router)
app.include_router(login.router)
app.include_router(users.router)
app.include_router(recordings.router)
app.include_router(tabs.router)