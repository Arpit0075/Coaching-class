import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const Token = createContext();

export const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState({ status: false, user: null });

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      let decoded = jwt_decode(token);
      setAuth({ status: true, user: decoded });
    } else {
      setAuth({ status: false, user: null });
    }
  }, []);

  return (
    <Token.Provider value={{ auth, setAuth }}> {children} </Token.Provider>
  );
};
