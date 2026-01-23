from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.UserLogin import UserLogin, Token
from app.services.AuthService import AuthService
from app.core import security
from datetime import timedelta 

router = APIRouter(
    prefix="/api/login",
    tags=["Auth"]
)

@router.post("/",response_model=Token)
def login_with_access_token(form_data: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticates a user using username and password.
    
    Returns a short-lived **JSON Web Token (JWT)** required for accessing protected endpoints.
    """
    
    user = AuthService.authenticate_user(db,user_login=form_data)

    access_token_expires= timedelta(minutes=security.ACCESS_TOKEN_EXPIRE)
    access_token = security.create_access_token(
        data={"sub":user.username},
        expires_delta=access_token_expires
    )
    return {"access_token":access_token,"token_type":"bearer"}