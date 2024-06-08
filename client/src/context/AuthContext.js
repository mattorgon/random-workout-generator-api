import React, { createContext, useState, useContext } from "react";
//import jwt from "jsonwebtoken";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");

  const signIn = (user, userID, token) => {
    //const decodedToken = jwt.decode(token);
    setIsSignedIn(true);
    setUserId(userID);
    setUserToken(token);
    setUsername(user);
    console.log(user);
  };

  const signOut = () => {
    setIsSignedIn(false);
    setUsername(null); // Reset username when signing out
  };

  return (
    <AuthContext.Provider
      value={{ isSignedIn, username, userId, userToken, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
