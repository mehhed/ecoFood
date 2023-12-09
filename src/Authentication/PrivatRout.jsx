import React, { useContext } from "react";
import { AuthContext } from "./Authentication";
import { Navigate, useLocation } from "react-router-dom";

const PrivatRout = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);
  if (currentUser) {
    return children;
  }
  return <Navigate state={location?.pathname} to={"/logIn"}></Navigate>;
};

export default PrivatRout;
