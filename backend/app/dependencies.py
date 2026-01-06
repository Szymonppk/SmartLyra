from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from app.database import get_db
from app.services.AuthService import AuthService
from sqlalchemy.orm import Session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


def get_current_user(
        token: str = Depends(oauth2_scheme),
        db: Session = Depends(get_db)
):
    return AuthService.validate_token(db, token)
