from app.schemas.user import UserCreate, UserResponse

users: list[UserResponse] = []
next_user_id=1

def create_user(user_data: UserCreate) -> UserResponse:
    global next_user_id

    user = UserResponse(
        id=next_user_id,
        name=user_data.name,
        email=user_data.email
    )

    users.append(user)
    next_user_id += 1
    return user

def get_users() -> list[UserResponse]:
    return users