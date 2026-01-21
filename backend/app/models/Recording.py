from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship  
from app.database import Base


class Recording(Base):
    __tablename__ = "recordings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    file_path = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    detected_scale_id = Column(Integer, ForeignKey("scales.id"), nullable=True)
    scale = relationship("Scale", backref="recordings") 
    user = relationship("User", backref="recordings")