import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FlightCard } from "../components";
import { URLS } from "../../config/constant";

const Flights = () => {
  const [flightData, setFlightData] = useState([]);
  useEffect(() => {
    const getFlightData = async () => {
      try {
        const response = await axios.get(URLS.flightData);
        setFlightData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getFlightData();
  }, []);

  return <div>
    <FlightCard flightData={flightData}/>
  </div>;
};

export default Flights;
