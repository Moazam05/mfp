import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./App.css";

// Get the root element using class selector
const container = document.querySelector(".root");

// Make sure the element exists
if (!container) {
  throw new Error("Root element not found");
}

// Create root and render
const root = createRoot(container);
root.render(<App />);
