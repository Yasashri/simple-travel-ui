import React, { useState, useEffect } from "react";
import { URLS } from "../../config/constant";
import { VehicleCard } from "../components";
import axios from "axios";

const Vehicles = () => {
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    const getVehivleData = async () => {
      try {
        const response = await axios.get(URLS.vehicleData);
        setVehicleData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getVehivleData();
  }, []);

  return (
    <div>
      <VehicleCard vehicleData={vehicleData} />
    </div>
  );
};

export default Vehicles;
