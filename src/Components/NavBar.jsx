import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavBar = () => {
  const location = useLocation();

  // State to manage the toggler visibility
  const [isOpen, setIsOpen] = useState(false);

  // Reference for the navbar
  const navbarRef = useRef(null);

  // Toggle navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Close navbar if clicked outside
  const handleClickOutside = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener to close the navbar when clicking outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4" ref={navbarRef}>
      <div className="container">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar} // Toggle on click
          aria-controls="navbarNav"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                to="/login"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/Form' ? 'active' : ''}`}
                to="/Form"
              >
                Form
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/ImageFetch' ? 'active' : ''}`}
                to="/ImageFetch"
              >
                Image Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/ImageUpload' ? 'active' : ''}`}
                to="/ImageUpload"
              >
                Upload Image
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/ForgotPassword' ? 'active' : ''}`}
                to="/ForgotPassword"
              >
                Forgot Password
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
