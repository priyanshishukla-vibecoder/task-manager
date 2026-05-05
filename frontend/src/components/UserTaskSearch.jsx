import { useState } from 'react';

function UserTaskSearch({ onViewTasks, onShowAllTasks }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    await onViewTasks(email);
  }

  function handleShowAll() {
    setEmail('');
    onShowAllTasks();
  }

  return (
    <section className="toolbar">
      <form className="search-form" onSubmit={handleSubmit}>
        <label>
          View tasks by user email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="user@example.com"
            required
          />
        </label>

        <div className="button-row">
          <button type="submit">View Tasks</button>
          <button type="button" className="secondary-button" onClick={handleShowAll}>
            Show All
          </button>
        </div>
      </form>
    </section>
  );
}

export default UserTaskSearch;
