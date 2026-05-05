import { useEffect, useState } from 'react';

import {
  createTask,
  deleteTask,
  getTasksByUserEmail,
  updateTaskStatus,
} from './api/tasks';
import { createUser, getUserByEmail } from './api/users';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import UserForm from './components/UserForm';
import UserTaskSearch from './components/UserTaskSearch';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  async function loadUserWorkspace(email) {
    const user = await getUserByEmail(email);
    const taskData = await getTasksByUserEmail(email);

    setSelectedUser(user);
    setTasks(taskData);
    setMessage(`Showing workspace for ${user.name}`);
  }

  async function handleFindUser(email) {
    try {
      await loadUserWorkspace(email);
    } catch (error) {
      setSelectedUser(null);
      setTasks([]);
      setMessage(`${error.message}. Create the user below.`);
    }
  }

  async function handleClearUser() {
    setSelectedUser(null);
    setTasks([]);
    setMessage('Workspace cleared');
  }

  async function handleCreateUser(userData) {
    try {
      const user = await createUser(userData);
      setSelectedUser(user);
      setTasks([]);
      setMessage(`User created: ${user.name}`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleCreateTask(taskData) {
    try {
      const task = await createTask(taskData);
      setMessage(`Task created: ${task.title}`);

      if (selectedUser) {
        await loadUserWorkspace(selectedUser.email);
      }
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleUpdateStatus(taskId, status) {
    try {
      await updateTaskStatus(taskId, status);
      setMessage('Task status updated');

      if (selectedUser) {
        await loadUserWorkspace(selectedUser.email);
      }
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId);
      setMessage('Task deleted');

      if (selectedUser) {
        await loadUserWorkspace(selectedUser.email);
      }
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    setMessage('Enter your email to open your workspace.');
  }, []);

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow"></p>
          <h1>Task Manager</h1>
        </div>
      </header>

      {message && <p className="message">{message}</p>}

      <UserTaskSearch
        selectedUser={selectedUser}
        onFindUser={handleFindUser}
        onClearUser={handleClearUser}
      />

      {!selectedUser && (
        <section className="grid single-column">
          <UserForm onCreateUser={handleCreateUser} />
        </section>
      )}

      <section className="workspace-stack">
      <TaskForm selectedUser={selectedUser} onCreateTask={handleCreateTask} />
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
