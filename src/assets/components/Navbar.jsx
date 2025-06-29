import React from "react";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        {/* <img src='logo.png' alt='logo' /> */}
        <h2>Smart Travel Companion</h2>
      </div>
      <div className='navbar__options'>
        <ul className='navbar__pages'>
          <li onClick={() => navigate("/")}>Home</li>
          <li>
            <a href='/about'>Bookings</a>
          </li>
          <li>
            <a href='/about'>Travel guide</a>
          </li>
          <li>
            <a href='/contact'>Contact</a>
          </li>
        </ul>
        <div className='navbar__user'>
          <ul>
            <li onClick={() => navigate("/login")}>Login</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
