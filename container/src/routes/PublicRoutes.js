import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ isSignedIn, children }) => {
  return isSignedIn ? <Navigate to="/" /> : children;
};

export default PublicRoutes;
