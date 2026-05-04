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

def get_user_by_email(email:str)->UserResponse | None: #lookup helprs to find a user by their email address, which is often used as a unique identifier for users in many applications. This function is particularly useful for operations like user registration (to check if an email is already in use) and authentication (to retrieve user details based on the provided email).
    for user in users:
        if user.email==email:
            return user
    return None

def get_user_by_id(user_id: int)-> UserResponse | None: #lookup helprs to find a user by their unique ID, which is useful for associating tasks with users and ensuring that operations are performed on the correct user.
    for user in users:
        if user.id==user_id:
            return user

    return None