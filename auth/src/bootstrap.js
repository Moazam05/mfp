import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Mount function to start up the app
const mount = (el, { onNavigate, initialPath, onSignIn } = {}) => {
  const root = createRoot(el);

  // Initialize a navigation reference that will be set by the App
  let navigationRef = null;

  // Function to set the navigation reference
  const setNavigationRef = (navigate) => {
    navigationRef = navigate;
  };

  // Determine if we're running in standalone mode
  const isStandalone = !onNavigate;

  root.render(
    <Provider store={store}>
      <App
        onNavigate={onNavigate}
        setNavigationRef={setNavigationRef}
        isStandalone={isStandalone}
        initialPath={initialPath}
        onSignIn={onSignIn}
      />
      <ToastContainer />
    </Provider>
  );

  return {
    onParentNavigate({ pathname: nextPathname }) {
      if (navigationRef) {
        navigationRef(nextPathname);
      }
    },
    unmount: () => root.unmount(),
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through container
// and we should export the mount function
export { mount };
