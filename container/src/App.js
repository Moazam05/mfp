import React from "react";
import { BrowserRouter } from "react-router-dom";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <hr />
      <MarketingApp />
    </BrowserRouter>
  );
};

export default App;
