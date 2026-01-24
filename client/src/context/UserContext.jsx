

// ...existing code...
import React, { createContext, useState } from "react";

// provide a safe default so useContext(...) never returns undefined
export const UserDataContext = createContext({
  user: {
    email: "",
    Username: "",
    City: "",
    State: "",
    phone: "",
    password: "",
    otp: "",
  },
  setUser: () => {},
});

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    Username: "",
    City: "",
    State: "",
    phone: "",
    password: "",
    otp: "",
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
// ...existing code...
