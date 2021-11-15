import React, { useContext, useEffect, useState } from "react";

import Burger from "../../components/Burger";
import ButtonReunions from "../../components/ButtonReunions";
import DetailsReunions from "../../components/DetailsReunions";
import GlobalContext from "../../contexts/global";
import Menu from "../../components/Menu";
import logo from "../../assets/logo.png";

const Welcome = () => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const { authData, setAuthData } = useContext(GlobalContext);
  const active = true;

  useEffect(() => {
    console.log(authData);
  }, []);

  return (
    <div className="background">
      <div className="burgerMenu">
        <Menu open={open} setOpen={setOpen} welcome={true} />
        <Burger open={open} setOpen={setOpen} />
      </div>
      <div
        className="welcomePicture"
        style={{
          backgroundImage: `url(${logo})`,
        }}
      />
      <div className="reunionContainer">
        <ButtonReunions
          active={active}
          details={details}
          setDetails={setDetails}
        />
        <DetailsReunions
          active={active}
          details={details}
          setDetails={setDetails}
        />
      </div>
    </div>
  );
};

export default Welcome;
