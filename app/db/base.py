from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase): #Base is the parent class for all database models.
    pass

from app.models import task, user # noqa: E402, F401