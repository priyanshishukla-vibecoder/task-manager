import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    onLogin(formData);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
