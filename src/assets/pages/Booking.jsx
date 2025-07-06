import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Booking.css";
import { URLS } from "../../config/constant";
import moment from "moment";

const useQuery = () => new URLSearchParams(useLocation().search);

const Booking = () => {
  const query = useQuery();
  const userId = query.get("user_id");
  const [userBookings, setUserBookings] = useState([]);

  console.log("userId", userId);

  useEffect(() => {
    fetchUserBookings();
  }, [userId]);

  const fetchUserBookings = async () => {
    try {
      /* const res = await axios.get(`${URLS.userBookings}?userId=${userId}`);
 */
const res = await axios.get(`${URLS.userBookings}/user?userId=${userId}`);
      setUserBookings(res.data);

      /* if (res.data.length > 0) {
        setUserInfo(res.data[0].bookedUserId);
      } */
    } catch (err) {
      console.error("Failed to fetch user bookings:", err);
    }
  };

  const handleDelete = async (bookingId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://127.0.0.1:3000/api/bookings/${bookingId}`);
      setUserBookings(userBookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };
  console.log("userBookings", userBookings);
  return (
    <div className='booking-container'>
      <h2>Your bookings</h2>
      {userBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className='booking-list'>
          {userBookings.map((booking) => (
            <div key={booking._id} className='booking-card'>
              {booking.bookedFlightId && (
                <div className='flights'>
                  <strong>Flight</strong>{" "}
                  <span>Destination: {booking.bookedFlightId.flightEnd}</span>
                  <span>
                    Date: {moment(booking.flightDate).format("YYYY-MM-DD")}
                  </span>
                  <span>Time: {moment(booking.flightTime, "HH:mm").format("hh:mm A")}</span>
                  <span>Class: {booking.flightClass}</span>
                  <span>Tickets: ${booking.flightTotalPrice}</span>
                </div>
              )}
              {booking.bookedHotelId && (
                <div className='hotels'>
                  <strong>Hotel</strong>
                  <span>{booking.bookedHotelId.hotelName}</span>
                  <span>Location: {booking.bookedHotelId.hotelLocation}</span>
                  <span>Date: {moment(booking.hotelDate).format("YYYY-MM-DD")}</span>
                  <span>Booked for {booking.hotelDays} {booking.hotelDays>1?"days" : "day"}.</span>
                  <span>Price: ${booking.hotelTotalPrice}</span>
                </div>
              )}
              {booking.bookedVehicleId && (
                <div className='vehicles'>
                  <strong>Vehicle</strong>
                  <span>Re no: {booking.bookedVehicleId.vehicleNo}</span>
                  <span>Type: {booking.bookedVehicleId.vehicleModel}</span>
                  <span>Date: {moment(booking.vehicleBookedDate).format("YYYY-MM-DD")}</span>
                  <span>Time: {moment(booking.vehicleBookedTime, "HH:mm").format("hh:mm A")}</span>
                  <span>Price: ${booking.vehicleBookedTotalPrice}</span>
                </div>
              )}
              <button
                className='delete-button'
                onClick={() => handleDelete(booking._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booking;
