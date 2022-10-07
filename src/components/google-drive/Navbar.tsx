import { Link } from 'react-router-dom';
import { useProvideContext } from '../../contexts/Context';
import ProfileTab from '../authentication/ProfileTab';

function NavbarComponent() {
  const { currentUser, toggleSidebar }: any = useProvideContext();

  return (
    <nav className="navbar">
      <button className="nav-menu remove_lg" onClick={toggleSidebar}>
        <img src={require(`../../images/hamburger-menu.png`)} alt="Menu" />
      </button>

      <Link to="/dashboard" className="remove_sm">
        <div className="nav_container_logo container_logo ">
          <img
            src={require(`../../images/logo.png`)}
            alt="Pandora's Cloud Logo"
          />
        </div>
      </Link>

      <div className="nav_container_profile">
        <Link to="/profile" className="link">
          <p className="nav_name hidden_sm">{currentUser.displayName}</p>
        </Link>
        <ProfileTab />
      </div>
    </nav>
  );
}

export default NavbarComponent;
