from pydantic import BaseModel, EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    username: str
    password: str