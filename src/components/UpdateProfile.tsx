import { Button, Card, Form, Alert } from 'react-bootstrap';
import { SyntheticEvent, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

// interface useAuthContext {
//   currentUser: firebase.User | null;
//   signup: any;
// }

function UpdateProfile(): JSX.Element {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef =
    useRef() as React.MutableRefObject<HTMLInputElement> as React.MutableRefObject<HTMLInputElement>;
  const passwordConfirmRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;

  const { currentUser, updateEmail, updatePassword }: any = useAuth();

  const navigate = useNavigate();

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const promises = [];
    setIsLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    // if all promises are successful, navigate to home, if not
    Promise.all(promises)
      .then(() => navigate('/'))
      .catch(() => {
        setError('Failed to update profile');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={isLoading} className="w-100 mt-3" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
}

export default UpdateProfile;
