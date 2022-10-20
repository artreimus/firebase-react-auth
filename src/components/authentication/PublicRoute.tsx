import { Navigate } from 'react-router-dom';
import { useProvideContext } from '../../contexts/Context';

interface PropType {
  children: React.ReactElement<any>;
}

function PublicRoute({ children }: PropType): JSX.Element {
  const { currentUser }: any = useProvideContext();
  if (!currentUser) {
    return children;
  }
  return <Navigate to="/" />;
}

export default PublicRoute;
