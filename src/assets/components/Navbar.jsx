import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        setUserFirstName(user?.userFirstName);
        setUserId(user?._id);
        setIsAdmin(user?.userIsAdmin);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    } else {
      console.log("No user found in localStorage");
    }
  }, []);

  const navigate = useNavigate();
  const goHome = () => {
    window.location.href = "/";
  };
  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        {/* <img src='logo.png' alt='logo' /> */}
        <h2 onClick={goHome}>Smart Travel Companion</h2>
      </div>
      <div className='navbar__options'>
        <ul className='navbar__pages'>
          <li onClick={() => navigate("/")}>Home</li>
          <li>
            <a href={`/booking?user_id=${userId}&prev=${isAdmin}`}>Bookings</a>
          </li>
          <li>
            <a href='/travel-guide'>Travel guide</a>
          </li>
          <li>
            <a href='/contact'>Contact</a>
          </li>
          {isAdmin && (
            <li>
              <a href='/admin'>Admin area</a>
            </li>
          )}
        </ul>
        <div className='navbar__user'>
          {userFirstName ? (
            <ul>
              <li onClick={() => navigate("/profile")}>
                {userFirstName}'s profile
              </li>
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
