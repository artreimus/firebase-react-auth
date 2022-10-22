import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProvideContext } from '../../contexts/Context';
import SidebarAddFileButton from './SidebarAddFileButton';

function Sidebar({ windowWidth }: { windowWidth: number }) {
  const { isSidebarOpen, setIsSidebarOpen, currentPage }: any =
    useProvideContext();

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const stylesSidebar = {
    minWidth:
      windowSize.innerWidth < 1300
        ? isSidebarOpen
          ? windowWidth < 400
            ? '65vw'
            : '260px'
          : '0vw'
        : '250px',

    maxWidth: '250px',
  };

  const stylesSidebarChildren = {
    display:
      windowSize.innerWidth < 1300
        ? isSidebarOpen
          ? 'block'
          : 'none'
        : 'block',
  };

  const stylesDark = {
    width: isSidebarOpen ? '100vw' : '0vw',
  };

  function setStylesFont(page: string) {
    if (page === currentPage) {
      return {
        color: '#e8e8e8',
      };
    }
    return { color: '#ffffff' };
  }

  return (
    <>
      <div
        className="dark-bg"
        onClick={() => {
          setIsSidebarOpen(false);
        }}
        style={stylesDark}
      ></div>
      <div className="sidebar" style={stylesSidebar}>
        <div
          className="sidebar_container_btn remove_sm"
          style={stylesSidebarChildren}
        >
          <SidebarAddFileButton />
        </div>
        <ul className="sidebar_list" style={stylesSidebarChildren}>
          <li>
            <Link
              to="/dashboard"
              className="sidebar_link link"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            >
              <div className="sidebar_container_icon center_all">
                <img src={require(`../../images/box-icon.png`)} alt="Menu" />
              </div>
              <p style={setStylesFont('dashboard')}>My Drive</p>
            </Link>
          </li>
          <li>
            <Link
              to="/quick-access"
              className="sidebar_link link"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            >
              <div className="sidebar_container_icon center_all">
                <img src={require(`../../images/circle-icon.png`)} alt="Menu" />
              </div>
              <p style={setStylesFont('quick-access')}>Quick Access</p>
            </Link>
          </li>
          {/* <li>
            <Link
              to="/private-files"
              className="sidebar_link  link"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            >
              <div className="sidebar_container_icon center_all">
                <img src={require(`../../images/lock-icon.png`)} alt="Menu" />
              </div>
              <p style={setStylesFont('private-files')}>Private Files</p>
            </Link>
          </li> */}
          <li>
            <Link
              to="/favorites"
              className="sidebar_link link"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            >
              <div className="sidebar_container_icon center_all">
                <img src={require(`../../images/star-icon.png`)} alt="Menu" />
              </div>
              <p style={setStylesFont('favorites')}>Favorites</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
