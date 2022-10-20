import { Alert } from 'react-bootstrap';
import { SyntheticEvent, useState } from 'react';
import { useProvideContext } from '../../contexts/Context';
import { useNavigate } from 'react-router-dom';
import Navbar from '../google-drive/Navbar';

function UpdateProfile(): JSX.Element {
  const { currentUser, updateEmail, updatePassword, updateName }: any =
    useProvideContext();

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: currentUser.email,
    name: '',
    password: '',
    confirmPassword: '',
  });

  console.log(formData);

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

  const navigate = useNavigate();

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const promises = [];
    setIsLoading(true);
    setError('');

    if (formData.email !== currentUser.email) {
      promises.push(updateEmail(formData.email));
      console.log('updating email');
    }

    if (formData.name !== currentUser.displayName) {
      promises.push(updateName(formData.name));
      console.log('updating name');
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password) {
      promises.push(updatePassword(formData.password));
      console.log('updating password');
    }

    // if all promises are successful, navigate to home, if not
    Promise.all(promises)
      .then(() => navigate('/profile'))
      .catch(() => {
        setError('Failed to update profile');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Navbar />
      <h2 className="title">Edit Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="profile center_all">
        <div className="profile_container">
          <div className="profile_container_header center_all">
            <div className="profile_img"></div>
          </div>
          <div className="profile_container_body center_all">
            <form className="profile_form center_all" onSubmit={handleSubmit}>
              <div className="profile_info profile_container_form_input">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  className="profile_form_input"
                  name="name"
                  onChange={handleChange}
                ></input>
              </div>

              <div className="profile_info profile_container_form_input">
                <label htmlFor="password">Email: </label>
                <input
                  type="email"
                  className="profile_form_input"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                ></input>
              </div>
              <div className="profile_info profile_container_form_input">
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  className="profile_form_input"
                  name="password"
                  onChange={handleChange}
                  placeholder="Leave blank to keep the same"
                ></input>
              </div>
              <div className="profile_info profile_container_form_input">
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                  type="password"
                  className="profile_form_input"
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Leave blank to keep the same"
                ></input>
              </div>
              <button
                className="profile_container_btn"
                type="submit"
                disabled={isLoading}
              >
                <p>update profile</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
