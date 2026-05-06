# Task Manager App

A learning-focused full-stack task manager built with FastAPI, React, and PostgreSQL.

## Tech Stack

- Backend: FastAPI
- Database: PostgreSQL
- ORM: SQLAlchemy
- Validation: Pydantic
- Frontend: React
- Version Control: Git and GitHub

## Current Status

The application currently supports:

- Create users
- Find users by email
- Create tasks
- List tasks
- View tasks by user email
- Filter tasks by status
- Update task status
- Delete tasks
- Store users and tasks in PostgreSQL
- React frontend connected to FastAPI backend

## Project Structure

```text
app/
  main.py
  api/
    router.py
    v1/
      router.py
      users.py
      tasks.py
  core/
    config.py
  db/
    base.py
    session.py
  models/
    user.py
    task.py
  schemas/
    user.py
    task.py
  services/
    user_service.py
    task_service.py
frontend/
  src/
    api/
    components/
scripts/
  create_tables.py
```

## Folder Responsibilities

- `app/main.py`: FastAPI application entry point.
- `app/api/`: API routing setup.
- `app/api/v1/`: Version 1 API route files.
- `app/core/`: Application configuration.
- `app/db/`: Database base and session setup.
- `app/models/`: SQLAlchemy database table models.
- `app/schemas/`: Pydantic request and response schemas.
- `app/services/`: Business logic and database operations.
- `frontend/`: React frontend application.
- `scripts/`: Utility scripts.

## Setup Instructions

### 1. Create Virtual Environment

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\Activate
```

### 2. Install Backend Dependencies

```powershell
pip install -r requirements.txt
```

### 3. Create Backend `.env`

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql+psycopg://postgres:12345@localhost:5432/task_manager
APP_ENV=development
```

Do not commit `.env` to Git.

### 4. Create PostgreSQL Database

Login to PostgreSQL:

```powershell
psql -U postgres -h localhost -p 5432
```

Create the database:

```sql
CREATE DATABASE task_manager;
```

Exit psql:

```sql
\q
```

### 5. Create Database Tables

Run:

```powershell
python -m scripts.create_tables
```

Expected output:

```text
Database Tables created successfully.
```

### 6. Run FastAPI Server

```powershell
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8001
```

Open Swagger docs:

```text
http://127.0.0.1:8001/docs
```

