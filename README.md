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

The backend currently supports:

- Create users
- List users
- Create tasks
- List tasks
- Filter tasks by status
- Update task status
- Delete tasks
- Store users and tasks in PostgreSQL

## Project Structure

```text
app/
  main.py
  api/
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
scripts/
  create_tables.py
```

## Folder Responsibilities

- `app/main.py`: FastAPI application entry point.
- `app/api/`: API route files.
- `app/core/`: Application configuration.
- `app/db/`: Database base and session setup.
- `app/models/`: SQLAlchemy database table models.
- `app/schemas/`: Pydantic request and response schemas.
- `app/services/`: Business logic and database operations.
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

### 2. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 3. Create `.env`

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
uvicorn app.main:app --reload
```

Open Swagger docs:

```text
http://127.0.0.1:8000/docs
```
### 7. Run React Frontend

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

The React app calls the FastAPI backend at:

```text
http://127.0.0.1:8000
```

Make sure the FastAPI backend is running before using the frontend.


## API Endpoints

### Users

Create user:

```http
POST /users
```

Example body:

```json
{
  "name": "Priyanshi",
  "email": "priyanshi@example.com"
}
```

List users:

```http
GET /users
```

### Tasks

Create task:

```http
POST /tasks
```

Example body:

```json
{
  "title": "Learn FastAPI",
  "description": "Practice building APIs",
  "user_id": 1
}
```

List tasks:

```http
GET /tasks
```

Filter tasks by status:

```http
GET /tasks?status=pending
```

Allowed statuses:

```text
pending
in_progress
done
```

Update task status:

```http
PATCH /tasks/{task_id}/status
```

Example body:

```json
{
  "status": "in_progress"
}
```

Delete task:

```http
DELETE /tasks/{task_id}
```

## Git Workflow Used

Feature branches:

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
docs/backend-setup
```

Common workflow:

```powershell
git checkout main
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
- PostgreSQL must be running before starting the API.
- Docker Compose setup is planned, but local PostgreSQL is currently used.
- The frontend runs on `http://localhost:5173` and calls the backend at `http://127.0.0.1:8000`.

