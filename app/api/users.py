from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import create_user, get_users, get_user_by_email

router= APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post(
    "", 
    response_model=UserResponse, 
    status_code=status.HTTP_201_CREATED,
    summary="Create user"
)

def create_user_endpoint(
    user_data: UserCreate,
    db: Session = Depends(get_db)
) -> UserResponse:
    existing_user=get_user_by_email(db, user_data.email)
    
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    return create_user(db, user_data)

@router.get(
    "", 
    response_model=list[UserResponse],
    summary="List users"
)
def get_users_endpoint(
    db: Session = Depends(get_db)
) -> list[UserResponse]:
    
    return get_users(db)

@router.get(
    "/by-email",
    response_model=UserResponse,
    summary="Get user by email",
)
def get_user_by_email_endpoint(
    email: str,
    db: Session = Depends(get_db),
) -> UserResponse:
    user = get_user_by_email(db, email)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user
