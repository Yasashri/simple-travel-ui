import React, { useState } from "react";
import Swal from "sweetalert2";
import "../styles/CreateUser.css";
import { URLS } from "../../config/constant";
import axios from "axios";

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(URLS.userData, formData);

      /*  if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create user");
      } */

      Swal.fire({
        icon: "success",
        title: "User Created",
        text: "The user has been successfully created!",
      });

      setFormData({
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userPassword: "",
        userContact: "",
        userIsAdmin: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  return (
    <div className='create-user-container'>
      <h2>Create new account</h2>
      <form onSubmit={handleSubmit} className='create-user-form'>
        <input
          type='text'
          name='userFirstName'
          placeholder='First Name'
          value={formData.userFirstName}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='userLastName'
          placeholder='Last Name'
          value={formData.userLastName}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='userEmail'
          placeholder='Email'
          value={formData.userEmail}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='userPassword'
          placeholder='Password'
          value={formData.userPassword}
          onChange={handleChange}
          required
        />
        <input
          type='tel'
          name='userContact'
          placeholder='Contact Number'
          value={formData.userContact}
          onChange={handleChange}
        />
        {/*  <label>
          <input
            type="checkbox"
            name="userIsAdmin"
            checked={formData.userIsAdmin}
            onChange={handleChange}
          />
          <span> Is Admin</span>
        </label> */}

        <button type='submit'>Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
