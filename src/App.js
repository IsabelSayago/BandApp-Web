import "./index.css";

import {
  PrivateRoute,
  ProvideAuth,
  PublicRoute,
  useAuth,
  useProvideAuth,
} from "./components/ProvideAuth";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import Chat from "./screens/Chat";
import Friends from "./screens/Friends";
import Groups from "./screens/Groups";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Recovery from "./screens/Recovery";
import SearchFriends from "./screens/SearchFriends";
import SignUp from "./screens/Signup";
import Welcome from "./screens/Welcome";

function App() {
  return (
    <ProvideAuth>
      <div>
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
      </div>
    </ProvideAuth>
  );
}

export default App;

// <Route path="/login" component={Login} />
// <Route path="/home" component={Home} />
// <Route path="/recovery" component={Recovery} />
// <Route path="/signup" component={SignUp} />
// <Route exact path="/" component={Home} />
// <Route path="*">
// </Route>
