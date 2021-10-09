import axios from 'axios';
import { useState } from 'react';
import '../styles/pageStyles/register.scss';

function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    try {
      const apiURL = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiURL}/auth/register`, {
        username,
        email,
        password
      });
      if (res.data) {
        window.location.replace('/login');
      }
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="registerButton">
          Register
        </button>
      </form>
      {error && (
        <span style={{ color: 'red', marginTop: '10px' }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
}

export default Register;
