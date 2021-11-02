import "../../index.css";
import "../Home/index.css";

import { Button, Container, InnerContainer, LinkStyle } from "../../styles";
import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";

import Burger from "../../components/Burger";
import Login from "../Login";
import Menu from "../../components/Menu";
import logo from "../../assets/logo.png";

const Home = () => {
  const login = "Log In";
  const forgotPassword = "Forgot your password?";
  const haveAccount = "Don't have an account?";
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const redirectTo = (screen) => {
    history.push(screen);
  };

  return (
    <Router>
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
              className="homePicture"
              style={{
                backgroundImage: `url(${logo})`,
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
                <Button onClick={() => redirectTo("/login")}>{login}</Button>

                <Button
                  onClick={() => alert("Google Sign In")}
                  google={"true"}
                ></Button>
              </InnerContainer>
              <InnerContainer align="center">
                <LinkStyle onClick={() => redirectTo("/recovery")}>
                  {forgotPassword}
                </LinkStyle>
                <hr
                  style={{
                    background: "white",
                    height: "1px",
                    width: "20%",
                    marginBottom: "1px",
                    border: "none",
                  }}
                />
                <LinkStyle onClick={() => redirectTo("/signup")}>
                  {haveAccount}
                </LinkStyle>
              </InnerContainer>
            </div>
          </Container>
        </div>
      </>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default Home;
