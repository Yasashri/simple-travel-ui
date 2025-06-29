import React, { useState } from "react";
import "../styles/Card.css";
import moment from "moment";

const FlightCard = ({ flightData }) => {
  const [visibility, setVisibility] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flightClass, setFlightClass] = useState("economy");
  const [seatCount, setSeatCount] = useState(1);

  const cardClick = (flight) => {
    setSelectedFlight(flight);
    setVisibility(true);
  };

  const closeModal = () => {
    setVisibility(false);
    setSelectedFlight(null);
  };

  const getClassPrice = () => {
    if (!selectedFlight) return 0;
    const base = selectedFlight.flightBasePrice || 0;
    switch (flightClass) {
      case "business":
        return base + 300;
      case "luxury":
        return base + 800;
      default:
        return base;
    }
  };

  const pricePerSeat = getClassPrice();
  const totalPrice = pricePerSeat * seatCount;

  return (
    <div className='card'>
      {flightData.map((item) => (
        <div
          className='card__data'
          key={item._id}
          onClick={() => cardClick(item)}
        >
          <div
            className='card__data__image'
            style={{ backgroundImage: `url(${item.flightImage})` }}
          ></div>
          <div className='card__data__detailed'>
            <span>{item.flightNo}</span>
            <div className='route'>
              <span>{item.flightStart}</span>
              <span> to </span>
              <span>{item.flightEnd}</span>
            </div>
            <span>{moment(item.flightDate).format("YYYY-MM-DD HH:mm")}</span>
          </div>
        </div>
      ))}
      {visibility && selectedFlight && (
        <div className='modal-overlay'>
          <div className='modal'>
            <button className='modal-close' onClick={closeModal}>
              ×
            </button>
            <h2>Book Flight: {selectedFlight.flightNo}</h2>
            <span>{selectedFlight.flightModel}</span>
            <p>
              From: {selectedFlight.flightStart} <br />
              To: {selectedFlight.flightEnd} <br />
              Date & Time:{" "}
              {moment(selectedFlight.flightDate).format("YYYY-MM-DD HH:mm")}
            </p>
            {/* Class selection */}
            <label>
              Select Class:
              <select
                value={flightClass}
                onChange={(e) => setFlightClass(e.target.value)}
              >
                <option value='economy'>Economy</option>
                <option value='business'>Business (+300)</option>
                <option value='luxury'>Luxury (+800)</option>
              </select>
            </label>

            {/* Seat selection */}
            <label>
              Number of Seats:
              <input
                type='number'
                min='1'
                max='10'
                value={seatCount}
                onChange={(e) => setSeatCount(Number(e.target.value))}
              />
            </label>

            {/* Price Display */}
            <p>
              Price per Seat: ${pricePerSeat} <br />
              Total Price: ${totalPrice}
            </p>
            <button className='book-now'>Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
