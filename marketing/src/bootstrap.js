import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  selectCartItemsCount,
  selectCartTotal,
} from "./redux/products/productsSlice";

// Initialize the global marketingApp object immediately
// This ensures it exists even before mount is called
window.marketingApp = {
  getCartItemsCount: () => {
    try {
      return selectCartItemsCount(store.getState());
    } catch (error) {
      console.error("Error getting cart count:", error);
      return 0;
    }
  },
  getCartTotal: () => {
    try {
      return selectCartTotal(store.getState());
    } catch (error) {
      console.error("Error getting cart total:", error);
      return 0;
    }
  },
  // Initialize with empty function that will be replaced during mount
  subscribeToCart: () => () => {},
  isSignedIn: false, // Initialize with default value
};

// Mount function to start up the app
const mount = (el, { onNavigate, initialPath, isSignedIn } = {}) => {
  const root = createRoot(el);

  // Initialize a navigation reference that will be set by the App
  let navigationRef = null;

  // Function to set the navigation reference
  const setNavigationRef = (navigate) => {
    navigationRef = navigate;
  };

  // Determine if we're running in standalone mode
  const isStandalone = !onNavigate;

  // Update the isSignedIn value in the global object
  window.marketingApp.isSignedIn = isSignedIn || false;

  // Now update the subscription function with real implementation
  window.marketingApp.subscribeToCart = (callback) => {
    // Call callback immediately with initial state
    callback({
      count: window.marketingApp.getCartItemsCount(),
      total: window.marketingApp.getCartTotal(),
    });

    // Return unsubscribe function
    return store.subscribe(() => {
      callback({
        count: window.marketingApp.getCartItemsCount(),
        total: window.marketingApp.getCartTotal(),
      });
    });
  };

  root.render(
    <Provider store={store}>
      <App
        onNavigate={onNavigate}
        setNavigationRef={setNavigationRef}
        isStandalone={isStandalone}
        initialPath={initialPath}
        isSignedIn={isSignedIn}
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
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through container
// and we should export the mount function
export { mount };
