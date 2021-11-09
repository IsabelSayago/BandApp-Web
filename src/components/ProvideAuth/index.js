import React, { useContext } from "react";
import { Redirect, Route } from "react-router";

import GlobalContext from "../../contexts/global";

const PrivateRoute = ({ children, ...rest }) => {
  const { authenticated } = useContext(GlobalContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const PublicRoute = ({ children, ...rest }) => {
  const { authenticated } = useContext(GlobalContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          <Redirect to={{ pathname: "/welcome", state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  );
};

export { PrivateRoute, PublicRoute };
