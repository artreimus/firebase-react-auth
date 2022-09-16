import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function PrivateRoute({ children }: any): JSX.Element {
  const { currentUser }: any = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
