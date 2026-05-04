from app.schemas.task import TaskCreate, TaskResponse, TaskStatus

tasks:list[TaskResponse] = []

next_task_id = 1    

def create_task(task_data: TaskCreate) -> TaskResponse: #creates a task with default status pending and adds it to the list of tasks
    global next_task_id

    task = TaskResponse(
        id=next_task_id,
        title=task_data.title,
        description=task_data.description,
        status=TaskStatus.pending, # default status when creating a task
        user_id=task_data.user_id
    )

    tasks.append(task)
    next_task_id += 1
    return task

def get_tasks(status: TaskStatus | None = None) -> list[TaskResponse]:  #Returns all tasks, or filters by status.
    if status is None:
        return tasks
    return [task for task in tasks if task.status == status]

def update_task_status(task_id: int, new_status: TaskStatus) -> TaskResponse | None: #Finds a task by ID and changes its status.
    for task in tasks:
        if task.id == task_id:
            task.status = new_status
            return task
    return None

def delete_task(task_id: int) -> bool: #Removes a task by ID.
    for index, task in enumerate(tasks):
        if task.id == task_id:
            tasks.pop(index)
            return True

    return False