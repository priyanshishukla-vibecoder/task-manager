import { useEffect, useState } from 'react';

import {
  createTask,
  deleteTask,
  getTasks,
  getTasksByUserEmail,
  updateTaskStatus,
} from './api/tasks';
import { createUser, getUsers } from './api/users';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserTaskSearch from './components/UserTaskSearch';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [message, setMessage] = useState('');

  async function loadUsers() {
    const userData = await getUsers();
    setUsers(userData);
  }

  async function loadTasks(status = statusFilter) {
    const taskData = await getTasks(status);
    setTasks(taskData);
  }

  async function handleCreateUser(userData) {
    try {
      const user = await createUser(userData);
      setMessage(`User created: ${user.name}`);
      await loadUsers();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleCreateTask(taskData) {
    try {
      const task = await createTask(taskData);
      setMessage(`Task created: ${task.title}`);
      await loadTasks();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleUpdateStatus(taskId, status) {
    try {
      await updateTaskStatus(taskId, status);
      setMessage('Task status updated');
      await loadTasks();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId);
      setMessage('Task deleted');
      await loadTasks();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleViewTasksByEmail(email) {
    try {
      const taskData = await getTasksByUserEmail(email);
      setTasks(taskData);
      setStatusFilter('');
      setMessage(`Showing tasks for ${email}`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleShowAllTasks() {
    try {
      setStatusFilter('');
      await loadTasks('');
      setMessage('Showing all tasks');
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleStatusFilterChange(event) {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);
    await loadTasks(selectedStatus);
  }

  useEffect(() => {
    loadUsers();
    loadTasks('');
  }, []);

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">FastAPI + React + PostgreSQL</p>
          <h1>Task Manager</h1>
        </div>
      </header>

      {message && <p className="message">{message}</p>}

      <section className="grid">
        <UserForm onCreateUser={handleCreateUser} />
        <TaskForm users={users} onCreateTask={handleCreateTask} />
      </section>

      <UserTaskSearch
        onViewTasks={handleViewTasksByEmail}
        onShowAllTasks={handleShowAllTasks}
      />

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

      <section className="grid">
        <UserList users={users} />
        <TaskList
          tasks={tasks}
          onUpdateStatus={handleUpdateStatus}
          onDeleteTask={handleDeleteTask}
        />
      </section>
    </main>
  );
}

export default App;
