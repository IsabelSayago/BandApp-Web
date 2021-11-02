import React, { createContext, useContext, useState } from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router";

const authContext = createContext();

const myAuth = {
  isAuthenticated: true,
  signin(cb) {
    myAuth.isAuthenticated = true;
    setTimeout(cb, 100); // simulando async
  },
  signout(cb) {
    myAuth.isAuthenticated = false;
    setTimeout(cb, 100); // simulando async
  },
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  let history = useHistory();
  const redirectTo = (screen) => {
    history.push(screen);
  };

  const signin = (cb) => {
    return myAuth.signin(() => {
      setUser((prev) => "user");
      console.log(user);
      cb();
      console.log(user);
      console.log(myAuth.isAuthenticated);
    });
  };

  const signout = (cb) => {
    return myAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
};

function useAuth() {
  return useContext(authContext);
}

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
}

function PublicRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          <Redirect to={{ pathname: "/welcome", state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  );
}

export { ProvideAuth, PrivateRoute, PublicRoute, useAuth, useProvideAuth };
