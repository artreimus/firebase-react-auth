import { Navigate } from 'react-router-dom';
import { useProvideContext } from '../../contexts/Context';

function PublicRoute({ children }: any): JSX.Element {
  const { currentUser }: any = useProvideContext();
  if (!currentUser) {
    return children;
  }
  return <Navigate to="/" />;
}

export default PublicRoute;
