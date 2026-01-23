from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.dependencies import get_current_user, get_db
from app.models.User import User
from app.schemas.TabSchema import TabCreateSchema, TabResponseSchema
from app.services.TabService import TabService

router = APIRouter(
    prefix="/api/tabs",
    tags=["Tabs"]
)

@router.post("/", response_model=TabResponseSchema)
def create_tab(
    tab_data: TabCreateSchema,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Creates a new guitar tab in the library.
    
    - **title**: Title of the song.
    - **artist**: Name of the artist/band.
    - **genre**: Music genre (e.g., 'Rock').
    - **content**: List of notes (string and fret positions).
    """

    service = TabService(db)
    return service.create_new_tab(tab_data, current_user.id)


@router.get("/", response_model=List[TabResponseSchema])
def get_tabs(db: Session = Depends(get_db)):
    """
    Retrieves a list of all guitar tabs stored in the database, ordered by creation date.
    """
    service = TabService(db)
    return service.get_all_tabs()