import { useProvideContext } from '../../contexts/Context';
import { Link } from 'react-router-dom';
import Navbar from '../google-drive/Navbar';

function Profile() {
  const { currentUser }: any = useProvideContext();

  return (
    <>
      <Navbar />
      <h2 className="title">Profile</h2>

      <div className="profile center_all">
        <div className="profile_container">
          <div className="profile_container_header center_all">
            <div className="profile_img"></div>
            <p className="profile_name">{currentUser.displayName}</p>
          </div>
          <div className="profile_container_body center_all">
            <div className="profile_info">
              <strong>Email:</strong>
              <p>{currentUser.email}</p>
            </div>
            <div className="profile_info">
              <strong>Password:</strong>
              <p>******************</p>
            </div>
            <div className="profile_container_btn">
              <Link to="/update-profile" className="link">
                <p>update profile</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
