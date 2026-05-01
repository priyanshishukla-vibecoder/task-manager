from fastapi import FastAPI

app = FastAPI(
    title="Task Manager API",
    description="A learning project built with FastAPI, React, and PostgreSQL.",
    version="0.1.0",
)


@app.get("/")
def read_root():
    return {"message": "Task Manager API is running"}
