from enum import Enum
from pydantic import BaseModel, Field, ConfigDict

class TaskStatus(str, Enum): # restricts status to only pending, in-progress done
    pending = "pending"
    in_progress = "in_progress"
    done= "done"


class TaskPriority(str, Enum)   : # restricts priority to only low, medium, high
    low = "low"
    medium = "medium"
    high = "high"

class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    description: str | None = Field(default=None, max_length=500)
    priority: TaskPriority = Field(default=TaskPriority.medium)


class TaskStatusUpdate(BaseModel):
    status: TaskStatus

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    status: TaskStatus
    priority: TaskPriority
    user_id: int

    model_config = ConfigDict(from_attributes=True)
