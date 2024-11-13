import React, { createContext, useState } from "react";

// Create the context
export const AccountContext = createContext();

// Create a provider component
export const AccountProvider = ({ children }) => {
  const [active, setActive] = useState("signin");

  const switchToSignup = () => setActive("signup");
  const switchToSignin = () => setActive("signin");

  return (
    <AccountContext.Provider value={{ switchToSignup, switchToSignin, active }}>
      {children}
    </AccountContext.Provider>
  );
};
