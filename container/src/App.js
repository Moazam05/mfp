import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthApp from "./components/AuthApp";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <hr />
      <Routes>
        <Route path="/auth/*" element={<AuthApp />} />
        <Route path="/*" element={<MarketingApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
