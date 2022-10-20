import React from 'react';
import { Alert } from 'react-bootstrap';
import { SyntheticEvent, useState } from 'react';
import { useProvideContext } from '../../contexts/Context';
import { Link } from 'react-router-dom';

function ForgotPassword(): JSX.Element {
  const { resetPassword }: any = useProvideContext();
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: '',
  });

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setIsLoading(true);
      await resetPassword(formData.email);
      setMessage('Check your inbox for further instruction');
    } catch {
      setError('Failed to reset password');
    }
    setIsLoading(false);
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>): void {
    event.preventDefault();

    const { name, value } = event.currentTarget;

    setFormData((prevFormData: { email: string }) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <div>
      <div className="auth_pg bg_gradient ">
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
          <h2 className="auth_header">Password Reset</h2>
          <div className="auth_instruction_text">
            Fear not. We'll email you the instruction to reset your password
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form onSubmit={handleSubmit} className="auth_form">
            <div className="auth_form_container_input auth_form_container_password_reset">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="email@example.com"
                className="auth_form_input"
                name="email"
                onChange={handleChange}
              ></input>
            </div>
            <button type="submit" disabled={isLoading} className="auth_btn">
              Reset Password
            </button>
          </form>
          <div className="auth_text">
            Already have an account?{' '}
            <Link to="/login" className="auth_link link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
