import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import { AuthContext } from './AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const history = useHistory(); // Initialize useHistory

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => { // Make handleSubmit asynchronous to wait for login
    e.preventDefault();
    try {
      await login(formData); // Wait for login function to complete
      history.push('/timelogs'); // Redirect to '/time-log' after successful login
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error if needed
    }
    console.log(formData)
   
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
