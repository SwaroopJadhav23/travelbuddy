import React from 'react';
import { FaPlane, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Left Section - Logo and Description */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <FaPlane />
              </div>
              <div className="logo-text">
                <span className="logo-title">TravelBuddy</span>
                <span className="logo-subtitle">Your Travel Companion</span>
              </div>
            </div>
            <p className="footer-description">
              Plan perfect trips and manage expenses effortlessly. Your ultimate travel companion for unforgettable adventures.
            </p>
            <p className="footer-copyright">
              © 2024 TravelBuddy. All rights reserved.
            </p>
          </div>

          {/* Middle Section - Features */}
          <div className="footer-section">
            <h3 className="footer-title">Features</h3>
            <ul className="footer-links">
              <li><a href="/itinerary">Itinerary Generator</a></li>
              <li><a href="/expense-manager">Expense Manager</a></li>
              <li><a href="/">Group Travel</a></li>
              <li><a href="/">Budget Tracking</a></li>
            </ul>
          </div>

          {/* Right Section - Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="https://facebook.com" className="social-link" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" className="social-link" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="social-link" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

