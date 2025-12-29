from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.UserCreate import UserCreate
from app.schemas.UserLogin import UserLogin
from app.models.User import User
from app.core import security


class AuthService:

    @staticmethod
    def create_user(db: Session, user: UserCreate):
        existing_email = db.query(User).filter(
            User.email == user.email).first()
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        existing_username = db.query(User).filter(
            User.username == user.username).first()
        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        hashed_password = security.get_password_hash(user.password)

        db_user = User(
            email=user.email,
            username=user.username,
            password_hash=hashed_password
        )

        db.add(db_user)
        db.commit() 
        db.refresh(db_user) 

        return db_user

    @staticmethod
    def authenticate_user(db: Session, user_login: UserLogin):
        user = db.query(User).filter(
            User.username == user_login.username
        ).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Wrong username or password",
                headers={"WWW-Authenticate": "Bearer"}
            )
        if not security.verify_password(user_login.password,user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Wrong username or password",
                headers={"WWW-Authenticate": "Bearer"}
            )
        return user