from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.users import router as users_router
from app.api.tasks import router as tasks_router


app = FastAPI(
    title="Task Manager API",
    description="A learning project built with FastAPI, React, and PostgreSQL.",
    version="0.1.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router) #this line registers it with app
app.include_router(tasks_router)

@app.get("/")
def read_root():
    return {"message": "Task Manager API is running"}
