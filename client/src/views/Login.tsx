import axios from 'axios';
import { useContext, useRef } from 'react';
import { Context } from '../context/Context';
import '../styles/pageStyles/login.scss';

function Login() {
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const apiURL = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiURL}/auth/login`, {
        username: userRef.current?.value,
        password: passwordRef.current?.value
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button type="submit" className="loginButton" disabled={isFetching}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
