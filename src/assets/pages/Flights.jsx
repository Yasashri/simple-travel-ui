import React, { useEffect, useState } from "react";
import axios from "axios";
import { FlightCard } from "../components";
import { URLS } from "../../config/constant";
import "../styles/Flights.css";

const Flights = () => {
  const [flightData, setFlightData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getFlightData = async () => {
      try {
        const response = await axios.get(URLS.flightData);
        setFlightData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getFlightData();
  }, []);

useEffect(() => {
  if (!searchTerm.trim()) {
    setFilteredData(flightData);
    return;
  }

  const term = searchTerm.trim().toLowerCase();

  const filtered = flightData.filter((flight) => {
    const name = flight.flightNo?.toLowerCase() || "";
    const origin = flight.flightStart?.toLowerCase() || "";
    const destination = flight.flightEnd?.toLowerCase() || "";

    return (
      name.includes(term) ||
      origin.includes(term) ||
      destination.includes(term)
    );
  });

  setFilteredData(filtered);
}, [searchTerm, flightData]);


  return (
    <div className='flights-container'>
      <input
        type='text'
        className='flight-search'
        placeholder='Search by name, origin or destination'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FlightCard flightData={filteredData} />
    </div>
  );
};

export default Flights;
