import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 70px)",
            color: "text.secondary",
            gap: 2,
          }}
        >
          <span>Something went wrong. Please refresh the page.</span>
        </Box>
      );
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 70px)",
      gap: 2,
    }}
  >
    <CircularProgress
      size={40}
      thickness={4}
      sx={{
        color: "primary.main",
        "& .MuiCircularProgress-circle": {
          strokeLinecap: "round",
        },
      }}
    />
  </Box>
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
