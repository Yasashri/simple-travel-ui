import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/Profile.css";
import { URLS } from "../../config/constant";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFirstName(storedUser.userFirstName);
      setLastName(storedUser.userLastName);
    }
  }, []);

  const handleUpdate = async () => {
    if (!firstName || !lastName) {
      return Swal.fire(
        "Error",
        "First name and last name are required",
        "error"
      );
    }
    try {
      await axios.put(URLS.userData + "/" + user._id, {
        userFirstName: firstName,
        userLastName: lastName,
        userPassword: newPassword, // Send empty if not updating password
      });

      Swal.fire("Success", "Profile updated successfully", "success");
      localStorage.removeItem("user");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Update failed",
        "error"
      );
    }
  };

  if (!user) return <p>Loading user profile...</p>;
  const logOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <div className='profile-container'>
      <h2>{firstName} {lastName}</h2>
      <h3 onClick={logOut}>Log out</h3>
      <label>First Name:</label>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />

      <label>Last Name:</label>
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} />

      <label>Email:</label>
      <input value={user.userEmail} disabled />

      <label>New Password:</label>
      <input
        type='password'
        placeholder='Leave blank to keep current'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default Profile;
