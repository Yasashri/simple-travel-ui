import React, { useState, useEffect } from "react";
import { URLS } from "../../config/constant";
import { HotelCard } from "../components";
import axios from "axios";

const Hotels = () => {
  const [hotelData, setHotelData] = useState([]);
  useEffect(() => {
    const getHotelData = async () => {
      try {
        const response = await axios.get(URLS.HotelData);
        setHotelData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getHotelData();
  }, []);

  return <div>
    <HotelCard hotelData={hotelData}/>
  </div>;
};

export default Hotels;
