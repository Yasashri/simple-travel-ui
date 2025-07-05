import React, { useState } from "react";
import "../styles/Card.css";
import { sendBooking } from "../services/bookingService";
import Swal from "sweetalert2";

const HotelCard = ({ hotelData }) => {
  const [visibility, setVisibility] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [roomType, setRoomType] = useState("standard");
  const [stayDays, setStayDays] = useState(1);
  const [hotelStartDate, setHotelStartDate] = useState("");

  const cardClick = (hotel) => {
    setSelectedHotel(hotel);
    setVisibility(true);
  };

  const closeModal = () => {
    setVisibility(false);
    setSelectedHotel(null);
    setRoomType("standard");
    setStayDays(1);
    setHotelStartDate("");
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

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return Swal.fire({
        icon: "info",
        title: "You are not logged in.",
        text: "You must be logged in to make a booking.",
        footer:
          '<a href="/login">Go to login?</a> <a href="/login"> Create account?</a>',
      });
    }
    const user_id = user._id;
    if (!hotelStartDate) return Swal.fire("Please select a reservation date");

    const bookingData = {
      bookedUserId: user_id,
      bookedHotelId: selectedHotel._id,
      hotelDate: hotelStartDate,
      hotelDays: stayDays,
      hotelTotalPrice: totalPrice,
    };

    try {
      Swal.fire({
        title: "Are you sure?",
        text: 'Payments will be done on site',
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Book",
      }).then((result) => {
        if (result.isConfirmed) {
          sendBooking(bookingData);
        }
      });
      closeModal();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book hotel.");
    }
  };

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

            {/* Stay Duration */}
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

            {/* Start Date */}
            <label>
              Start Date:
              <input
                type='date'
                value={hotelStartDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setHotelStartDate(e.target.value)}
              />
            </label>

            {/* Price Display */}
            <p>
              Price per Day: ${pricePerDay} <br />
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

export default HotelCard;
