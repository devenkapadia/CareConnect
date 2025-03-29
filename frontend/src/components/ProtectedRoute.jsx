import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = Cookies.get("token");
  const decoded = jwtDecode(token);
  if (!decoded) {
    console.log("here");
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(decoded.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
