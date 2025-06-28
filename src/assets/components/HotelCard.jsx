import React from "react";

const HotelCard = ({ hotelData }) => {
  return (
    <div className='card'>
      {hotelData.map((item) => {
        return (
          <div className='card__data' key={item._id}>
            <div
              className='card__data__image'
              style={{ backgroundImage: `url(${item.hotelImage[0]})` }}
            >
              {/* <img src={item.flightImage} alt='Flight image' /> */}
            </div>
            <div className='card__data__detailed'>
              <span>{item.hotelName}</span>

              <span>{item.hotelLocation}</span>
              <span>${item.hotelPrice} per day.</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotelCard;
