import "./index.css";

import { FiArrowLeft, FiEdit3, FiPlusCircle } from "react-icons/fi";
import React, { useContext, useEffect, useState } from "react";

import GlobalContext from "../../contexts/global";
import { object } from "yup";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

const Profile = () => {
  const URL_API_BAND = "https://band-app-back.herokuapp.com/users";

  const { authData } = useContext(GlobalContext);

  // JSON.parse(authData).firstname
  const [userName, setUserName] = useState("Isabel Sayago");

  // JSON.parse(authData).bio
  const [bio, setBio] = useState("La bio");

  const [enable, setEnable] = useState(true);

  // JSON.parse(authData).password
  const [password, setPassword] = useState("password");

  const [confirmPassword, setConfirmPassword] = useState("password");

  // Pasarle los instrumentos del usuario JSON.parse(authData).instruments

  const instruments = [
    { id: 1, name: "Guitar", active: false },
    { id: 2, name: "Bass Guitar", active: true },
    { id: 3, name: "Drums", active: true },
    { id: 4, name: "Guitar2", active: true },
    { id: 5, name: "Drums", active: true },
  ];
  const [selectInstruments, setSelectInstruments] = useState(instruments);

  // Usar el mail del objeto
  const [email, setEmail] = useState("i@i.com");

  // JSON.parse(authData).city
  const [city, setCity] = useState("Buenos Aires");

  let history = useHistory();

  function changeState(id) {
    const newArrayInstruments = [...selectInstruments];
    const newArray = newArrayInstruments.map((obj) =>
      obj.id === id ? { ...obj, active: !obj["active"] } : obj
    );
    setSelectInstruments(newArray);
  }

  const redirectTo = (screen) => {
    return history.push(screen);
  };

  const addNewInstrument = () => {
    let input = prompt("Type new instrument");
    setSelectInstruments((prev) => [
      ...prev,
      { id: uuidv4(), name: input, active: true },
    ]);
  };

  const enableEdition = () => {
    return setEnable((prev) => !prev);
  };

  const saveChanges = async () => {
    if (password === confirmPassword && window.confirm("Sure?")) {
      const response = await fetch(URL_API_BAND, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).catch((err) => {
        if (err & err.message) {
          console.log(err.message);
        }
      });

      console.log(response);

      if (response.ok) {
        // const res = await response.json();
        // saveLocalStorage(res);
        // console.log(res);
        // setAuthData(res);
        // setAuthenticated(true);
        alert("Successfully updated!");
      } else {
        alert("Email is being used.");
      }
      // actions.resetForm();

      return redirectTo("/welcome");
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="background">
      <div className="arrowLeft" onClick={() => redirectTo("/welcome")}>
        <FiArrowLeft style={{ height: "1.5rem", width: "1.5rem" }} />
      </div>
      <div className="editPencil" onClick={enableEdition}>
        <FiEdit3 style={{ height: "3rem", width: "3rem" }} />
      </div>
      <div className="profileBackground">
        <div className="name">
          <h5 style={{ color: "gray" }}>My Profile</h5>
          <h2>{userName}</h2>
          <div
            style={{
              width: "5rem",
              height: "0.02rem",
              backgroundColor: "black",
            }}
          />
          <h6>{city}</h6>
        </div>
        <div className="emailInstruments">
          <div className="emailPassword">
            <h6>{email}</h6>
            <div className="password">
              <input
                className="text"
                type="password"
                placeholder="Password"
                disabled={enable}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="text"
                type="password"
                placeholder="Confirm password"
                disabled={enable}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="instruments">
            <div className="instrumentsTitle">
              <h6>Instruments</h6>
              <button
                className="buttonAddInstrument"
                onClick={addNewInstrument}
              >
                <FiPlusCircle style={{ height: "1.5rem", width: "1.5rem" }} />
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
                      : {
                          backgroundColor: "white",
                          color: "#9c4848",
                          fontWeight: "bold",
                          border: "solid",
                          borderWidth: "0.1rem",
                          borderColor: "grey",
                        }
                  }
                  onClick={() => changeState(instrument.id)}
                >
                  {instrument.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bio">
          <textarea
            type="text"
            className="textBio"
            maxLength="300"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            disabled={enable}
          />
        </div>
        <div className="maxLengthText">Max length: 300 characters</div>
        <button type="submit" className="buttonProfile" onClick={saveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
