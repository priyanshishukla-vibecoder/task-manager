import { useState } from 'react';

function TaskForm({ users, onCreateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    await onCreateTask({
      title,
      description: description || null,
      user_id: Number(userId),
    });

    setTitle('');
    setDescription('');
    setUserId('');
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create Task</h2>

      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label>
        User
        <select
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          required
        >
          <option value="">Select user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={users.length === 0}>
        Create Task
      </button>
    </form>
  );
}

export default TaskForm;
