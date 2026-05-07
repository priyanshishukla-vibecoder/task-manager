from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskStatus

  

def create_task(db: Session, task_data: TaskCreate, user_id: int) -> Task:
#creates a task with default status pending and adds it to the list of tasks


    task = Task(
        title=task_data.title,
        description=task_data.description,
        user_id=user_id
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task

def get_tasks(
    db: Session,
    user_id: int, 
    status: TaskStatus | None = None,
) -> list[Task]:  #Returns all tasks, or filters by status.

    statement= select(Task).where(Task.user_id == user_id)

    if status is not None:
        statement = statement.where(Task.status == status)
    return list(db.scalars(statement).all())


def update_task_status(db:Session, task_id: int, status: TaskStatus, user_id: int) -> Task | None: #Finds a task by ID and changes its status.

    statement= select(Task).where(
        Task.id == task_id,
        Task.user_id == user_id
    )
    task = db.scalar(statement)

    if task is None:
        return None

    task.status = status
    db.commit()
    db.refresh(task)

    return task

def delete_task(db: Session, task_id: int, user_id: int) -> bool: #Removes a task by ID.
    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == user_id
    )
    task = db.scalar(statement)
    if task is None:
        return False

    db.delete(task)
    db.commit()
    return True

