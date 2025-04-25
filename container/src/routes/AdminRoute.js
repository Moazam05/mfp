import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ isSignedIn, children, userData }) => {
  // If user is not signed in, redirect to sign in page
  if (!isSignedIn) {
    return <Navigate to="/auth/signin" />;
  }

  // List of authorized admin emails
  const authorizedEmails = ["salman@gmail.com"];

  // Check if the user's email is in the authorized list
  const isAuthorized = userData && authorizedEmails.includes(userData.email);

  // If not authorized for admin, redirect to unauthorized page
  if (!isAuthorized) {
    return <Navigate to="/unauthorized" />;
  }

  // If signed in and authorized, render the children
  return children;
};

export default AdminRoute;
