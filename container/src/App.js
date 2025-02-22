import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";

const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 70px)",
            color: "#666",
          }}
        >
          Something went wrong. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 70px)",
    }}
  >
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        color: "#666",
      }}
    >
      Loading...
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <hr />
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/auth/*" element={<AuthApp />} />
            <Route path="/*" element={<MarketingApp />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
