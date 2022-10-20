import { Alert } from 'react-bootstrap';
import { SyntheticEvent, useState } from 'react';
import { useProvideContext } from '../../contexts/Context';
import { Link, useNavigate } from 'react-router-dom';

function Signup(): JSX.Element {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const { signup }: any = useProvideContext();
  const navigate = useNavigate();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setIsLoading(true);
      await signup(formData.email, formData.email, formData.name);
      navigate('/dashboard');
    } catch {
      setError('Failed to create an account');
    }
    setIsLoading(false);
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();

    const { name, value } = event.currentTarget;

    setFormData(
      (prevFormData: {
        email: string;
        name: string;
        password: string;
        confirmPassword: string;
      }) => ({
        ...prevFormData,
        [name]: value,
      })
    );
  }

  return (
    <>
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
          <h2 className="auth_header">sign up</h2>
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
                required
              ></input>
            </div>
            <div className="auth_form_container_input">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="auth_form_input"
                name="name"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="auth_form_container_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="auth_form_input"
                name="password"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="auth_form_container_input">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="auth_form_input"
                name="confirmPassword"
                onChange={handleChange}
                required
              ></input>
            </div>

            <button type="submit" disabled={isLoading} className="auth_btn">
              sign up
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
    </>
  );
}

export default Signup;
