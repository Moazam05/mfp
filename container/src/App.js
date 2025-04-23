import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import LoadingFallback from "./components/Loader/LoadingFallback";
import Footer from "./components/Footer";

// Import the AppContent which contains your routes
import AppContent from "./components/AppContent";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <AppContent />
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
