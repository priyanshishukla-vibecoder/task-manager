import { useEffect, useState } from 'react';

import { getCurrentUser, loginUser, refreshAccessToken, registerUser } from './api/auth';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskStatus,
} from './api/tasks';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [message, setMessage] = useState('');
  const [authMode, setAuthMode] = useState('login');

  async function loadCurrentUser(activeToken = token) {
    if (!activeToken) {
      return;
    }

     try {
    const userData = await getCurrentUser(activeToken);
    setCurrentUser(userData);
  } catch (error) {
    const newAccessToken = await refreshSession();
    const userData = await getCurrentUser(newAccessToken);
    setCurrentUser(userData);
  }
  }

  async function loadTasks(status = statusFilter, activeToken = token) {
  if (!activeToken) {
    return;
  }

  try {
    const taskData = await getTasks(activeToken, status);
    setTasks(taskData);
  } catch (error) {
    const newAccessToken = await refreshSession();
    const taskData = await getTasks(newAccessToken, status);
    setTasks(taskData);
  }
}


  async function handleSignup(userData) {
    try {
      await registerUser(userData);
      setMessage('Account created. Please login.');
      setAuthMode('login');
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleLogin(credentials) {
    try {
      const data = await loginUser(credentials);
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      setToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setMessage('Login successful');
      await loadCurrentUser(data.access_token);
      await loadTasks('', data.access_token);
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken(null);
    setRefreshToken(null);    
    setCurrentUser(null);
    setTasks([]);
    setStatusFilter('');
    setMessage('Logged out successfully');
  }

  async function handleCreateTask(taskData) {
    try {
      const task = await createTask(token, taskData);
      setMessage(`Task created: ${task.title}`);
      await loadTasks();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleUpdateStatus(taskId, status) {
    try {
      await updateTaskStatus(token, taskId, status);
      setMessage('Task status updated');
      await loadTasks();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(token, taskId);
      setMessage('Task deleted');
      await loadTasks();
    } catch (error) {
      setMessage(error.message);
    }
  }

async function refreshSession() {
  if (!refreshToken) {
    throw new Error('Please login again.');
  }

  const data = await refreshAccessToken(refreshToken);

  localStorage.setItem('accessToken', data.access_token);
  setToken(data.access_token);

  return data.access_token;
}


  async function handleStatusFilterChange(event) {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);
    await loadTasks(selectedStatus);
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    async function loadProtectedData() {
      try {
        await loadCurrentUser(token);
        await loadTasks('', token);
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setRefreshToken(null);    
        setCurrentUser(null);
        setMessage('Session expired. Please login again.');
      }
    }

    loadProtectedData();
  }, [token]);

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">FastAPI + React + PostgreSQL + JWT</p>
          <h1>Task Manager</h1>
        </div>

        {currentUser && (
          <button type="button" className="secondary-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>

      {message && <p className="message">{message}</p>}

     {!token ? (
  <section className="auth-layout">
    <div className="auth-card">
      {authMode === 'login' ? (
        <>
          <LoginForm onLogin={handleLogin} />

          <p className="auth-switch-text">
            New here?{' '}
            <button
              type="button"
              className="link-button"
              onClick={() => setAuthMode('signup')}
            >
              Click here to sign up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignupForm onSignup={handleSignup} />

          <p className="auth-switch-text">
            Already registered?{' '}
            <button
              type="button"
              className="link-button"
              onClick={() => setAuthMode('login')}
            >
              Click here to login
            </button>
          </p>
        </>
      )}
    </div>
  </section>
) : (

        <>
          {currentUser && (
            <section className="panel selected-user">
              <strong>{currentUser.name}</strong>
              <span>{currentUser.email}</span>
            </section>
          )}

          <section className="grid">
            <TaskForm onCreateTask={handleCreateTask} />

            <section className="toolbar">
              <label>
                Filter tasks
                <select value={statusFilter} onChange={handleStatusFilterChange}>
                  <option value="">All</option>
                  <option value="pending">pending</option>
                  <option value="in_progress">in_progress</option>
                  <option value="done">done</option>
                </select>
              </label>
            </section>
          </section>

          <section className="grid single-column">
            <TaskList
              tasks={tasks}
              onUpdateStatus={handleUpdateStatus}
              onDeleteTask={handleDeleteTask}
            />
          </section>
        </>
      )}
    </main>
  );
}

export default App;
