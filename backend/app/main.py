from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from app.routers import register, login, users, recordings, tabs
from app.models.User import User
from app.models.Recording import Recording
from app.models.Scale import Scale
from app.models.Tab import Tab
from app.models.Genre import Genre
from app.database import engine, Base

tags_metadata = [
    {
        "name": "Auth",
        "description": "User authentication and registration logic (JWT).",
    },
    {
        "name": "Recordings",
        "description": "Audio file management, upload, and analysis endpoints.",
    },
    {
        "name": "Tabs",
        "description": "Guitar tablature operations: creation, retrieval, and genre linking.",
    },
    {
        "name": "Users",
        "description": "User profile management and data retrieval.",
    },
    {
        "name": "Scales",
        "description": "Reference data for musical scales.",
    },
]

app = FastAPI(
    title="SmartLyra API",
    description="""
    **SmartLyra Backend API** handles audio analysis, guitar tab generation, and user management.
    
    Key features:
    * **Audio Analysis**: Upload .wav files to detect musical scales.
    * **Tab Library**: Create and manage guitar tabs with linked genres.
    * **Authentication**: Secure JWT-based access.
    """,
    version="1.0.0",
    openapi_tags=tags_metadata,
    contact={
        "name": "SmartLyra Support",
        "email": "contact@smartlyra.com",
    },
)

Base.metadata.create_all(bind=engine)

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

app.include_router(register.router)
app.include_router(login.router)
app.include_router(users.router)
app.include_router(recordings.router)
app.include_router(tabs.router)