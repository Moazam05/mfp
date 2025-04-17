import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingFallback from "./components/Loader/LoadingFallback";
import Footer from "./components/Footer";

const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));

// Create a wrapper component that has access to the navigation
const AppContent = () => {
  const navigate = useNavigate();

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
    if (isSignedIn && window.location.pathname.startsWith("/auth")) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

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
    <>
      <Header
        onSignOut={handleSignOut}
        isSignedIn={isSignedIn}
        userData={userData}
      />
      <hr />
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route
              path="/auth/*"
              element={<AuthApp onSignIn={handleSignIn} />}
            />
            <Route path="/*" element={<MarketingApp />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      <Footer />
    </>
  );
};

// Main App component with Router
const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
