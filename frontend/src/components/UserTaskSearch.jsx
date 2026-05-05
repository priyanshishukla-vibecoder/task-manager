import { useState } from 'react';

function UserTaskSearch({ onFindUser, onClearUser, selectedUser }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    await onFindUser(email);
  }

  function handleClear() {
    setEmail('');
    onClearUser();
  }

  return (
    <section className="toolbar">
      <form className="search-form" onSubmit={handleSubmit}>
        <label>
          Enter your email to view your workspace
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="user@example.com"
            required
          />
        </label>

        <div className="button-row">
          <button type="submit">View My Tasks</button>
          <button type="button" className="secondary-button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>

      {selectedUser && (
        <div className="selected-user">
          <strong>{selectedUser.name}</strong>
          <span>{selectedUser.email}</span>
        </div>
      )}
    </section>
  );
}

export default UserTaskSearch;
