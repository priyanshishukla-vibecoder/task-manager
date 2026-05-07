# Task Manager App

A learning-focused full-stack task manager built with FastAPI, React, PostgreSQL, and JWT authentication.

## Tech Stack

- Backend: FastAPI
- Database: PostgreSQL
- ORM: SQLAlchemy
- Validation: Pydantic
- Authentication: JWT access and refresh tokens
- Password Hashing: passlib with bcrypt
- Frontend: React
- Version Control: Git and GitHub

## Current Status

The application currently supports:

- User registration with hashed passwords
- User login with JWT access and refresh tokens
- Protected current-user route
- Refresh access token using refresh token
- Create tasks for the logged-in user
- List logged-in user's tasks
- Filter logged-in user's tasks by status
- Update logged-in user's task status
- Delete logged-in user's tasks
- Store users and tasks in PostgreSQL
- React frontend connected to FastAPI backend

## Project Structure

```text
app/
  main.py
  api/
    router.py
    v1/
      auth.py
      router.py
      users.py
      tasks.py
  core/
    config.py
    dependencies.py
    security.py
  db/
    base.py
    session.py
  models/
    user.py
    task.py
  schemas/
    auth.py
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
- `app/core/`: Application configuration, security helpers, and dependencies.
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

### Auth

Register user:

```http
POST /api/v1/users
```

Login:

```http
POST /api/v1/auth/login
```

Get current user:

```http
GET /api/v1/auth/me
```

Refresh access token:

```http
POST /api/v1/auth/refresh
```

### Users

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

List logged-in user's tasks:

```http
GET /api/v1/tasks
```

Filter logged-in user's tasks by status:

```http
GET /api/v1/tasks?status=pending
```

Allowed statuses:

```text
pending
in_progress
done
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

## Authentication Testing Guide

Authentication is implemented using JWT access and refresh tokens.

### Token Types

Access token:

```text
Used to access protected API routes.
Short-lived.
Sent in the Authorization header.
```

Refresh token:

```text
Used to generate a new access token.
Longer-lived.
Only sent to the refresh endpoint.
```

### Authorization Header Format

For protected routes, use:

```text
Authorization: Bearer <access_token>
```

In Postman:

1. Open the request.
2. Go to the Authorization tab.
3. Select Bearer Token.
4. Paste only the access token.
5. Do not include the word Bearer manually.

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

### 2. Register User

```http
POST /api/v1/users
```

URL:

```text
http://127.0.0.1:8001/api/v1/users
```

Body:

```json
{
  "name": "JWT Test User",
  "email": "jwt.user@example.com",
  "password": "test123"
}
```

Expected status:

```text
201 Created
```

Example response:

```json
{
  "id": 6,
  "name": "JWT Test User",
  "email": "jwt.user@example.com"
}
```

Note:

```text
The password is never returned in the API response.
The backend stores only hashed_password in the database.
```

### 3. Login

```http
POST /api/v1/auth/login
```

URL:

```text
http://127.0.0.1:8001/api/v1/auth/login
```

Body:

```json
{
  "email": "jwt.user@example.com",
  "password": "test123"
}
```

Expected status:

```text
200 OK
```

Expected response:

```json
{
  "access_token": "jwt_access_token_here",
  "refresh_token": "jwt_refresh_token_here",
  "token_type": "bearer"
}
```

### 4. Get Current User

```http
GET /api/v1/auth/me
```

URL:

```text
http://127.0.0.1:8001/api/v1/auth/me
```

Authorization:

```text
Bearer Token: access_token
```

Expected status:

```text
200 OK
```

Example response:

```json
{
  "id": 6,
  "name": "JWT Test User",
  "email": "jwt.user@example.com"
}
```

### 5. Refresh Access Token

```http
POST /api/v1/auth/refresh
```

URL:

```text
http://127.0.0.1:8001/api/v1/auth/refresh
```

Body:

```json
{
  "refresh_token": "jwt_refresh_token_here"
}
```

Expected status:

```text
200 OK
```

Expected response:

```json
{
  "access_token": "new_jwt_access_token_here",
  "token_type": "bearer"
}
```

### 6. Invalid Refresh Token Test

Use an access token in place of a refresh token:

```json
{
  "refresh_token": "jwt_access_token_here"
}
```

Expected status:

```text
401 Unauthorized
```

Expected response:

```json
{
  "detail": "Invalid refresh token"
}
```

Reason:

```text
The refresh endpoint accepts only tokens with type refresh.
```

### 7. Create Task

```http
POST /api/v1/tasks
```

Authorization:

```text
Bearer Token: access_token
```

Body:

```json
{
  "title": "Protected task",
  "description": "Created using JWT user"
}
```

Expected status:

```text
201 Created
```

Example response:

```json
{
  "id": 10,
  "title": "Protected task",
  "description": "Created using JWT user",
  "status": "pending",
  "user_id": 6
}
```

Note:

```text
Do not send user_id while creating a task.
The backend gets the user_id from the JWT token.
```

### 8. List Logged-In User's Tasks

```http
GET /api/v1/tasks
```

Authorization:

```text
Bearer Token: access_token
```

Expected status:

```text
200 OK
```

Expected result:

```text
Returns only tasks belonging to the logged-in user.
```

### 9. Filter Logged-In User's Tasks By Status

```http
GET /api/v1/tasks?status=pending
```

Authorization:

```text
Bearer Token: access_token
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

### 10. Update Task Status

```http
PATCH /api/v1/tasks/10/status
```

Authorization:

```text
Bearer Token: access_token
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
  "id": 10,
  "title": "Protected task",
  "description": "Created using JWT user",
  "status": "in_progress",
  "user_id": 6
}
```

### 11. Invalid Task Status Validation

```http
PATCH /api/v1/tasks/10/status
```

Authorization:

```text
Bearer Token: access_token
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

### 12. Delete Task

```http
DELETE /api/v1/tasks/10
```

Authorization:

```text
Bearer Token: access_token
```

Expected status:

```text
204 No Content
```

Expected response body:

```text
Empty
```

### 13. Delete Task Not Found

```http
DELETE /api/v1/tasks/99999
```

Authorization:

```text
Bearer Token: access_token
```

Expected status:

```text
404 Not Found
```

Example response:

```json
{
  "detail": "Task not found"
}
```

### 14. Protected Route Without Token

```http
GET /api/v1/tasks
```

Do not send a Bearer token.

Expected status:

```text
401 Unauthorized
```

Reason:

```text
Task routes are protected and require a valid access token.
```

### Removed Old Task Lookup

This old route is no longer used:

```http
GET /api/v1/tasks/by-user-email
```

Reason:

```text
After login, the backend identifies the user from the JWT token.
Tasks should not be fetched by manually passing an email.
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
feature/jwt-auth
feature/protect-task-routes
feature/frontend-auth
feature/refresh-token
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
- Access tokens are used for protected routes.
- Refresh tokens are used only to generate new access tokens.
- Passwords are hashed before being stored in the database.
