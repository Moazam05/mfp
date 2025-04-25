import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isSignedIn, children }) => {
  return isSignedIn ? children : <Navigate to="/auth/signin" />;
};

export default ProtectedRoutes;
