import { FiArrowLeft, FiEdit3, FiPlusCircle } from "react-icons/fi";
import React, { useState } from "react";

import { useHistory } from "react-router";

const Profile = () => {
  const userName = "First Name";
  const userCurrentLocation = "City";
  const userEmail = "email@address.com";
  let history = useHistory();

  const instruments = [
    { id: 1, instrument: "Guitar", active: false },
    { id: 2, instrument: "Bass Guitar", active: true },
    { id: 3, instrument: "Drums", active: true },
    { id: 4, instrument: "Guitar2", active: true },
    { id: 5, instrument: "Drums", active: true },
  ];

  const [selectInstruments, setSelectInstruments] = useState(instruments);

  function changeState(id) {
    const state = selectInstruments[id - 1]["active"];
    const filtInst = { ...selectInstruments[id - 1], active: !state };
    setSelectInstruments(
      selectInstruments.map((item) => (item.id === id ? filtInst : item))
    );
  }

  const redirectTo = (screen) => {
    return history.push(screen);
  };

  const addNewInstrument = () => {
    let input = prompt("Type new instrument");
    setSelectInstruments((prev) => [
      ...prev,
      { id: 6, instrument: input, active: true },
    ]);
  };

  return (
    <div className="background">
      <div
        style={{
          position: "absolute",
          top: ".5rem",
          left: ".5rem",
        }}
        onClick={() => redirectTo("/welcome")}
      >
        <FiArrowLeft />
      </div>
      <div className="profileBackground">
        <div className="name">
          <h5>My Profile</h5>
          <h2>{userName}</h2>
          <div
            style={{
              width: "5rem",
              height: "0.02rem",
              backgroundColor: "black",
            }}
          />
          <h6>{userCurrentLocation}</h6>
        </div>
        <div className="emailInstruments">
          <div className="emailPassword">
            <h6>{userEmail}</h6>
            <input className="text" type="text" placeholder="Password" />
            <input
              className="text"
              type="text"
              placeholder="Confirm password"
            />
          </div>
          <div className="instruments">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h6>Instruments</h6>
              <button
                className="buttonAddInstrument"
                onClick={addNewInstrument}
              >
                <FiPlusCircle />
              </button>
            </div>
            <div className="selectedInstruments">
              {selectInstruments.map((instrument) => (
                <button
                  key={instrument.id}
                  className="activeInstrument"
                  style={
                    instrument.active
                      ? { backgroundColor: "#9c4848" }
                      : { backgroundColor: "white" }
                  }
                  onClick={() => changeState(instrument.id)}
                >
                  {instrument.instrument}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bio">
          <textarea type="text" className="textBio" maxLength="300" />
        </div>
        <div className="maxLengthText">Max length: 300 characters</div>
        <button
          type="submit"
          className="buttonProfile"
          onClick={() =>
            window.confirm("Sure?") ? redirectTo("/welcome") : ""
          }
        >
          Save Changes
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          right: "0.5rem",
          top: "0.5rem",
        }}
      >
        <FiEdit3 />
      </div>
    </div>
  );
};

export default Profile;
