from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.UserCreate import UserCreate
from app.schemas.UserLogin import UserLogin
from app.models.User import User
from app.core import security
from app.repositories.UserRepository import UserRepository


class AuthService:

    @staticmethod
    def create_user(db: Session, user: UserCreate):

        existing_email = UserRepository.get_by_email(db, email=user.email)
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        existing_username = UserRepository.get_by_username(db, username=user.username)
        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        hashed_password = security.get_password_hash(user.password)

        db_user = UserRepository.create_user(db, user, hashed_password)

        return db_user

    @staticmethod
    def authenticate_user(db: Session, user_login: UserLogin):
        user = UserRepository.get_by_username(db, username = user_login.username)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Wrong username or password",
                headers={"WWW-Authenticate": "Bearer"}
            )
        if not security.verify_password(user_login.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Wrong username or password",
                headers={"WWW-Authenticate": "Bearer"}
            )
        return user
