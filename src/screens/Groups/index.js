import { FiArrowLeft, FiSearch } from "react-icons/fi";
import React, { useState } from "react";

import Avatar from "boring-avatars";
import { useHistory } from "react-router";

const Groups = () => {
  let history = useHistory();

  const redirectTo = (screen) => {
    return history.push(screen);
  };

  const dataGroups = [
    {
      id: 1,
      name: "Grupo 1",
      instruments: ["Bass Guitar", "Guitar", "Drums", "Piano"],
      expanded: false,
      city: "Buenos Aires",
    },
    {
      id: 2,
      name: "Grupo 2",
      instruments: ["Bass Guitar", "Guitar", "Drums", "Piano"],
      expanded: false,
      city: "Buenos",
    },
    {
      id: 3,
      name: "Grupo 3",
      instruments: ["Bass Guitar", "Guitar", "Drums", "Piano"],
      expanded: false,
      city: "Argentina",
    },
    {
      id: 4,
      name: "Grupo 4",
      instruments: ["Bass Guitar", "Guitar", "Drums", "Piano"],
      expanded: false,
      city: "New York",
    },
    {
      id: 5,
      name: "Grupo 5",
      instruments: ["Bass Guitar", "Guitar", "Drums", "Piano"],
      expanded: false,
      city: "Boston",
    },
    {
      id: 6,
      name: "Grupo 6",
      instruments: ["Bass Guitar", "Guitar", "Drums", "Piano"],
      expanded: false,
      city: "Madrid",
    },
    {
      id: 7,
      name: "Grupo 7",
      instruments: ["Bass Guitar", "Guitar", "Drums", "Piano"],
      expanded: false,
      city: "Barcelona",
    },
  ];

  const [groups, setGroups] = useState(dataGroups);

  function handleClick(id) {
    const state = groups[id - 1]["expanded"];
    const filterGroup = { ...groups[id - 1], expanded: !state };
    setGroups(groups.map((item) => (item.id === id ? filterGroup : item)));
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
            Groups
          </h2>
          <div className="dataFiltered">
            {groups.map((group) => {
              return (
                <div
                  className={group.expanded ? "friendExpanded" : "friend"}
                  onClick={() => handleClick(group.id)}
                  key={group.id}
                >
                  <Avatar
                    size={50}
                    name={group.name}
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "0.5rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      {group.name} {group.city}
                    </div>
                    <div>
                      {group.instruments.map((instrument) => {
                        return instrument + " | ";
                      })}
                    </div>
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

export default Groups;
