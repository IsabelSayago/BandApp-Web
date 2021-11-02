import React from "react";

const DetailsReunions = ({ details, setDetails }) => {
  return <div>{details ? <div className="detailsReunion"></div> : ""}</div>;
};

export default DetailsReunions;
