import { useState } from 'react';

function TaskForm({ selectedUser, onCreateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedUser) {
      return;
    }

    await onCreateTask({
      title,
      description: description || null,
      user_id: selectedUser.id,
    });

    setTitle('');
    setDescription('');
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create Task</h2>

      {!selectedUser && (
        <p className="empty">Enter your email first to create tasks.</p>
      )}

      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          disabled={!selectedUser}
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          disabled={!selectedUser}
        />
      </label>

      <button type="submit" disabled={!selectedUser}>
        Create Task
      </button>
    </form>
  );
}

export default TaskForm;
