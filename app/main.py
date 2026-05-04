from fastapi import FastAPI
from app.api.users import router as users_router
app = FastAPI(
    title="Task Manager API",
    description="A learning project built with FastAPI, React, and PostgreSQL.",
    version="0.1.0",
)

app.include_router(users_router) #this line registers it with app


@app.get("/")
def read_root():
    return {"message": "Task Manager API is running"}
