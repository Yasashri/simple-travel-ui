import React from "react";
import Lottie from "lottie-react";
import animationData from "../Animations/loader.json";
import { ImTextColor } from "react-icons/im";

const Loader = () => {
  return (
    <div style={styles.container}>
      <span style={styles.title}>Smart Travel Companion</span>
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

export default Loader;
