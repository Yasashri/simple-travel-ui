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
import Swal from "sweetalert2";
import Loader from "../components/Loader";

const Home = () => {
  const [flightData, setFlightData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getHomeData = async () => {
      try {
        const response = await axios.get(URLS.homePageData);

        setFlightData(response.data.flights);
        setHotelData(response.data.hotels);
        setVehicleData(response.data.vehicles);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (err) {
        console.error("Error getting homepage data", err);
        setLoading(false);
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

        setFlightData(response.data.flights);
        setHotelData(response.data.hotels);
        setVehicleData(response.data.vehicles);
      } catch (error) {
        console.error("Search error", error);
      }
    } else {
      Swal.fire({
        icon: "warning",
        text: "Please enter search text",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='home'>
          <div className='home__header'>
            <h1 className='home__header__title'>
              Stay. Fly. Ride. Your Journey, One Click Away.
            </h1>
            <h3 className='home__header__subtitle'>
              "Easily fnd and book the perfect stay, fight, or ride — from cozy
              homestays to quick airport cabs, <br /> we bring your entire
              journey together in one smart, seamless platform."
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
                placeholder='Looking for a flight, hotel, or a cab?'
              />
              <button onClick={searchData}>Search</button>
            </div>
          </div>
          <div className='service'>
            <ServiceCards />
          </div>
          <div className='home__information'>
            <div className='home__information__flights'>
              {flightData.length === 0 || flightData == [] ? (
                <div className='placeholder'>
                  No matching search results for flights
                </div>
              ) : (
                <>
                  <h2>
                    Latest Flights
                  </h2>
                  <FlightCard flightData={flightData} />
                </>
              )}
            </div>
            <div className='home__information__hotels'>
              {hotelData.length === 0 || hotelData == [] ? (
                <div className='placeholder'>
                  No matching search results for hotels
                </div>
              ) : (
                <>
                  <h2>
                    Best Hotels
                  </h2>
                  <HotelCard hotelData={hotelData} />
                </>
              )}
            </div>
            <div className='home__information__vehicles'>
              {vehicleData.length === 0 || vehicleData == [] ? (
                <div className='placeholder'>
                  No matching search results for vehicles
                </div>
              ) : (
                <>
                  <h2>Available vehicles</h2>
                  <VehicleCard vehicleData={vehicleData} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
