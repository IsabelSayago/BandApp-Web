import React from "react";

const authData = {
  email: "",
  firstname: "",
  bio: "",
  friends: [],
  instruments: [],
};

export { authData };

export default React.createContext(authData);