### 7. Create Frontend `.env`

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_BASE_URL=http://127.0.0.1:8001/api/v1
```

A safe template is available at:

```text
frontend/.env.example
```

### 8. Run React Frontend

Open a second terminal from the project root.

Go to the frontend folder:

```powershell
cd frontend
```

Install frontend dependencies if they are not already installed:

```powershell
npm install
```

Run the React development server:

```powershell
npm run dev
```

Open the frontend app:

```text
http://localhost:5173
```

The React app calls the FastAPI backend using:

```text
VITE_API_BASE_URL
```

Make sure the FastAPI backend is running before using the frontend.

## API Endpoints

Base backend URL:

```text
http://127.0.0.1:8001
```

Base API URL:

```text
http://127.0.0.1:8001/api/v1
```

### Root

```http
GET /
```

### Users

Create user:

```http
POST /api/v1/users
```

List users:

```http
GET /api/v1/users
```

Get user by email:

```http
GET /api/v1/users/by-email?email={email}
```

### Tasks

Create task:

```http
POST /api/v1/tasks
```

List tasks:

```http
GET /api/v1/tasks
```

Filter tasks by status:

```http
GET /api/v1/tasks?status=pending
```

Allowed statuses:

```text
pending
in_progress
done
```

Get tasks by user email:

```http
GET /api/v1/tasks/by-user-email?email={email}
```

Update task status:

```http
PATCH /api/v1/tasks/{task_id}/status
```

Delete task:

```http
DELETE /api/v1/tasks/{task_id}
```

## Postman API Testing Guide

Base backend URL:

```text
http://127.0.0.1:8001
```

Base API URL:

```text
http://127.0.0.1:8001/api/v1
```

### 1. Root Health Check

```http
GET /
```

URL:

```text
http://127.0.0.1:8001/
```

Expected status:

```text
200 OK
```

Expected response:

```json
{
  "message": "Task Manager API is running"
}
```

### 2. Create User

```http
POST /api/v1/users
```

Body:

```json
{
  "name": "Postman User",
  "email": "postman.user@example.com"
}
```

Expected status:

```text
201 Created
```

Example response:

```json
{
  "id": 5,
  "name": "Postman User",
  "email": "postman.user@example.com"
}
```

### 3. List Users

```http
GET /api/v1/users
```

Expected status:

```text
200 OK
```

Example response:

```json
[
  {
    "id": 5,
    "name": "Postman User",
    "email": "postman.user@example.com"
  }
]
```

### 4. Get User By Email

```http
GET /api/v1/users/by-email?email=postman.user@example.com
```

Expected status:

```text
200 OK
```

Example response:

```json
{
  "id": 5,
  "name": "Postman User",
  "email": "postman.user@example.com"
}
```

### 5. Duplicate User Email Validation

```http
POST /api/v1/users
```

Body:

```json
{
  "name": "Postman User",
  "email": "postman.user@example.com"
}
```

Expected status:

```text
400 Bad Request
```

Example response:

```json
{
  "detail": "User with this email already exists"
}
```

### 6. Create Task

```http
POST /api/v1/tasks
```

Body:

```json
{
  "title": "Test task from Postman",
  "description": "This task was created while testing the API in Postman.",
  "user_id": 5
}
```

Expected status:

```text
201 Created
```

Example response:

```json
{
  "id": 9,
  "title": "Test task from Postman",
  "description": "This task was created while testing the API in Postman.",
  "status": "pending",
  "user_id": 5
}
```

### 7. List Tasks

```http
GET /api/v1/tasks
```

Expected status:

```text
200 OK
```

### 8. Filter Tasks By Status

```http
GET /api/v1/tasks?status=pending
```

Allowed status values:

```text
pending
in_progress
done
```

Expected status:

```text
200 OK
```

### 9. Get Tasks By User Email

```http
GET /api/v1/tasks/by-user-email?email=postman.user@example.com
```

Expected status:

```text
200 OK
```

Expected result:

```text
Returns only tasks belonging to the user with the given email.
```

### 10. Update Task Status

```http
PATCH /api/v1/tasks/9/status
```

Body:

```json
{
  "status": "in_progress"
}
```

Expected status:

```text
200 OK
```

Example response:

```json
{
  "id": 9,
  "title": "Test task from Postman",
  "description": "This task was created while testing the API in Postman.",
  "status": "in_progress",
  "user_id": 5
}
```

### 11. Invalid Task Status Validation

```http
PATCH /api/v1/tasks/9/status
```

Body:

```json
{
  "status": "completed"
}
```

Expected status:

```text
422 Unprocessable Content
```

Reason:

```text
Only pending, in_progress, and done are valid status values.
```

### 12. Create Task With Invalid User

```http
POST /api/v1/tasks
```

Body:

```json
{
  "title": "Invalid user task",
  "description": "This should fail because user does not exist.",
  "user_id": 99999
}
```

Expected status:

```text
400 Bad Request
```

Example response:

```json
{
  "detail": "User with this ID does not exist"
}
```

### 13. Delete Task

```http
DELETE /api/v1/tasks/9
```

Expected status:

```text
204 No Content
```

Expected response body:

```text
Empty
```

### 14. Delete Task Not Found

```http
DELETE /api/v1/tasks/99999
```

Expected status:

```text
404 Not Found
```

Example response:

```json
{
  "detail": "Task Not Found"
}
```

## Git Workflow Used

Feature branches used during development:

```text
feature/basic-fastapi-app
feature/backend-structure
feature/user-api
feature/task-api
feature/api-validation
feature/database-setup
feature/database-models
feature/create-db-tables
feature/use-database
feature/api-versioning
feature/frontend-env-config
feature/user-task-view-polish
docs/backend-setup
docs/frontend-usage
docs/postman-api-docs
```

Common workflow:

```powershell
git checkout main
git pull origin main
git checkout -b feature/branch-name
git add .
git commit -m "Meaningful commit message"
git push -u origin feature/branch-name
git checkout main
git merge feature/branch-name
git push origin main
```

## Notes

- `.env` is ignored by Git because it contains local secrets.
- `.env.example` is committed as a safe template.
- `frontend/.env` is ignored by Git because frontend environment values can change per machine.
- `frontend/.env.example` is committed as a safe frontend template.
- PostgreSQL must be running before starting the API.
- Docker Compose setup is planned, but local PostgreSQL is currently used.
- The frontend runs on `http://localhost:5173`.
- The backend runs on `http://127.0.0.1:8001`.
- The frontend calls the backend through `VITE_API_BASE_URL`.
