import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="logo">My E-Commerce</div>
      <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Services">Services</Link></li>
        <li><Link to="/ProductType">Product Type</Link></li>
        <li><Link to="/Help">Help</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/Cart"><FaShoppingCart /></Link></li>
      </ul>

      {/* Hamburger icon */}
      <button className={`hamburger ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </button>
    </nav>
  );
};

export default Navbar;
