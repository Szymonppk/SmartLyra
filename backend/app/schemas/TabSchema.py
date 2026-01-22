from pydantic import BaseModel
from typing import List, Any, Optional
from datetime import datetime

class NoteSchema(BaseModel):
    string: int
    fret: int

class TabCreateSchema(BaseModel):
    title: str
    artist: str
    genre: str 
    content: List[NoteSchema]

class TabResponseSchema(BaseModel):
    id: int
    title: str
    artist: str
    content: Any
    created_at: datetime

    class Config:
        from_attributes = True