import React, { useState, useEffect } from "react";
import { URLS } from "../../config/constant";
import { HotelCard } from "../components";
import axios from "axios";
import "../styles/Hotels.css"; // Add this line

const Hotels = () => {
  const [hotelData, setHotelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getHotelData = async () => {
      try {
        const response = await axios.get(URLS.hotelData);
        setHotelData(response.data);
        setFilteredData(response.data); // Initially show all hotels
      } catch (err) {
        console.error(err);
      }
    };
    getHotelData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(hotelData);
      return;
    }

    const term = searchTerm.trim().toLowerCase();

    const filtered = hotelData.filter((hotel) => {
      const name = hotel.hotelName?.toLowerCase() || "";
      const city = hotel.hotelLocation?.toLowerCase() || "";
      const des = hotel.hotelDescription?.toLowerCase() || "";

      return (
        name.includes(term) ||
        city.includes(term) ||
        des.includes(term)
      );
    });

    setFilteredData(filtered);
  }, [searchTerm, hotelData]);

  return (
    <div className="hotels-container">
      <input
        type="text"
        className="hotel-search"
        placeholder="Search by name, city or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <HotelCard hotelData={filteredData} />
    </div>
  );
};

export default Hotels;
