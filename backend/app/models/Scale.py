from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Scale(Base):
    __tablename__ = "scales"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    notes = Column(String(100))
    description = Column(Text)
    
