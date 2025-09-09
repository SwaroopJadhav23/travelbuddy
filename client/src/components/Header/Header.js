import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlane, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <FaPlane />
            </div>
            <div className="logo-text">
              <span className="logo-title">TravelBuddy</span>
              <span className="logo-subtitle">Your Travel Companion</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/itinerary" 
              className={`nav-link ${isActive('/itinerary') ? 'active' : ''}`}
            >
              Itinerary
            </Link>
            <Link 
              to="/trip" 
              className={`nav-link ${isActive('/trip') ? 'active' : ''}`}
            >
              Trip
            </Link>
            <Link 
              to="/expense-manager" 
              className={`nav-link ${isActive('/expense-manager') ? 'active' : ''}`}
            >
              Expense Manager
            </Link>
          </nav>

          {/* Login Button */}
          <div className="header-actions">
            <button className="btn btn-primary login-btn">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="nav-mobile">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/itinerary" 
              className={`nav-link ${isActive('/itinerary') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Itinerary
            </Link>
            <Link 
              to="/trip" 
              className={`nav-link ${isActive('/trip') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Trip
            </Link>
            <Link 
              to="/expense-manager" 
              className={`nav-link ${isActive('/expense-manager') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Expense Manager
            </Link>
            <button className="btn btn-primary mobile-login-btn">
              Login
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
