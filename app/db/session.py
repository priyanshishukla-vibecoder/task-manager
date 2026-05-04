from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.core.config import settings

engine = create_engine(settings.database_url) #creates a SQLAlchemy engine using the database URL from settings. It Creates the database connection engine.

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
) #Creates database sessions.

def get_db() -> Generator[Session, None, None]: #A dependency function that provides a database session for each request.
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



