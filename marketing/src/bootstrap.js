import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Mount function to start up the app
const mount = (el) => {
  const root = createRoot(el); // Create a root
  root.render(<App />); // Use root.render instead of ReactDOM.render

  // Optional: Return a cleanup function if needed
  return {
    unmount: () => root.unmount(),
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through container
// and we should export the mount function
export { mount };
