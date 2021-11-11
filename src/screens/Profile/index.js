import "./index.css";

import { FiArrowLeft, FiEdit3, FiPlusCircle } from "react-icons/fi";
import React, { useContext, useEffect, useState } from "react";

import GlobalContext from "../../contexts/global";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

const Profile = () => {
  const URL_API_BAND = "https://band-app-back.herokuapp.com/users";

  const { authData, setAuthData } = useContext(GlobalContext);

  const [userName, setUserName] = useState(authData.firstname);

  const [bio, setBio] = useState(authData.bio);

  const [enable, setEnable] = useState(true);

  const [password, setPassword] = useState(authData.password);

  const [confirmPassword, setConfirmPassword] = useState(authData.password);

  const [email, setEmail] = useState(authData.email);

  const [city, setCity] = useState(authData.city);

  const [selectInstruments, setSelectInstruments] = useState(
    authData.instruments
  );

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
    let response;
    if (password === confirmPassword && window.confirm("Sure?")) {
      response = await fetch(URL_API_BAND, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: userName,
          email: email,
          password: password,
          bio: bio,
          city: city,
          instruments: selectInstruments,
        }),
      }).catch((err) => {
        if (err & err.message) {
          console.log(err.message);
        }
      });

      console.log(response);

      if (response.ok) {
        const res = await response.json();

        console.log(res);
        console.log(authData);
        setAuthData({ ...res });
        localStorage.setItem("userData", JSON.stringify(res));
        console.log(localStorage.getItem("userData"));
        alert("Successfully updated!");
      } else {
        alert("Not updated");
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
          <input
            type="text"
            disabled={enable}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              fontFamily: "Roboto",
              marginTop: "1rem",
              backgroundColor: enable ? "lightgray" : "white",
              fontSize: "1rem",
              width: "10rem",
              borderWidth: "0.05rem",
            }}
          />
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
