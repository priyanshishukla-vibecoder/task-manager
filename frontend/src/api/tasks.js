const API_BASE_URL = 'http://127.0.0.1:8001/api/v1';


export async function getTasks(status) {
  const query = status ? `?status=${status}` : '';
  const response = await fetch(`${API_BASE_URL}/tasks${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
}

export async function getTasksByUserEmail(email) {
  const response = await fetch(
    `${API_BASE_URL}/tasks/by-user-email?email=${encodeURIComponent(email)}`,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch user tasks');
  }

  return response.json();
}


export async function createTask(taskData) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create task');
  }

  return response.json();
}

export async function updateTaskStatus(taskId, status) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update task');
  }

  return response.json();
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to delete task');
  }
}
