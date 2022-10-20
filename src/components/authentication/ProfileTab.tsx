import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useProvideContext } from '../../contexts/Context';

function ProfileTab() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const { currentUser, logout }: any = useProvideContext();

  const navigate = useNavigate();

  function toggleMenu() {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  }

  function setVisibility() {
    if (isMenuOpen) {
      return 'profile_tab_container_list';
    }
    return 'profile_tab_container_list hidden';
  }

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch {
      showError();
    }
  }

  function showError() {
    setOpenError(true);
  }

  function hideError() {
    setOpenError(false);
  }

  return (
    <>
      <div className="profile_tab">
        <div
          className={isMenuOpen ? 'bg_menu' : 'bg_menu hidden'}
          onClick={() => setIsMenuOpen(false)}
        ></div>
        <button className="profile_btn center_all" onClick={toggleMenu}>
          {currentUser.email.charAt(0).toUpperCase()}
        </button>
        <div className={setVisibility()}>
          <ul className="profile_tab_list">
            <li className="profile_tab_list_item">
              <Link to="/profile" className="link">
                Profile
              </Link>
            </li>
            <li className="profile_tab_list_item">
              <Link to="/update-profile" className="link">
                Update Profile
              </Link>
            </li>
            <li className="profile_tab_list_item" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </div>

      <Modal show={openError} onHide={hideError}>
        <Modal.Body>
          <p>Failed to logout. Please try again</p>
          <button
            onClick={() => {
              hideError();
            }}
            className="modal_button modal_error_button"
          >
            Close
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileTab;
