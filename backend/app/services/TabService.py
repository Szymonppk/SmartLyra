from sqlalchemy.orm import Session
from app.repositories.TabRepository import TabRepository
from app.schemas.TabSchema import TabCreateSchema
from app.models.Tab import Tab
from app.models.Genre import Genre

class TabService:
    def __init__(self, db: Session):
        self.repo = TabRepository(db)

    def create_new_tab(self, data: TabCreateSchema, user_id: int):
        genre = self.repo.get_genre_by_name(data.genre)
        if not genre:
            genre = Genre(name=data.genre)
            genre = self.repo.create_genre(genre)
       
        new_tab = Tab(
            user_id=user_id,
            title=data.title,
            artist=data.artist,
            content=[note.dict() for note in data.content],
            bpm=120,
            time_signature="4/4"
        )
        
        new_tab.genres.append(genre)
        
        return self.repo.create_tab(new_tab)

    def get_all_tabs(self):
        return self.repo.get_all()