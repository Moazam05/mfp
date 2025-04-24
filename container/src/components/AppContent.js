import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import LoadingFallback from "./Loader/LoadingFallback";
import ErrorBoundary from "./ErrorBoundary";

// Import your Micro Frontend components
import AuthApp from "./AuthApp";
const MarketingApp = lazy(() => import("./MarketingApp"));
const DashboardApp = lazy(() => import("./DashboardApp"));

const AppContent = ({ isSignedIn, onSignIn, onSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to home if user is already logged in and trying to access auth pages
  useEffect(() => {
    if (isSignedIn && location.pathname.startsWith("/auth")) {
      navigate("/");
    }
  }, [isSignedIn, navigate, location]);

  // We don't need the localStorage code here anymore as it's moved to App.jsx

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <ErrorBoundary>
              <AuthApp onSignIn={onSignIn} />
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
                <MarketingApp />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppContent;
