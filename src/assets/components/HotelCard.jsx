import React, { useState } from "react";
import "../styles/Card.css";

const HotelCard = ({ hotelData }) => {
  const [visibility, setVisibility] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [roomType, setRoomType] = useState("standard");
  const [stayDays, setStayDays] = useState(1);

  const cardClick = (hotel) => {
    setSelectedHotel(hotel);
    setVisibility(true);
  };

  const closeModal = () => {
    setVisibility(false);
    setSelectedHotel(null);
    setRoomType("standard");
    setStayDays(1);
  };

  const getRoomPrice = () => {
    if (!selectedHotel) return 0;
    const base = selectedHotel.hotelPrice || 0;
    switch (roomType) {
      case "deluxe":
        return base + 50;
      case "suite":
        return base + 150;
      default:
        return base;
    }
  };

  const pricePerDay = getRoomPrice();
  const totalPrice = pricePerDay * stayDays;

  return (
    <div className='card'>
      {hotelData.map((item) => (
        <div
          className='card__data'
          key={item._id}
          onClick={() => cardClick(item)}
        >
          <div
            className='card__data__image'
            style={{ backgroundImage: `url(${item.hotelImage[0]})` }}
          ></div>
          <div className='card__data__detailed'>
            <span>{item.hotelName}</span>
            <span>{item.hotelLocation}</span>
            <span>${item.hotelPrice} per day</span>
          </div>
        </div>
      ))}

      {visibility && selectedHotel && (
        <div className='modal-overlay'>
          <div className='modal'>
            <button className='modal-close' onClick={closeModal}>
              ×
            </button>
            <h2>Book Hotel: {selectedHotel.hotelName}</h2>
            <p>Location: {selectedHotel.hotelLocation}</p>

            {/* Room Type Selection */}
            <label>
              Select Room Type:
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value='standard'>Standard</option>
                <option value='deluxe'>Deluxe (+50)</option>
                <option value='suite'>Suite (+150)</option>
              </select>
            </label>

            {/* Stay Duration Selection */}
            <label>
              Number of Days:
              <input
                type='number'
                min='1'
                max='30'
                value={stayDays}
                onChange={(e) => setStayDays(Number(e.target.value))}
              />
            </label>

            {/* Price Display */}
            <p>
              Price per Day: ${pricePerDay} <br />
              Total Price: ${totalPrice}
            </p>
            <button className='book-now'>Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelCard;
