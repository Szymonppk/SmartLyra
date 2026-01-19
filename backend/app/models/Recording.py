from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base

class Recording(Base):
    __tablename__ = "recordings"

    id = Column(Integer, primary_key=True, index=True)
    file_path = Column(String(255), nullable=False)
    detected_scale_id = Column(Integer, nullable=True) 
    user_id = Column(Integer, ForeignKey("users.id"))  
    
    
    created_at = Column(TIMESTAMP, server_default=func.now())