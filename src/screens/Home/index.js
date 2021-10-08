import "../../index.css";

import { Button, Container, InnerContainer, Link } from "../../styles";
import React, { useContext, useState } from "react";

import Burger from "../../components/Burger";
import Menu from "../../components/Menu";
import logo from "../../assets/logo.png";

//import HamburgerMenu from "../../components/HamburgerMenu";

const Home = () => {
  const login = "Log In";
  const forgotPassword = "Forgot your password?";
  const haveAccount = "Don't have an account?";
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <Container>
          <div
            style={{
              display: "flex",
              flex: "2",
              justifyItems: "flex-start",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
          </div>

          <div
            style={{
              width: "120px",
              height: "120px",
              backgroundSize: "cover",
              backgroundImage: `url(${logo})`,
              alignSelf: "center",
              marginBottom: "10px",
            }}
          ></div>

          <div
            style={{
              alignItems: "center",
              justifyItems: "flex-end",
              flex: 1,
            }}
          >
            <InnerContainer>
              <Button
                onClick={() => window.location("src/screens/Login/index.js")}
              >
                {login}
              </Button>
              <Button
                onClick={() => alert("Google Sign In")}
                google={"true"}
              ></Button>
            </InnerContainer>
            <InnerContainer align="center">
              <Link onClick={() => alert("recover")}>{forgotPassword}</Link>
              <hr
                style={{
                  background: "white",
                  height: "1px",
                  width: "20%",
                  marginBottom: "1px",
                  border: "none",
                }}
              />
              <Link>{haveAccount}</Link>
            </InnerContainer>
          </div>
        </Container>
      </div>
    </>
  );

  {
    /* <Container>
      <div
        style={{
          display: "flex",
          flex: "2",
          justifyItems: "flex-start",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Burger />
      </div>
      
      <div
        style={{
          width: "120px",
          height: "120px",
          backgroundSize: "cover",
          backgroundImage: `url(${logo})`,
          alignSelf: "center",
          marginBottom: "10px",
        }}
      ></div>

      <div
        style={{
          alignItems: "center",
          justifyItems: "flex-end",
          flex: 1,
        }}
      >
        <InnerContainer>
          <Button onClick={() => alert("Redirecting to Log In")}>
            {login}
          </Button>
          <Button
            onClick={() => alert("Google Sign In")}
            google={"true"}
          ></Button>
        </InnerContainer>
        <InnerContainer align="center">
          <Link onClick={() => alert("recover")}>{forgotPassword}</Link>
          <hr
            style={{
              background: "white",
              height: "1px",
              width: "20%",
              marginBottom: "1px",
              border: "none",
            }}
          />
          <Link>{haveAccount}</Link>
        </InnerContainer>
      </div>
    </Container> */
  }
};

export default Home;
