const API_BASE_URL = 'http://127.0.0.1:8001/api/v1';

export async function getUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}

export async function createUser(userData) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create user');
  }

  return response.json();
}
