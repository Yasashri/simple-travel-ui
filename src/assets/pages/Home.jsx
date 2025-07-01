import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import {
  FlightCard,
  HotelCard,
  VehicleCard,
  ServiceCards,
} from "../components";
import axios from "axios";
import { URLS } from "../../config/constant";

const Home = () => {
  const [flightData, setFlightData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  useEffect(() => {
    const getHomeData = async () => {
      try {
        const response = await axios.get(URLS.homePageData);
        console.log(response.data.flights);
        setFlightData(response.data.flights);
        setHotelData(response.data.hotels);
        setVehicleData(response.data.vehicles);
      } catch (err) {
        console.error("Error getting homepage data", err);
      }
    };
    getHomeData();
  }, []);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setsearchQuery(e.target.value);
  };

  const searchData = async () => {
    const search = {
      search: searchQuery,
    };
    if (searchQuery != []) {
      try {
        const response = await axios.post(URLS.searchHomeData, search);
        console.log(response.data);
        setFlightData(response.data.flights);
      } catch (error) {
        console.error("Search error", error);
      }
    } else {
      alert("Please enter search information");
    }
  };
  return (
    <div className='home'>
      <div className='home__header'>
        <h1 className='home__header__title'>
          Stay. Fly. Ride. Your Journey, One Click Away.
        </h1>
        <h3 className='home__header__subtitle'>
          "Easily fnd and book the perfect stay, fight, or ride — from cozy
          homestays to quick airport cabs, <br /> we bring your entire journey
          together in one smart, seamless platform."
        </h3>
      </div>
      <div className='home__search'>
        <div className='home__search__container'>
          <input
            type='text'
            value={searchQuery}
            onChange={handleSearchInput}
            name=''
            id=''
            placeholder='Where are you planning to go?'
          />
          <button onClick={searchData}>Search</button>
        </div>
      </div>
      <div className='service'>
        <ServiceCards />
      </div>
      <div className='home__information'>
        <div className='home__information__flights'>
          <h2>
            Latest Flights (<a href='/'>See all</a>)
          </h2>
          {flightData.length === 0 || flightData == [] ? (
            <div className='placeholder'> No flight data found</div>
          ) : (
            <FlightCard flightData={flightData} />
          )}
        </div>
        <div className='home__information__hotels'>
          <h2>
            Best Hotels (<a href='/'>See all</a>)
          </h2>
          {hotelData.length === 0 || hotelData == [] ? (
            <div className='placeholder'> No Hotels found</div>
          ) : (
            <HotelCard hotelData={hotelData} />
          )}
        </div>
        <div className='home__information__vehicles'>
          <h2>
            Vehicles for Hire (<a href='/'>See all</a>)
          </h2>
          {vehicleData.length === 0 || vehicleData == [] ? (
            <div className='placeholder'> No flight data found</div>
          ) : (
            <VehicleCard vehicleData={vehicleData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
