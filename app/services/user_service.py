
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate, UserResponse



def create_user(db: Session,user_data: UserCreate) -> User :
    user=User(
        name=user_data.name,
        email=user_data.email
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    
    return user

def get_users(db: Session) -> list[User]:
    statement= select(User)
    return list(db.scalars(statement).all())



def get_user_by_email(db: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    return db.scalar(statement)

def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.get(User, user_id)

