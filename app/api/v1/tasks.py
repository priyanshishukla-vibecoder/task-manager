from fastapi import APIRouter, Depends, HTTPException, Query, status

from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.task import TaskCreate, TaskResponse, TaskStatus, TaskStatusUpdate
from app.services.task_service import (
    create_task,
    delete_task,
    get_tasks,
    update_task_status,
)

from app.core.dependencies import get_current_user
from app.models.user import User




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
def create_task_endpoint(
    task_data: TaskCreate, 
    db: Session=Depends(get_db), 
    current_user: User=Depends(get_current_user)
) -> TaskResponse:
    
    return create_task(db, task_data, current_user.id)


@router.get("", response_model=list[TaskResponse], summary="List tasks")
def get_tasks_endpoint(
    status_filter: TaskStatus | None = Query(default=None, alias="status"),
    db: Session=Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[TaskResponse]:

    return get_tasks(db, current_user.id, status_filter) 


@router.patch(
    "/{task_id}/status", 
    response_model=TaskResponse, 
    summary="Update task status"
)
def update_task_status_endpoint(
    
    task_id: int, 
    status_data: TaskStatusUpdate, 
    db: Session=Depends(get_db),
    current_user: User=Depends(get_current_user),
) -> TaskResponse:


    task = update_task_status(db, task_id, status_data.status, current_user.id)

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
    db: Session=Depends(get_db),
    current_user: User=Depends(get_current_user)    
)->None:
    is_deleted= delete_task(db, task_id, current_user.id)

    if not is_deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

