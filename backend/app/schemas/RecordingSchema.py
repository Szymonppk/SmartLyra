from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class RecordingSchema(BaseModel):
    id: int
    filename: str
    message: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True 