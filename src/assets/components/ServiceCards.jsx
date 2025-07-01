import React from "react";
import "../styles/ServiceCards.css";
import { FaPlaneDeparture, FaHotel, FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ServiceCards = () => {
  const navigate = useNavigate();
  const services = [
    {
      icon: <FaPlaneDeparture className="service-card__icon" />,
      title: "Flights",
      description: "Discover and book flights to your next destination!",
      function: ()=>navigate("/flights"),
    },
    {
      icon: <FaHotel className="service-card__icon" />,
      title: "Hotels",
      description: "Find great deals on hotels for your stay!",
      function: ()=>navigate("/hotels"),
    },
    {
      icon: <FaCar className="service-card__icon" />,
      title: "Vehicles",
      description: "Rent cars for smooth rides wherever you go!",
      function: ()=>navigate("/vehicles"),
    },
  ];

  return (
    <div className="service-cards">
      {services.map((service, index) => (
        <div className="service-card" key={index} onClick={service.function}>
          {service.icon}
          <h3 className="service-card__title">{service.title}</h3>
          <p className="service-card__description">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
