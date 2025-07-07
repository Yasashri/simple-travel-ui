import React, { useState, useEffect } from "react";
import { URLS } from "../../config/constant";
import { VehicleCard } from "../components";
import axios from "axios";
import "../styles/Vehicles.css";

const Vehicles = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getVehicleData = async () => {
      try {
        const response = await axios.get(URLS.vehicleData);
        setVehicleData(response.data);
        setFilteredData(response.data); 
      } catch (err) {
        console.error(err);
      }
    };

    getVehicleData();
  }, []);

 useEffect(() => {
  if (!searchTerm.trim()) {
    setFilteredData(vehicleData);
    return;
  }

  const term = searchTerm.trim().toLowerCase();

  const filtered = vehicleData.filter((vehicle) => {
    const name = vehicle.vehicleDriver?.toLowerCase() || "";
    const type = vehicle.vehicleModel?.toLowerCase() || "";
    const basePrice = vehicle.vehicleBasePrice?.toString() || "";

    return (
      name.includes(term) ||
      type.includes(term) ||
      basePrice.includes(term)
    );
  });

  setFilteredData(filtered);
}, [searchTerm, vehicleData]);

  return (
    <div className="vehicles-container">
      <input
        type="text"
        className="vehicle-search"
        placeholder="Search by name, type or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <VehicleCard vehicleData={filteredData} />
    </div>
  );
};

export default Vehicles;
