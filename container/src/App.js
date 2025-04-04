import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingFallback from "./components/LoadingFallback";

const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));

const App = () => {
  // Initialize state from localStorage if available
  const [isSignedIn, setIsSignedIn] = useState(() => {
    const storedAuthState = localStorage.getItem("loggedInUser");
    return storedAuthState ? JSON.parse(storedAuthState).isSignedIn : false;
  });

  const [userData, setUserData] = useState(() => {
    const storedAuthState = localStorage.getItem("loggedInUser");
    return storedAuthState ? JSON.parse(storedAuthState).userData : null;
  });

  // Update localStorage when auth state changes
  useEffect(() => {
    const authState = { isSignedIn, userData };
    localStorage.setItem("loggedInUser", JSON.stringify(authState));
  }, [isSignedIn, userData]);

  const handleSignIn = (user) => {
    setIsSignedIn(true);
    setUserData(user);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserData(null);
  };

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
