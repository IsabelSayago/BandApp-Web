import "./index.css";

import { FiArrowLeft, FiSearch } from "react-icons/fi";
import React, { useContext, useEffect, useState } from "react";

import Avatar from "boring-avatars";
import GlobalContext from "../../contexts/global";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

const Friends = () => {
  const { authData, setAuthData } = useContext(GlobalContext);

  let history = useHistory();

  const redirectTo = (screen) => {
    return history.push(screen);
  };

  const [friends, setFriends] = useState(authData.friends);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    setFriends(authData.friends);
    console.log(friends);
    // setFriends(authData.friends);
    console.log("friends empty", friends);
    console.log("user logged in", authData.friends);

    const fetchInfo = async (email) => {
      let response = await fetch(
        `https://band-app-back.herokuapp.com/users/${email}`
      );
      response = await response.json();
      return response;
    };

    const fetchData = async (data) => {
      data.map((element) => {
        let responseData = fetchInfo(element.email);
        // .then((data) =>
        console.log(data);

        console.log(responseData);
        //setFriendsList((prev) => [...prev, responseData]);
      });
    };

    // const fetchData = (data) => {
    //   data.map((element) => {
    //     fetchInfo(element.email).then((response) =>
    //       setFriends((prev) => [...prev, response])
    //     );
    //   });
    // };

    // authData.friends.map((element) => {
    //   fetchInfo(element.email).then((response) =>
    //     setFriends((prev) => [...prev, response])
    //   );
    // });
    console.log(authData.friends);
    fetchData(authData.friends);

    //console.log(updatingFriends);
    console.log(friends);
    console.log(friendsList);

    //setFriends(authData.friends);
    setAuthData({ ...authData, friends: friendsList });
    console.log(authData);
  }, []);

  function handleClick(email) {
    console.log(email);
    console.log("Clicking...");
    console.log(friends);

    const friendsUpdate = friends.map((obj) =>
      obj.email === email
        ? {
            ...obj,
            expanded: !obj.expanded,
          }
        : obj
    );

    setFriends(friendsUpdate);
    console.log(friends);
  }

  return (
    <div className="background">
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "1.5rem",
        }}
        onClick={() => redirectTo("/welcome")}
      >
        <FiArrowLeft style={{ width: "2rem", height: "2rem" }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
        }}
        onClick={() => alert("Searching...")}
      >
        <FiSearch style={{ width: "2rem", height: "2rem" }} />
      </div>
      <div className="friendsBackground">
        <div className="searchContainer">
          <h2
            style={{
              fontFamily: "Roboto",
              fontSize: "2rem",
              marginTop: "0rem",
              marginBottom: "1rem",
              alignSelf: "flex-start",
              marginLeft: "0.67rem",
            }}
          >
            Friends
          </h2>
          <div className="dataFiltered">
            {friends.length > 0 ? (
              friends.map((friend) => {
                return friend.expanded ? (
                  <div
                    className="friendExpanded"
                    onClick={() => handleClick(friend.email)}
                    key={uuidv4()}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Avatar
                        size={30}
                        name={friend.firstname}
                        variant="bauhaus"
                        colors={[
                          "#295264",
                          "#FAD9A6",
                          "#BD2F28",
                          "#89373D",
                          "#142433",
                        ]}
                      />
                      <div className="friendInformation">
                        {friend.firstname} | {friend.email} |{" "}
                        {friend.instruments &&
                          friend.instruments.map((instrument) => {
                            return (
                              <h6 style={{ margin: "0.2rem" }} key={uuidv4()}>
                                {instrument.name}
                              </h6>
                            );
                          })}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        type="button"
                        className="chatButton"
                        onClick={() => redirectTo("/chat")}
                      >
                        Chat
                      </button>
                      <button type="button" className="addToGroupButton">
                        Add to Group
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="friend"
                    onClick={() => handleClick(friend.email)}
                    key={uuidv4()}
                  >
                    <Avatar
                      size={30}
                      name={friend.firstname}
                      variant="bauhaus"
                      colors={[
                        "#295264",
                        "#FAD9A6",
                        "#BD2F28",
                        "#89373D",
                        "#142433",
                      ]}
                    />
                    <div className="friendInformation">
                      {friend.firstname} | {friend.email} |
                      {friend.instruments &&
                        friend.instruments.map((instrument) => {
                          return (
                            <h6 style={{ margin: "0.2rem" }} key={uuidv4()}>
                              {instrument.name}
                            </h6>
                          );
                        })}
                    </div>
                  </div>
                );
              })
            ) : (
              <h6
                style={{
                  fontFamily: "Roboto",
                  alignSelf: "center",
                  fontSize: "1rem",
                  justifyContent: "center",
                }}
              >
                - No friends added -
              </h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
