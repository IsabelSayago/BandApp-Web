import React, { useEffect, useState } from "react";

const Geolocation = ({ friends, setFriends }) => {
  const [geoObject, setGeoObject] = useState(null);
  const [city, setCity] = useState("");
  const [latlng, setLatlng] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    console.log(latlng);
    getLocation();
  }, []);

  useEffect(() => {
    console.log(latlng);

    reverseCodeLocation();
  }, [latlng]);

  useEffect(() => {
    getCityFromGeoObject();
  }, [geoObject]);

  const getLocation = () => {
    let coords;

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by the browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          coords = position.coords.latitude + "," + position.coords.longitude;
          console.log(coords);
          setLatlng(coords);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const reverseCodeLocation = async () => {
    let response;
    console.log(latlng);

    if (latlng !== null) {
      response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&result_type=administrative_area_level_1&key=AIzaSyDyVQW9oSjLuHbjDiNRmgRHmixCOK2J-k4`
      );

      if (response.ok) {
        response = await response.json();
        console.log(response);
        setGeoObject(response);
      } else {
        console.log(response);
      }
    }
  };

  const filterLevel2 = (component) => {
    return component.types.includes("administrative_area_level_1");
  };

  const getCityFromGeoObject = () => {
    console.log(geoObject);
    if (geoObject !== null) {
      let filteredArray =
        geoObject.results[0].address_components.filter(filterLevel2);
      if (filteredArray.length) {
        setCity(filteredArray[0].long_name);

        console.log(filteredArray[0].long_name);
        console.log(city);
      }
    }
  };

  const filterFriendsByGeoLocation = () => {
    console.log(friends);
    let friendsWithFilter = friends.filter((a) => a.data.city.includes(city));

    console.log(friendsWithFilter);
    return setFriends(friendsWithFilter);
  };

  return (
    <button className="buttonMyLocation" onClick={filterFriendsByGeoLocation}>
      My Location
    </button>
  );
};

export default Geolocation;
