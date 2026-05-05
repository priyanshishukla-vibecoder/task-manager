from fastapi import APIRouter, Depends, HTTPException, Query, status

from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.task import TaskCreate, TaskResponse, TaskStatus, TaskStatusUpdate
from app.services.task_service import (
    create_task,
    delete_task,
    get_tasks,
    get_tasks_by_user_id,
    update_task_status,
)

from app.services.user_service import get_user_by_email, get_user_by_id



router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)   

@router.post(
    "", 
    response_model=TaskResponse, 
    status_code=status.HTTP_201_CREATED,
    summary="Create task"
)
def create_task_endpoint(task_data: TaskCreate, db: Session=Depends(get_db)) -> TaskResponse:
   
    user=get_user_by_id(db, task_data.user_id)
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this ID does not exist"
        )
    
    return create_task(db, task_data)


@router.get("", response_model=list[TaskResponse], summary="List tasks")
def get_tasks_endpoint(
    status_filter: TaskStatus | None = Query(default=None, alias="status"),
    db: Session=Depends(get_db)
) -> list[TaskResponse]:
    return get_tasks(db, status_filter) 

@router.get(
    "/by-user-email",
    response_model=list[TaskResponse],
    summary="List tasks by user email",
)
def get_tasks_by_user_email_endpoint(
    email: str,
    db: Session = Depends(get_db),
) -> list[TaskResponse]:
    user = get_user_by_email(db, email)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return get_tasks_by_user_id(db, user.id)


@router.patch(
    "/{task_id}/status", 
    response_model=TaskResponse, 
    summary="Update task status"
)
def update_task_status_endpoint(
    
    task_id: int, 
    status_data: TaskStatusUpdate, 
    db: Session=Depends(get_db)
) -> TaskResponse:


    task = update_task_status(db, task_id, status_data.status)

    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Task not found"
        )

    return task

@router.delete(
    "/{task_id}", 
    status_code=status.HTTP_204_NO_CONTENT, 
    summary="Delete task"
)
def delete_task_endpoint(
    task_id: int,
    db: Session=Depends(get_db)
)->None:
    is_deleted= delete_task(db, task_id)

    if not is_deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

