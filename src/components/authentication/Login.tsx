import React from 'react';
import { Alert } from 'react-bootstrap';
import { SyntheticEvent, useState } from 'react';
import { useProvideContext } from '../../contexts/Context';
import { Link, useNavigate } from 'react-router-dom';

function Login(): JSX.Element {
  const { login }: any = useProvideContext();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      setError('');
      setIsLoading(true);
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch {
      setError('Failed to sign in');
    }
    setIsLoading(false);
  }

  function handleChange(event: any) {
    event.preventDefault();

    const { name, value } = event.target;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <div className="auth_pg bg_gradient">
      <div className="auth_pg_main auth_pg_main_lg">
        <div className="auth_pg_container_logo_lg container_logo">
          <Link to="/" className="auth_link link">
            <img
              src={require(`../../images/logo.png`)}
              alt="Pandora's Cloud Logo"
            />
          </Link>
        </div>
        <h1 className="auth_pg_title">Pandora's Cloud</h1>
      </div>
      <div className="auth_bg_gradient auth_container ">
        <div className="auth_pg_container_logo_sml container_logo auth_pg_main_sml">
          <Link to="/" className="auth_link link">
            <img
              src={require(`../../images/logo.png`)}
              alt="Pandora's Cloud Logo"
            />
          </Link>
        </div>
        <h2 className="auth_header">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit} className="auth_form">
          <div className="auth_form_container_input">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="email@example.com"
              className="auth_form_input"
              name="email"
              onChange={handleChange}
            ></input>
          </div>
          <div className="auth_form_container_input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="auth_form_input"
              name="password"
              onChange={handleChange}
            ></input>
          </div>
          <button type="submit" disabled={isLoading} className="auth_btn">
            Login
          </button>
        </form>
        <div className="auth_text">
          Need an account?{' '}
          <Link to="/signup" className="auth_link link">
            Sign up
          </Link>
        </div>
        <div className="auth_text">
          Forgot your password?{' '}
          <Link to="/forgot-password" className="auth_link link">
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
