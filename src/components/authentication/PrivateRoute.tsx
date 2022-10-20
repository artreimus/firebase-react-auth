import { Navigate } from 'react-router-dom';
import { useProvideContext } from '../../contexts/Context';

interface PropType {
  children: React.ReactElement<any>;
}

function PrivateRoute({ children }: PropType): JSX.Element {
  const { currentUser }: any = useProvideContext();
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
}

export default PrivateRoute;
