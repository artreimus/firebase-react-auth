import { Container } from 'react-bootstrap';

type ChildrenProps = {
  children: React.ReactNode; // type children
};

function CenteredContainer({ children }: ChildrenProps) {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        {children}
      </div>
    </Container>
  );
}

export default CenteredContainer;
