import React, { useState } from "react";
import "../styles/Card.css";

const VehicleCard = ({ vehicleData }) => {
  const [visibility, setVisibility] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [travelDistance, setTravelDistance] = useState(1);

  const cardClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setVisibility(true);
  };

  const closeModal = () => {
    setVisibility(false);
    setSelectedVehicle(null);
    setTravelDistance(1);
  };

  const pricePerKm = selectedVehicle?.vehicleBasePrice || 0;
  const totalPrice = pricePerKm * travelDistance;

  return (
    <div className='card'>
      {vehicleData.map((item) => (
        <div
          className='card__data'
          key={item._id}
          onClick={() => cardClick(item)}
        >
          <div
            className='card__data__image'
            style={{ backgroundImage: `url(${item.vehicleImage})` }}
          ></div>
          <div className='card__data__detailed'>
            <span>{item.vehicleNo}</span>
            <span>{item.vehicleModel}</span>
            <span>${item.vehicleBasePrice} per km</span>
          </div>
        </div>
      ))}

      {visibility && selectedVehicle && (
        <div className='modal-overlay'>
          <div className='modal'>
            <button className='modal-close' onClick={closeModal}>
              ×
            </button>
            <h2>Book Vehicle: {selectedVehicle.VehicleNo}</h2>
            <p>Model: {selectedVehicle.vehicleModel}</p>
            <p>Driver: {selectedVehicle.vehicleDriver}</p>
            <p>Contact: +{selectedVehicle.vehicleContact}</p>

            {/* Travel Distance Selection */}
            <label>
              Distance to Travel (km):
              <input
                type='number'
                min='1'
                max='1000'
                value={travelDistance}
                onChange={(e) => setTravelDistance(Number(e.target.value))}
              />
            </label>

            {/* Price Display */}
            <p>
              Price per km: ${pricePerKm} <br />
              Total Price: ${totalPrice}
            </p>
            <button className='book-now'>Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;
