import React, { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import LoadingFallback from "./Loader/LoadingFallback";
import ErrorBoundary from "./ErrorBoundary";

// Import your microfrontend components
import AuthApp from "./AuthApp";
const MarketingApp = lazy(() => import("./MarketingApp"));
const DashboardApp = lazy(() => import("./DashboardApp"));

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state from localStorage if available
  const [isSignedIn, setIsSignedIn] = useState(() => {
    const storedAuthState = localStorage.getItem("loggedInUser");
    return storedAuthState ? JSON.parse(storedAuthState).isSignedIn : false;
  });

  const [userData, setUserData] = useState(() => {
    const storedAuthState = localStorage.getItem("loggedInUser");
    return storedAuthState ? JSON.parse(storedAuthState).userData : null;
  });

  // Redirect to home if user is already logged in and trying to access auth pages
  useEffect(() => {
    if (isSignedIn && location.pathname.startsWith("/auth")) {
      navigate("/");
    }
  }, [isSignedIn, navigate, location]);

  // Update localStorage when auth state changes
  useEffect(() => {
    const authState = { isSignedIn, userData };
    localStorage.setItem("loggedInUser", JSON.stringify(authState));
  }, [isSignedIn, userData]);

  const handleSignIn = (user) => {
    setIsSignedIn(true);
    setUserData(user);
    navigate("/"); // Navigate to home page after sign in
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserData(null);
  };

  return (
    <Routes>
      <Route
        path="/auth/*"
        element={
          <ErrorBoundary>
            <AuthApp onSignIn={handleSignIn} />
          </ErrorBoundary>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <DashboardApp />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/*"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <MarketingApp isSignedIn={isSignedIn} onSignOut={handleSignOut} />
            </Suspense>
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};

export default AppContent;
