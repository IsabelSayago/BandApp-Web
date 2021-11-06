import { FiArrowLeft, FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from "react";

import Avatar from "boring-avatars";
import { useHistory } from "react-router";

const SearchFriends = () => {
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
  });

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

    //LocationIQ
    /* fetch(`
https://us1.locationiq.com/v1/reverse.php?key=pk.9fd1cc136d3a193aaf0c9d7c7d3b77f0&lat=${lat}&lon=${lng}&format=json`)
      .then((response) => response.json())
      .then((data) => console.log(data)); */
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
                onChange={(event) => setFilterCity(event.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                className="filterInstrument"
                placeholder="Type instrument"
                value={filterInstrument}
                onChange={(event) => setFilterInstrument(event.target.value)}
              />
            </div>
          </div>
          <div className="dataFiltered">
            {friends
              .filter(
                (friend) =>
                  (friend.city
                    .toLowerCase()
                    .includes(filterCity.toLowerCase()) ||
                    filterCity === "") &&
                  (friend.instrument.includes(filterInstrument) ||
                    filterInstrument === "")
              )
              .map((friend) => {
                return (
                  <div
                    className={friend.expanded ? "friendExpanded" : "friend"}
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

export default SearchFriends;
