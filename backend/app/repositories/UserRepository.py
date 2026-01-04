from sqlalchemy.orm import Session
from app.models.User import User
from app.schemas.UserCreate import UserCreate


class UserRepository:

    @staticmethod
    def get_by_email(db: Session, email:str):
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_by_username(db: Session, username:str):
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def create_user(db: Session, user: UserCreate, hashed_password: str):
        db_user = User(
            email=user.email,
            username=user.username,
            password_hash=hashed_password
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return db_user
