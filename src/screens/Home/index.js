import "../../index.css";
import "../Home/index.css";

import { Button, Container, InnerContainer, LinkStyle } from "../../styles";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React, { useContext, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";

import Burger from "../../components/Burger";
import GlobalContext from "../../contexts/global";
import Login from "../Login";
import Menu from "../../components/Menu";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import logo from "../../assets/logo.png";

const Home = () => {
  const { setAuthData, setAuthenticated } = useContext(GlobalContext);

  const login = "Log In";
  const forgotPassword = "Forgot your password?";
  const haveAccount = "Don't have an account?";
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const redirectTo = (screen) => {
    history.push(screen);
  };

  // const firebaseConfig = {
  //   apiKey: "AIzaSyCMsd0TqlVtLzbcZqZhScOuydTLUAQiK7Y",
  //   authDomain: "bandapp-607b4.firebaseapp.com",
  //   databaseURL: "https://bandapp-607b4-default-rtdb.firebaseio.com",
  //   projectId: "bandapp-607b4",
  //   storageBucket: "bandapp-607b4.appspot.com",
  //   messagingSenderId: "1022940869928",
  //   appId: "1:1022940869928:web:e83d9e6f1b0fbd16ac4c1d",
  //   measurementId: "G-RWNCEY2WVM",
  // };

  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  // const provider = new GoogleAuthProvider();

  // const auth = getAuth();

  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     console.log(user);

  //     setAuthenticated(true);
  //     console.log(user);
  //     localStorage.setItem("userData", JSON.stringify(user));
  //     setAuthData(user);

  //     alert("Welcome to BandApp!");
  //     redirectTo("/welcome");
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });

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
                  onClick={() => alert("Google")}
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
