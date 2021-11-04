import React, { createContext, useContext, useState } from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router";

import GlobalContext from "../../contexts/global";

// const AuthContext = createContext(authUser);

// const myAuth = {
//   isAuthenticated: false,
//   signin(cb) {
//     myAuth.isAuthenticated = true;
//     // simulando async
//   },
//   signout(cb) {
//     myAuth.isAuthenticated = false;
//     setTimeout(cb, 100); // simulando async
//   },
// };

// const useProvideAuth = () => {
//   const [user, setUser] = useState({});

//   const signin = (cb) => {
//     return myAuth.signin(() => {
//       console.log(user);
//       setUser("Sayago");
//       localStorage.setItem("user", JSON.stringify(user));
//       console.log(user);
//       console.log(myAuth.isAuthenticated);
//     });
//   };

//   const signout = (cb) => {
//     return myAuth.signout(() => {
//       setUser(null);
//       cb();
//     });
//   };

//   return {
//     user,
//     setUser,
//   };
// };

// function useAuth() {
//   return useContext(AuthContext);
// }

// const ProvideAuth = ({ children }) => {
//   const auth = useProvideAuth();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };

// <Route path="/login" component={Login} />
const PrivateRoute = ({ children, ...rest }) => {
  const { authenticated } = useContext(GlobalContext);
  //const login = localStorage.getItem("userData");
  // let auth = useAuth();
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
  // let auth = useAuth();
  const { authenticated } = useContext(GlobalContext);
  // const login = localStorage.getItem("userData");
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

// export {
//   ProvideAuth,
//   PrivateRoute,
//   PublicRoute,
//   useAuth,
//   useProvideAuth,
//   AuthContext,
// };
