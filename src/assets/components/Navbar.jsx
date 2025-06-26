import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        <img src='logo.png' alt='logo' />
      </div>
      <div className='navbar__options'>
        <ul className='navbar__pages'>
          <li>
            <a href='/home'>Home</a>
          </li>
          <li>
            <a href='/about'>Flights</a>
          </li>
          <li>
            <a href='/about'>Hotels</a>
          </li>
          <li>
            <a href='/about'>Vehicles</a>
          </li>
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
            <li>Login</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
