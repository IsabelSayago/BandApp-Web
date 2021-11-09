import "./index.css";

import { PrivateRoute, PublicRoute } from "./components/ProvideAuth";
import React, { useEffect, useState } from "react";
import { Switch, useHistory } from "react-router-dom";

import Chat from "./screens/Chat";
import Friends from "./screens/Friends";
import GlobalContext from "./contexts/global";
import Groups from "./screens/Groups";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Recovery from "./screens/Recovery";
import SearchFriends from "./screens/SearchFriends";
import SignUp from "./screens/Signup";
import Welcome from "./screens/Welcome";

function App() {
  let history = useHistory();
  const redirectTo = (screen) => {
    history.push(screen);
  };

  const [authData, setAuthData] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  const applyLogout = () => {
    localStorage.clear();
    setAuthenticated(false);
    console.log(authenticated);
    redirectTo("/");
  };

  const checkUser = () => {
    const user = localStorage.getItem("userData");
    console.log(user);
    if (user) {
      setAuthenticated(true);
      setAuthData(user);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        authData,
        setAuthData,
        setAuthenticated,
        authenticated,
        applyLogout,
      }}
    >
      <Switch>
        <PrivateRoute path="/welcome">
          <Welcome />
        </PrivateRoute>
        <PrivateRoute path="/myprofile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/searchfriends">
          <SearchFriends />
        </PrivateRoute>
        <PrivateRoute path="/friends">
          <Friends />
        </PrivateRoute>
        <PrivateRoute path="/groups">
          <Groups />
        </PrivateRoute>
        <PrivateRoute path="/chat">
          <Chat />
        </PrivateRoute>
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute path="/home">
          <Home />
        </PublicRoute>
        <PublicRoute path="/recovery">
          <Recovery />
        </PublicRoute>
        <PublicRoute path="/signup">
          <SignUp />
        </PublicRoute>
        <PublicRoute exact path="/">
          <Home />
        </PublicRoute>
      </Switch>
    </GlobalContext.Provider>
  );
}

export default App;
