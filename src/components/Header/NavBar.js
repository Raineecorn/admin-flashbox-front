import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FlashBoxLogo from '../../images/FlashBoxLogo.png';
import Flashbox from '../../images/FlashBox.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-center align-items-center">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="https://landing.flashbox-cargo.com/">
          <img src={FlashBoxLogo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
          <img src={Flashbox} alt="FlashBox" style={{ height: '50px' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMobileMenu}
          aria-controls="navbarNav"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ml-auto d-flex justify-content-center align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="https://landing.flashbox-cargo.com/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="https://landing.flashbox-cargo.com/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="https://landing.flashbox-cargo.com/services">Services</Link>
            </li>
            <li className="nav-item ">
              <Link className="btn btn-danger btn-sm align-items-center" to="https://landing.flashbox-cargo.com/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
