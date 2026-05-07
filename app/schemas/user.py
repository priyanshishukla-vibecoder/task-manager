from pydantic import BaseModel, ConfigDict, EmailStr, Field

class UserCreate(BaseModel):
    
    name:str
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserResponse(BaseModel):
    id: int
    name:str
    email: EmailStr
    

    model_config = ConfigDict(from_attributes=True)


   