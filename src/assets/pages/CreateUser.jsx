import React, { useState } from "react";
import "../styles/CreateUser.css";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    userContact: "",
    userIsAdmin: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating user:", formData);
    // Connect with API here (axios.post or fetch)
  };

  return (
    <div className="user-create">
      <div className="user-create__container">
        <h2 className="user-create__title">Create New User</h2>
        <form className="user-create__form" onSubmit={handleSubmit}>
          <label className="user-create__label">First Name</label>
          <input
            type="text"
            name="userFirstName"
            value={formData.userFirstName}
            onChange={handleChange}
            className="user-create__input"
            required
          />

          <label className="user-create__label">Last Name</label>
          <input
            type="text"
            name="userLastName"
            value={formData.userLastName}
            onChange={handleChange}
            className="user-create__input"
            required
          />

          <label className="user-create__label">Email</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className="user-create__input"
            required
          />

          <label className="user-create__label">Password</label>
          <input
            type="password"
            name="userPassword"
            value={formData.userPassword}
            onChange={handleChange}
            className="user-create__input"
            required
          />

          <label className="user-create__label">Contact Number</label>
          <input
            type="number"
            name="userContact"
            value={formData.userContact}
            onChange={handleChange}
            className="user-create__input"
          />

          <label className="user-create__label user-create__label--checkbox">
            <input
              type="checkbox"
              name="userIsAdmin"
              checked={formData.userIsAdmin}
              onChange={handleChange}
            />
            Admin User
          </label>

          <button type="submit" className="user-create__button">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
