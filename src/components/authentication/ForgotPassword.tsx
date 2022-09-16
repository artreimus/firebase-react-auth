import React from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { SyntheticEvent, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

function ForgotPassword(): JSX.Element {
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const { resetPassword }: any = useAuth();
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setIsLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instruction');
    } catch {
      setError('Failed to reset password');
    }
    setIsLoading(false);
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={isLoading} className="w-100 mt-3" type="submit">
              Reset password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </CenteredContainer>
  );
}

export default ForgotPassword;
