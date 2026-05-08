import { useState } from 'react';

function TaskForm({ onCreateTask }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onCreateTask({
      title: formData.title,
      description: formData.description || null,
      priority: formData.priority,
    });

    setFormData({
      title: '',
      description: '',
      priority: 'medium', 
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create Task</h2>

      <label>
        Title
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
<label>
  Priority
  <select
    name="priority"
    value={formData.priority}
    onChange={handleChange}
  >
    <option value="low">low</option>
    <option value="medium">medium</option>
    <option value="high">high</option>
  </select>
</label>

      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;
