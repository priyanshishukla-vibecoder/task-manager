from fastapi import APIRouter, status

from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import create_user, get_users

router= APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user_endpoint(user_data: UserCreate) -> UserResponse:
    return create_user(user_data)

@router.get("", response_model=list[UserResponse])
def get_users_endpoint() -> list[UserResponse]:
    return get_users()