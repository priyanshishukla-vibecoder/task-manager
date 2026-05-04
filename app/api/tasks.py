from fastapi import APIRouter, HTTPException, Query, status

from app.schemas.task import TaskCreate, TaskResponse, TaskStatus, TaskStatusUpdate
from app.services.task_service import create_task, get_tasks, update_task_status, delete_task
from app.services.user_service import get_user_by_id


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
def create_task_endpoint(task_data: TaskCreate) -> TaskResponse:
    user=get_user_by_id(task_data.user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this ID does not exist"
        )
    return create_task(task_data)


@router.get("", response_model=list[TaskResponse], summary="List tasks")
def get_tasks_endpoint(status_filter: TaskStatus | None = Query(default=None, alias="status"),
) -> list[TaskResponse]:
    return get_tasks(status_filter) 


@router.patch("/{task_id}/status", response_model=TaskResponse, summary="Update task status")
def update_task_status_endpoint(task_id: int, status_data: TaskStatusUpdate,) -> TaskResponse:
    task = update_task_status(task_id, status_data.status)

    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Task not found"
        )

    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete task")
def delete_task_endpoint(task_id: int)->None:
    is_deleted= delete_task(task_id)

    if not is_deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

