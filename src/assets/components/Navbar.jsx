import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userFirstName, setUserFirstName] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log("user", user?.userFirstName);
        setUserFirstName(user?.userFirstName);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    } else {
      console.log("No user found in localStorage");
    }
  }, []);

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
          {userFirstName ? (
            <ul>
              <li onClick={() => navigate("/profile")}>{userFirstName}'s profile</li>
            </ul>
          ) : (
            <ul>
              <li onClick={() => navigate("/login")}>Login</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
