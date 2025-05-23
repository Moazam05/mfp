import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import LoadingFallback from "./Loader/LoadingFallback";
import ErrorBoundary from "./ErrorBoundary";
import Admin from "../views/Admin";
import Unauthorized from "../views/Unauthorized";

import ProtectedRoutes from "../routes/ProtectedRoutes";
import PublicRoutes from "../routes/PublicRoutes";
import AdminRoute from "../routes/AdminRoute";

// Import your Micro Frontend components
import AuthApp from "./AuthApp";
const MarketingApp = lazy(() => import("./MarketingApp"));
const DashboardApp = lazy(() => import("./DashboardApp"));

const AppContent = ({ isSignedIn, onSignIn, onSignOut, userData }) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
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

        {/* Unauthorized Route */}
        <Route
          path="/unauthorized"
          element={
            <ErrorBoundary>
              <Unauthorized />
            </ErrorBoundary>
          }
        />

        {/* Common Routes */}
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

        {/* Admin Route with AdminRoute for authorization */}
        <Route
          path="/admin"
          element={
            <AdminRoute isSignedIn={isSignedIn} userData={userData}>
              <Suspense fallback={<LoadingFallback />}>
                <Admin userData={userData} />
              </Suspense>
            </AdminRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppContent;
