import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // Toggle hamburger menu
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Fetch cart count on mount and whenever route changes
  useEffect(() => {
    const count = localStorage.getItem("cartCount");
    setCartCount(count ? parseInt(count) : 0);
  }, [location]);  // 👈 Triggered when route changes

  // Listen to cart updates across tabs/windows
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCount = localStorage.getItem("cartCount");
      setCartCount(updatedCount ? parseInt(updatedCount) : 0);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
        <li>
          <Link to="/cart">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
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
