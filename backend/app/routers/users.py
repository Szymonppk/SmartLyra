from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.models.User import User

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)

@router.get("/me")
def get_user_data(current_user: User = Depends(get_current_user)):
    """
    Returns profile information for the currently authenticated user based on the JWT token.
    """
    return current_user