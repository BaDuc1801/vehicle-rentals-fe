import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import userService from "../Services/userService";

const PrivateRoute = () => {
  const isAuthenticated = userService.getAccessToken() !== null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;