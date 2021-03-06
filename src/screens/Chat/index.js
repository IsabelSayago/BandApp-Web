import "./index.css";

import React, { useContext, useEffect, useState } from "react";

import Avatar from "boring-avatars";
import { FcRating } from "react-icons/fc";
import { FiArrowLeft } from "react-icons/fi";
import GlobalContext from "../../contexts/global";
import { useHistory } from "react-router";

//import Burger from "../../components/Burger";

const Chat = () => {
  let history = useHistory();
  const { authData, setAuthData } = useContext(GlobalContext);

  const redirectTo = (screen) => {
    return history.push(screen);
  };

  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(authData.selectedFriend);
  });

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

      <div className="chatTitle">Chat</div>

      <div className="chatBackground">
        <div className="chatContainer">
          <div className="friendDetails">
            <Avatar
              size={60}
              name={"Isabel"}
              variant="bauhaus"
              colors={["#295264", "#FAD9A6", "#BD2F28", "#89373D", "#142433"]}
            />
            <div className="details">
              <h3>{userName}</h3>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Instrument title={"Guitar"} />
                <Instrument title={"Bass"} />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h6>Gigs 3 | </h6>
                <h6> 4.8</h6>
                <FcRating />
                <FcRating />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "90%",
              borderRadius: "0.2rem",
            }}
          >
            <div className="chatMessages"></div>
            <input style={{ height: "3.5rem" }}></input>
            <button type="button" className="buttonSend">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Instrument = (props) => {
  const { title } = props;
  return (
    <div
      style={{
        backgroundColor: "#a15b5b",
        color: "white",
        borderRadius: "0.4rem",
        fontSize: "1rem",
        margin: "0.1rem",
        width: "5rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {title}
    </div>
  );
};

export default Chat;
