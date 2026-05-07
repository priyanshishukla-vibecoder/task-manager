from fastapi import APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from fastapi import Depends

from app.core.security import create_access_token, verify_password
from app.db.session import get_db
from app.schemas.auth import LoginRequest, TokenResponse
from app.services.user_service import get_user_by_email

from app.core.dependencies import get_current_user
from app.schemas.user import UserResponse
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=TokenResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    user = get_user_by_email(db, login_data.email)

    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(data={"sub": user.email})

    return TokenResponse(access_token=access_token, token_type="bearer")

@router.get("/me", response_model=UserResponse)
def read_current_user(current_user: User = Depends(get_current_user)) -> User:
    return current_user
