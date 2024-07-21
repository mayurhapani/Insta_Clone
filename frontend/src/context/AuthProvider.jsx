import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myPostId, setMyPostId] = useState("");
  // const [viewMyPost, setViewMyPost] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, myPostId, setMyPostId }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
