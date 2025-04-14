import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // For navigation
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Services</h3>
        <ul>
          <li>Shipping</li>
          <li>Returns</li>
          <li>Support</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Company</h3>
        <ul>
          <li>About</li>
          <li>Careers</li>
          <li>Contact</li>
          <li>
          <Link to="/AdminDashboard" className="admin-link">Admin Dashboard</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
