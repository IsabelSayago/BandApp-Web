import React from "react";

const DetailsReunions = ({ active, details, setDetails }) => {
  const members = ["Joss Stone", "Paolo Nutini", "Angele"];

  return (
    <div>
      {details && active ? (
        <div className="detailsReunion">
          <h6
            style={{
              fontSize: "1rem",
              fontFamily: "Roboto, sans-serif",
              fontWeight: "200",
              marginTop: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            Buenos Aires
          </h6>
          {members.map((member) => {
            return (
              <h6
                key={member.length}
                style={{
                  fontSize: "1rem",
                  marginTop: "0.2rem",
                  marginBottom: "0.2rem",
                  color: "#9e6d6d",
                }}
              >
                {member}
              </h6>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DetailsReunions;
