from sqlalchemy.orm import Session
from app.models.Tab import Tab
from app.models.Genre import Genre

class TabRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_tab(self, tab: Tab):
        self.db.add(tab)
        self.db.commit()
        self.db.refresh(tab)
        return tab

    def get_all(self):
        return self.db.query(Tab).order_by(Tab.created_at.desc()).all()

    def get_genre_by_name(self, name: str):
        return self.db.query(Genre).filter(Genre.name == name).first()

    def create_genre(self, genre: Genre):
        self.db.add(genre)
        self.db.commit()
        self.db.refresh(genre)
        return genre