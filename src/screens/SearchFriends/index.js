import { FiArrowLeft, FiSearch } from "react-icons/fi";
import React, { useContext, useEffect, useState } from "react";

import Avatar from "boring-avatars";
import GlobalContext from "../../contexts/global";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

//import Friends from "../Friends";

const SearchFriends = () => {
  const { authData, setAuthData } = useContext(GlobalContext);

  const [userEmail, setUserEmail] = useState(authData.email);

  const URL_API = "https://band-app-back.herokuapp.com/users";
  const URL_API_UPDATE_FRIENDS =
    "https://band-app-back.herokuapp.com/users/friend";

  let latlng;
  let latitude;
  let longitude;

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by the browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          setLat(latitude);
          setLng(longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );

      console.log(lat);
      console.log(lng);
      latlng = lat + "," + lng;
      console.log(latlng);
    }
  }, []);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      let response = await fetch(URL_API);
      response = await response.json();
      console.log(response);
      setFriends(response);
      console.log(friends);
    }

    fetchFriends();
  }, []);

  let history = useHistory();

  const redirectTo = (screen) => {
    return history.push(screen);
  };

  function handleClick(email) {
    const friendsUpdate = friends.map((obj) =>
      obj.data.email === email
        ? {
            user: obj.user,
            data: { ...obj.data, expanded: !obj.data.expanded },
          }
        : obj
    );

    setFriends(friendsUpdate);
    console.log(friends);
  }

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [city, setCity] = useState(null);
  const [geoObject, setGeoObject] = useState(null);
  const [status, setStatus] = useState(null);
  const [filterCity, setFilterCity] = useState("");
  const [filterInstrument, setFilterInstrument] = useState("");

  const filterLevel2 = (component) => {
    return component.types.includes("administrative_area_level_1");
  };

  const getLocation = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&result_type=administrative_area_level_1&key=AIzaSyDyVQW9oSjLuHbjDiNRmgRHmixCOK2J-k4`
    )
      .then((response) => response.json())
      .then((data) => setGeoObject(data));
    if (geoObject !== null) {
      getCityFromGeoObject();
      filterFriendsData();
    }
  };

  const getCityFromGeoObject = () => {
    console.log(geoObject);
    let filteredArray;
    filteredArray =
      geoObject.results[0].address_components.filter(filterLevel2);
    if (filteredArray.length) {
      setCity(filteredArray[0].long_name);
      console.log(filteredArray[0].long_name);
      console.log(status);
    }
    return console.log(city);
  };

  const filterFriendsData = () => {
    console.log(friends);
    let friendsWithFilter = friends.filter((a) => a.city.includes(city));

    console.log(friendsWithFilter);
    return setFriends(friendsWithFilter);
  };

  const addToFriends = async (friendData) => {
    console.log(friendData.email);
    let response;
    response = await fetch(URL_API_UPDATE_FRIENDS, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        friend: {
          email: friendData.email,
          expanded: false,
        },
      }),
    }).catch((err) => {
      if (err & err.message) {
        console.log(err.message);
      }
    });

    if (response.ok) {
      // const userFriends = await response.json();
      // console.log(userFriends);
      let userDataUpdatedResponse = await fetch(
        `https://band-app-back.herokuapp.com/users/${userEmail}`
      );
      if (userDataUpdatedResponse.ok) {
        userDataUpdatedResponse = await userDataUpdatedResponse.json();
      }

      console.log(userDataUpdatedResponse.friends);

      const currentUser = JSON.parse(localStorage.getItem("userData"));
      console.log("current user in LocalStorage", currentUser);
      const updateUser = {
        ...currentUser,
        friends: userDataUpdatedResponse.friends,
      };

      console.log("user with friends", currentUser);

      localStorage.setItem("userData", JSON.stringify(updateUser));
      const userSession = localStorage.getItem("userData");
      console.log("new user in LS", userSession);
      setAuthData(JSON.parse(userSession));

      console.log(authData);
      alert("Friend added succesfully");
    }
  };

  return (
    <div className="background">
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
        }}
        onClick={() => redirectTo("/welcome")}
      >
        <FiArrowLeft style={{ height: "2rem", width: "2rem" }} />
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
          <div className="filterSearch">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button className="buttonMyLocation" onClick={getLocation}>
                My Location
              </button>
              <input
                type="text"
                className="inputCity"
                placeholder="Type a city"
                value={filterCity}
                onChange={(event) => {
                  console.log("clickingggg", event);

                  setFilterCity(event.target.value);
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                className="filterInstrument"
                placeholder="Type instrument [Guitar]"
                value={filterInstrument}
                onChange={(event) => setFilterInstrument(event.target.value)}
              />
            </div>
          </div>
          <div className="dataFiltered">
            {friends
              .filter((friend) => {
                return (
                  (friend.data.city
                    .toLowerCase()
                    .includes(filterCity.toLowerCase()) ||
                    filterCity === "") &&
                  friend.data.instruments.some(
                    (inst) =>
                      inst.name.includes(filterInstrument) ||
                      filterInstrument === ""
                  )
                );
              })
              .map((friend) => {
                return friend.data.expanded ? (
                  <div
                    className="friendExpanded"
                    onClick={() => handleClick(friend.data.email)}
                    key={friend.data.id}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Avatar
                        size={30}
                        name={friend.data.firstname}
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
                        {friend.data.firstname} | {friend.data.city} |{" "}
                        {friend.data.instruments ? (
                          friend.data.instruments.map((inst) => (
                            <div key={uuidv4()}>{inst.name}</div>
                          ))
                        ) : (
                          <h6>No instruments added</h6>
                        )}
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
                        onClick={() => addToFriends(friend.data)}
                      >
                        Add to Friends
                      </button>
                      <button
                        onClick={() => redirectTo("/chat")}
                        type="button"
                        className="addToGroupButton"
                      >
                        Chat
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="friend"
                    onClick={() => handleClick(friend.data.email)}
                    key={friend.data.id}
                  >
                    <Avatar
                      size={30}
                      name={friend.data.firstname}
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
                      <h6 style={{ margin: "0rem", fontSize: "0.7rem" }}>
                        {friend.data.firstname}
                      </h6>
                      <h6 style={{ margin: "0rem" }}>{friend.data.city}</h6>
                      {friend.data.instruments ? (
                        friend.data.instruments.map((inst) => (
                          <div key={uuidv4()}>{inst.name}</div>
                        ))
                      ) : (
                        <h6>No instruments added</h6>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFriends;
