from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.schemas import UserCreate
import models
from app.core import security


class AuthService:

    @staticmethod
    def create_user(db: Session, user: UserCreate):
        existing_email = db.query(models.User).filter(
            models.User.email == user.email).first()
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        existing_username = db.query(models.User).filter(
            models.User.username == user.username).first()
        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                details="Username already taken"
            )
        hashed_password = security.get_password_hash(user.password)

        db_user = models.User(
            email=user.email,
            username=user.username,
            password_hash=hashed_password
        )

        db.add(db_user)
        db.commit() 
        db.refresh(db_user) 

        return db_user
