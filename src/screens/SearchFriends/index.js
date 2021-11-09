import { FiArrowLeft, FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from "react";

import Avatar from "boring-avatars";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

//import Friends from "../Friends";



const SearchFriends = () => {
  const URL_API_BAND = "https://band-app-back.herokuapp.com/users";
  let latlng;
  let latitude;
  let longitude;

  // const dataFriends = [
  //   {
  //     id: 1,
  //     email: "f@f.com",
  //     name: "Jorge Sayago",
  //     instruments: ["Piano", "Drums"],
  //     expanded: false,
  //     city: "Buenos Aires",
  //   },
  //   {
  //     id: 2,
  //     email: "a@a.com",
  //     name: "Federick Bustamante",
  //     instruments: ["Flauta", "Piano"],
  //     expanded: false,
  //     city: "Buenos",
  //   },
  //   {
  //     id: 3,
  //     email: "i@i.com",
  //     name: "Isabel Sayago",
  //     instruments: ["Violin", "Guitar"],
  //     expanded: false,
  //     city: "Argentina",
  //   },
  //   {
  //     id: 4,
  //     email: "d@d.com",
  //     name: "Fernanda Bustamante",
  //     instruments: ["Piano"],
  //     expanded: false,
  //     city: "New York",
  //   },
  //   {
  //     id: 5,
  //     email: "m@m.com",
  //     name: "Sayago Bustamante",
  //     instruments: ["Violin", "Piano", "Bass"],
  //     expanded: false,
  //     city: "Boston",
  //   },
  //   {
  //     id: 6,
  //     email: "z@z.com",
  //     name: "Bustamante Isabel",
  //     instruments: ["Violin", "Piano", "Guitar"],
  //     expanded: false,
  //     city: "Madrid",
  //   },
  //   {
  //     id: 7,
  //     email: "y@y.com",
  //     firstname: "Maria Bustamante",
  //     instruments: ["Bass", "Piano"],
  //     expanded: false,
  //     city: "Barcelona",
  //   },
  // ];

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
      let response = await fetch(URL_API_BAND);
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
    console.log(email);
    console.log("Clicking...");
    console.log(friends);

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

  const addToFriends = (email) => {};

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
              // .filter(
              //   (friend) =>
              //     (friend.data.city
              //       .toLowerCase()
              //       .includes(filterCity.toLowerCase()) ||
              //       filterCity === "") &&
              //     (friend["data"]["instruments"].includes(filterInstrument) ||
              //       filterInstrument === "")
              // )
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
                        onClick={() => addToFriends(friend.data.email)}
                      >
                        Add to Friends
                      </button>
                      <button type="button" className="addToGroupButton">
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
