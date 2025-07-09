import React, { useState } from "react";
import "../styles/Card.css";
import { sendBooking } from "../services/bookingService";
import Swal from "sweetalert2";

const VehicleCard = ({ vehicleData }) => {
  const [visibility, setVisibility] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [travelDistance, setTravelDistance] = useState(1);
  const [vehicleDate, setVehicleDate] = useState("");
  const [vehicleTime, setVehicleTime] = useState("");

  const cardClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setVisibility(true);
  };

  const closeModal = () => {
    setVisibility(false);
    setSelectedVehicle(null);
    setTravelDistance(1);
    setVehicleDate("");
    setVehicleTime("");
  };

  const pricePerKm = selectedVehicle?.vehicleBasePrice || 0;
  const totalPrice = pricePerKm * travelDistance;

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return Swal.fire({
        icon: "info",
        title: "You are not logged in.",
        text: "You must be logged in to make a booking.",
        footer:
          '<a href="/login">Go to login?</a> <a href="/create-user"> Create account?</a>',
      });
    }
    const user_id = user?._id;

    if (!vehicleDate || !vehicleTime) {
      return Swal.fire("Please select date and time");
    }

    const bookingData = {
      bookedUserId: user_id,
      bookedVehicleId: selectedVehicle._id,
      vehicleBookedDate: vehicleDate,
      vehicleBookedTime: vehicleTime,
      vehicleBookedTotalPrice: totalPrice,
    };

    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Payments will be done in person",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Book",
      }).then((result) => {
        if (result.isConfirmed) {
          sendBooking(bookingData);
          Swal.fire({
            title: "Booked!",
            text: "Your booking has been completed.",
            icon: "success",
          });
        }
      });

      closeModal();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book vehicle.");
    }
  };

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
            <h2>Book Vehicle: {selectedVehicle.vehicleNo}</h2>
            <div className='vehi-info'>
              <p>Model: {selectedVehicle.vehicleModel}</p>
              <p>Driver: {selectedVehicle.vehicleDriver}</p>
              <p>Contact: +{selectedVehicle.vehicleContact}</p>
            </div>
            {/* Travel Distance */}
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

            {/* Date Selector */}
            <label>
              Booking Date:
              <input
                type='date'
                value={vehicleDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setVehicleDate(e.target.value)}
              />
            </label>

            {/* Time Selector */}
            <label>
              Booking Time:
              <input
                type='time'
                value={vehicleTime}
                onChange={(e) => setVehicleTime(e.target.value)}
              />
            </label>

            {/* Price Display */}
            <p className='vehi-price'>
              Price per km: ${pricePerKm} <br />
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

export default VehicleCard;
