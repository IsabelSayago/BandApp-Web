import "./index.css";

import { FiArrowLeft, FiSearch } from "react-icons/fi";
import React, { useState } from "react";

import Avatar from "boring-avatars";
import { useHistory } from "react-router";

const Friends = () => {
  let history = useHistory();

  const redirectTo = (screen) => {
    return history.push(screen);
  };

  const dataFriends = [
    {
      id: 1,
      name: "Jorge",
      instrument: "Bass Guitar",
      expanded: false,
      city: "Buenos Aires",
    },
    {
      id: 2,
      name: "Federick",
      instrument: "Guitar",
      expanded: false,
      city: "Buenos",
    },
    {
      id: 3,
      name: "Isabel",
      instrument: "Bass Guitar",
      expanded: false,
      city: "Argentina",
    },
    {
      id: 4,
      name: "Fernanda",
      instrument: "Guitar",
      expanded: false,
      city: "New York",
    },
    {
      id: 5,
      name: "Sayago",
      instrument: "Drums",
      expanded: false,
      city: "Boston",
    },
    {
      id: 6,
      name: "Bustamante",
      instrument: "Violin",
      expanded: false,
      city: "Madrid",
    },
    {
      id: 7,
      name: "Maria",
      instrument: "Piano",
      expanded: false,
      city: "Barcelona",
    },
  ];

  const [friends, setFriends] = useState(dataFriends);

  function handleClick(id) {
    const state = friends[id - 1]["expanded"];
    const filterFriend = { ...friends[id - 1], expanded: !state };
    setFriends(friends.map((item) => (item.id === id ? filterFriend : item)));
  }

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
      <div
        style={{
          position: "absolute",
          top: ".5rem",
          right: ".5rem",
        }}
        onClick={() => alert("Searching...")}
      >
        <FiSearch />
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
            {friends.map((friend) => {
              return friend.expanded ? (
                <div
                  className="friendExpanded"
                  onClick={() => handleClick(friend.id)}
                  key={friend.id}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Avatar
                      size={30}
                      name={friend.name}
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
                      {friend.name} | {friend.city} | {friend.instrument}
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
                  onClick={() => handleClick(friend.id)}
                  key={friend.id}
                >
                  <Avatar
                    size={30}
                    name={friend.name}
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
                    {friend.name} | {friend.city} | {friend.instrument}
                  </div>
                </div>
              );
            })}
            {/* {friends.map((friend) => {
              return (
                <Friend
                  name={friend.name}
                  clicked={friend.expanded}
                  selected={handleClick(friend.id)}
                />
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
