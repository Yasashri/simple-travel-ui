import axios from "axios";
import { URLS } from "../../config/constant";

export const sendBooking = async (bookingData) => {
  try {
    const response = await axios.post(URLS.userBookings, bookingData);
    return response.data;
  } catch (error) {
    console.error("Booking error:", error.response?.data || error.message);
    throw error;
  }
};
