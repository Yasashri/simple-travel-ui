import React from "react";
import "../styles/Card.css";
import moment from "moment";

const FlightCard = ({ flightData }) => {
  return (
    <div className='card'>
      {flightData.map((item) => {
        return (
          <div className='card__data' key={item._id}>
            <div
              className='card__data__image'
              style={{ backgroundImage: `url(${item.flightImage})` }}
            >
              {/* <img src={item.flightImage} alt='Flight image' /> */}
            </div>
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
        );
      })}
    </div>
  );
};

export default FlightCard;
