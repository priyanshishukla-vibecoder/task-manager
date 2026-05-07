import { useState } from 'react';

function SignupForm({ onSignup }) {
  const [formData, setFormData] = useState({
    name: '',
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
    onSignup(formData);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>

      <label>
        Name
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

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
          minLength="6"
          required
        />
      </label>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
