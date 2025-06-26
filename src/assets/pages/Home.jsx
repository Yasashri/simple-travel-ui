import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { FlightCard } from "../components";
import axios from "axios";
import { URLS } from "../../config/constant";

const Home = () => {
  const [flightData, setFlightData] = useState([]);
  useEffect(() => {
    const getHomeData = async () => {
      try {
        const response = await axios.get(URLS.homePageData);
        console.log(response.data.flights);
        setFlightData(response.data.flights);
      } catch (err) {
        console.error("Error getting homepage data", err);
      }
    };
    getHomeData();
  }, []);
  return (
    <div className='home'>
      <div className='home__header'>
        <h1 className='home__header__title'>
          Stay. Fly. Ride. Your Journey, One Click Away.
        </h1>
        <h3 className='home__header__subtitle'>
          "Easily fnd and book the perfect stay, fight, or ride — from cozy
          homestays to quick airport cabs, <br /> we bring your entire journey together
          in one smart, seamless platform."
        </h3>
      </div>
      <div className='home__search'>
        <div className='home__search__container'>
          <input
            type='text'
            name=''
            id=''
            placeholder='Where are you planning to go?'
          />
          <button>Search</button>
        </div>
      </div>
      <div className='home__information'>
        <div className='home__information__flights'>
          <h2>Latest Flights (<a href="/">See all</a>)</h2>
          <FlightCard flightData={flightData} />
        </div>
        <div className='home__information__hotels'>
          <h2>Best Hotels (<a href="/">See all</a>)</h2>
          <FlightCard flightData={flightData} />
        </div>
        <div className='home__information__vehicles'>
          <h2>Vehicles for Hire (<a href="/">See all</a>)</h2>
          <FlightCard flightData={flightData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
