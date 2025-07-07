import React from "react";
import Lottie from "lottie-react";
import animationData from "../Animations/booking.json";

const BookingLoader = () => {
  return (
    <div style={styles.container}>
      <span style={styles.title}>Loading your bookings</span>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "Black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    flexDirection: "column",
    opacity:0.9,
  },
  title:{
    color: "White",
    fontWeight: "Bold",
    marginBottom: "10px",
  }
};

export default BookingLoader;
