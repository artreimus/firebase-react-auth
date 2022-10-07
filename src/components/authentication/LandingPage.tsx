import React from 'react';
import { Link } from 'react-router-dom';
import { useProvideContext } from '../../contexts/Context';

function LandingPage() {
  const { currentUser }: any = useProvideContext();

  return (
    <div className="bg_gradient landing_pg">
      <div className="landing_pg_main">
        <div className="landing_pg_container_logo container_logo">
          <img
            src={require(`../../images/logo.png`)}
            alt="Pandora's Cloud Logo"
          />
        </div>
        <h1 className="landing_pg_title">Pandora's Cloud</h1>
      </div>
      {!currentUser && (
        <div className="landing_pg_container_btn">
          <Link to="/signup" className="landing_pg_btn link">
            Sign Up
          </Link>
          <Link to="/login" className="landing_pg_btn link">
            Login
          </Link>
        </div>
      )}

      {currentUser && (
        <div className="landing_pg_container_btn">
          <Link to="/dashboard" className="landing_pg_btn link">
            Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
