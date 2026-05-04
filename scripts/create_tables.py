from app.db.base import Base
from app.db.session import engine

def create_tables()->None:
    Base.metadata.create_all(bind=engine) # Base.metadata - Contains the table definitions discovered from your models., create_all(bind=engine)- Connects to PostgreSQL and creates tables that do not already exist.

if __name__=="__main__":
    create_tables() 
    print("Database Tables created successfully.")