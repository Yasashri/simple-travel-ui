import React, { useState, useEffect } from "react";
import "../styles/AdminModal.css";
import axios from "axios";

const Modal = ({ show, onClose, mode, type, data, onSuccess }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fieldsMap = {
    flights: [
      "flightNo", "flightStart", "flightEnd", "flightModel",
      "flightImage", "flightBasePrice", "flightDate", "flightTime"
    ],
    hotels: [
      "hotelName", "hotelDescription", "hotelLocation",
      "hotelGmaps", "hotelImage", "hotelPrice", "hotelContact"
    ],
    vehicles: [
      "vehicleNo", "vehicleDriver", "vehicleContact",
      "vehicleImage", "vehicleModel", "vehicleBasePrice"
    ]
  };

  const handleSubmit = async () => {
    try {
      const url = `/api/${type}${mode === "edit" ? `/${data._id}` : ""}`;
      if (mode === "add") await axios.post(url, formData);
      else await axios.put(url, formData);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(`Failed to ${mode} ${type}`, err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/${type}/${data._id}`);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(`Failed to delete ${type}`, err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{mode === "add" ? `Add New ${type}` : `Edit ${type}`}</h3>
        {fieldsMap[type].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={formData[field] || ""}
            onChange={handleChange}
          />
        ))}
        <div className="modal-buttons">
          <button onClick={handleSubmit}>{mode === "add" ? "Add" : "Update"}</button>
          {mode === "edit" && <button onClick={handleDelete} className="danger">Delete</button>}
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
