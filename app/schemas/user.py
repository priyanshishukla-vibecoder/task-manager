from pydantic import BaseModel, ConfigDict, EmailStr

class UserCreate(BaseModel):
    
    name:str
    email: EmailStr

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name:str

    model_config = ConfigDict(from_attributes=True)


   