import React, { useState } from "react";
import "../styles/Card.css";
import moment from "moment";
import { sendBooking } from "../services/bookingService";

const FlightCard = ({ flightData }) => {
  const [visibility, setVisibility] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flightClass, setFlightClass] = useState("economy");
  const [seatCount, setSeatCount] = useState(1);

  // 👇 NEW state for dates
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const cardClick = (flight) => {
    setSelectedFlight(flight);
    setVisibility(true);
    setDepartureDate(moment(flight.flightDate).format("YYYY-MM-DD")); // default to flight date
    setReturnDate(""); // clear previous return date
  };

  const closeModal = () => {
    setVisibility(false);
    setSelectedFlight(null);
    setFlightClass("economy");
    setSeatCount(1);
    setDepartureDate("");
    setReturnDate("");
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

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user._id;
    if (!departureDate) return alert("Please select a departure date");

    if (returnDate && moment(returnDate).isBefore(departureDate)) {
      return alert("Return date cannot be before departure date");
    }

    const bookingData = {
      bookedUserId: user_id,
      bookedFlightId: selectedFlight._id,
      flightNoOfSeats: seatCount,
      flightClass: flightClass,
      flightDate: departureDate,
      flightReturn: returnDate,
      flightTime: moment(selectedFlight.flightDate).format("HH:mm"),
      flightTotalPrice: pricePerSeat * seatCount,

      // Optionally include return date if selected
      returnDate: returnDate || null,
    };

    try {
      await sendBooking(bookingData);
      alert("Booking successful!");
      closeModal();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book flight.");
    }
  };

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

      {/* 👇 Modal */}
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
              To: {selectedFlight.flightEnd}
            </p>

            {/* 👇 Departure Date */}
            <label>
              Departure Date:
              <input
                type='date'
                value={departureDate}
                min={moment().format("YYYY-MM-DD")}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </label>

            {/* 👇 Return Date */}
            <label>
              Return Date (optional):
              <input
                type='date'
                value={returnDate}
                min={departureDate || moment().format("YYYY-MM-DD")}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </label>

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

            <button className='book-now' onClick={handleBooking}>
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
