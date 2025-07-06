import React, { useState } from "react";
import "../styles/Card.css";
import moment from "moment";
import { sendBooking } from "../services/bookingService";
import Swal from "sweetalert2";

const FlightCard = ({ flightData }) => {
  const [visibility, setVisibility] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flightClass, setFlightClass] = useState("economy");
  const [seatCount, setSeatCount] = useState(1);
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  

  const cardClick = (flight) => {
    setSelectedFlight(flight);
    setDestination(flight.flightEnd);
    setVisibility(true);
    setDepartureDate(moment(flight.flightDate).format("YYYY-MM-DD"));
    setReturnDate("");
  };

  const closeModal = () => {
    setVisibility(false);
    setSelectedFlight(null);
    setFlightClass("economy");
    setSeatCount(1);
    setDepartureDate("");
    setReturnDate("");
    setShowPaymentModal(false);
    setCardNumber("");
    setCardName("");
    setExpiry("");
    setCvv("");
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

  const handleBooking = () => {
     const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return Swal.fire({
        icon: "info",
        title: "You are not logged in.",
        text: "You must be logged in to make a booking.",
        footer: '<a href="/login">Go to login?</a> <a href="/login"> Create account?</a>',
      });
    }

    if (!departureDate) {
      return Swal.fire({
        title: "Departure date?",
        text: "Don't you need date to fly?",
        icon: "question",
      });
    }

    if (returnDate && moment(returnDate).isBefore(departureDate)) {
      return Swal.fire("Return date cannot be before departure date!");
    }

    Swal.fire({
      title: "Are you sure?",
      text: `Proceed to payment for flight to ${destination}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowPaymentModal(true);
      }
    });
  };

  const submitPayment = () => {
    if (
      cardNumber.length < 13 ||
      !cardName ||
      !expiry.match(/^\d{2}\/\d{2}$/) ||
      cvv.length < 3
    ) {
      return Swal.fire(
        "Invalid Card",
        "Please fill out all card details properly.",
        "error"
      );
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return Swal.fire({
        icon: "info",
        title: "You are not logged in.",
        text: "You must be logged in to make a booking.",
        footer: '<a href=/login">Go to login?</a>',
      });
    }
    const bookingData = {
      bookedUserId: user._id,
      bookedFlightId: selectedFlight._id,
      flightNoOfSeats: seatCount,
      flightClass: flightClass,
      flightDate: departureDate,
      flighEnd: destination,
      flightReturn: returnDate,
      flightTime: moment(selectedFlight.flightDate).format("HH:mm"),
      flightTotalPrice: totalPrice,
      returnDate: returnDate || null,
    };

    sendBooking(bookingData);
    setShowPaymentModal(false);
    closeModal();

    Swal.fire(
      "Payment Successful",
      `Your flight to ${destination} has been booked.`,
      "success"
    );
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

      {/* Booking Modal */}
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

            <label>
              Departure Date:
              <input
                type='date'
                value={departureDate}
                min={moment().format("YYYY-MM-DD")}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </label>

            <label>
              Return Date (optional):
              <input
                type='date'
                value={returnDate}
                min={departureDate || moment().format("YYYY-MM-DD")}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </label>

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

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className='modal-overlay'>
          <div className='modal card-form'>
            <button
              className='modal-close'
              onClick={() => setShowPaymentModal(false)}
            >
              ×
            </button>
            <h2>Enter Payment Details</h2>

            <label>Card Number</label>
            <input
              type='text'
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
              }
              placeholder='1234 5678 9012 3456'
            />

            <label>Cardholder Name</label>
            <input
              type='text'
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder='John Doe'
            />

            <label>Expiry (MM/YY)</label>
            <input
              type='text'
              value={expiry}
              onChange={(e) =>
                setExpiry(e.target.value.replace(/[^\d/]/g, "").slice(0, 5))
              }
              placeholder='MM/YY'
            />

            <label>CVV</label>
            <input
              type='text'
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder='123'
            />

            <button className='book-now' onClick={submitPayment}>
              Pay ${totalPrice}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
