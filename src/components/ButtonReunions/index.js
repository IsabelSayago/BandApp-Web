import "../../index.css";

import React from "react";

const ButtonReunions = ({ active, details, setDetails }) => {
  return (
    <>
      <button
        type="button"
        className="reunionsButton"
        onClick={() => setDetails(!details)}
      >
        {active ? (
          <div className="circleGreen"></div>
        ) : (
          <div className="circleRed"></div>
        )}

        {active ? "Upcoming" : "No upcoming"}
      </button>
    </>
  );
};

export default ButtonReunions;
