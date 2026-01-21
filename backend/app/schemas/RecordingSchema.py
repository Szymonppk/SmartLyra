from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional
import os

class RecordingSchema(BaseModel):
    id: int
    filename: str
    message: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True 

class RecordingListSchema(BaseModel):
    id: int
    filename: str   
    created_at: datetime
    scale_name: Optional[str] = None 

    class Config:
        from_attributes = True

    
    @field_validator('filename', mode='before')
    def extract_filename(cls, v):
        path = v.file_path if hasattr(v, 'file_path') else v
        return os.path.basename(path)

   