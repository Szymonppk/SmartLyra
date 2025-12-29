from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import jwt
from typing import Optional
import os

secret_key = os.getenv("SECRET_KEY")
algorithm = os.getenv("HS256")
access_token_expire = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encoded(to_encode, secret_key, algorithm=algorithm)
    return encoded_jwt
