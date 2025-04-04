import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingFallback from "./components/LoadingFallback";

const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState(null);

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
