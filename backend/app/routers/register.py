from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.AuthService import AuthService
from app import database
from app.schemas.UserCreate import UserCreate

router = APIRouter(
    prefix="/api/register",
    tags=["register"]
);



@router.post("/")
def register_user(user: UserCreate,db: Session=Depends(database.get_db)):

    new_user = AuthService.create_user(db=db,user=user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id,
        "email": new_user.email
    }

