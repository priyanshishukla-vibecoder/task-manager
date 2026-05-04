import { useState } from 'react';

function UserForm({ onCreateUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    await onCreateUser({
      name,
      email,
    });

    setName('');
    setEmail('');
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create User</h2>

      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <button type="submit">Create User</button>
    </form>
  );
}

export default UserForm;
