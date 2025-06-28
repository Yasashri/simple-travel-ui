import React from "react";

const VehicleCard = ({ vehicleData }) => {
  return (
    <div className='card'>
      {vehicleData.map((item) => {
        return (
          <div className='card__data' key={item._id}>
            <div
              className='card__data__image'
              style={{ backgroundImage: `url(${item.vehicleImage})` }}
            ></div>
            <div className='card__data__detailed'>
              <span>{item.VehicleNo}</span>

              <span>{item.vehicleDriver}</span>

              <span>+{item.vehicleContact}</span>
              <span>${item.vehicleBasePrice} per 1km</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleCard;
