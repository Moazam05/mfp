import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import LoadingFallback from "./Loader/LoadingFallback";
import ErrorBoundary from "./ErrorBoundary";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import PublicRoutes from "../routes/PublicRoutes";

// Import your Micro Frontend components
import AuthApp from "./AuthApp";
const MarketingApp = lazy(() => import("./MarketingApp"));
const DashboardApp = lazy(() => import("./DashboardApp"));

const AppContent = ({ isSignedIn, onSignIn, onSignOut }) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoutes isSignedIn={isSignedIn}>
              <ErrorBoundary>
                <AuthApp onSignIn={onSignIn} />
              </ErrorBoundary>
            </PublicRoutes>
          }
        />
        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes isSignedIn={isSignedIn}>
              <ErrorBoundary>
                <Suspense fallback={<LoadingFallback />}>
                  <DashboardApp />
                </Suspense>
              </ErrorBoundary>
            </ProtectedRoutes>
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
