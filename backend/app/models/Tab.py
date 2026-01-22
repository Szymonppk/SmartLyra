from sqlalchemy import Column, Integer, String, ForeignKey, JSON, DateTime, Table
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.Genre import Genre


tab_genres = Table('tab_genres', Base.metadata,
    Column('tab_id', Integer, ForeignKey('tabs.id'), primary_key=True),
    Column('genre_id', Integer, ForeignKey('genres.id'), primary_key=True)
)

class Tab(Base):
    __tablename__ = "tabs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    title = Column(String(100), nullable=False)
    artist = Column(String(100))
    content = Column(JSON, nullable=False) 
    
    bpm = Column(Integer, default=120)
    time_signature = Column(String(10), default="4/4")
    difficulty_level = Column(Integer, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    genres = relationship("Genre", secondary=tab_genres, backref="tabs")
    user = relationship("User", backref="tabs")