import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";
import { useNavigate, useLocation } from "react-router-dom";

const MarketingApp = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get auth state from localStorage
  const isSignedIn = (() => {
    try {
      const storedAuthState = localStorage.getItem("loggedInUser");
      return storedAuthState ? JSON.parse(storedAuthState).isSignedIn : false;
    } catch (error) {
      console.error("Error reading auth state:", error);
      return false;
    }
  })();

  useEffect(() => {
    if (!ref.current) return; // Guard clause

    // Store mount result in a variable and check if it exists
    const mountResult = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = location;
        if (pathname !== nextPathname) {
          navigate(nextPathname);
        }
      },
      isSignedIn: isSignedIn, // Pass auth state to Marketing app
    });

    // Only call onParentNavigate if mountResult exists and has onParentNavigate
    if (mountResult && typeof mountResult.onParentNavigate === "function") {
      mountResult.onParentNavigate(location);
    }

    // For cleanup, only call unmount if mountResult exists and has unmount
    return () => {
      if (mountResult && typeof mountResult.unmount === "function") {
        mountResult.unmount();
      }
    };
  }, [location, navigate, isSignedIn]); // Add isSignedIn to dependencies

  return <div ref={ref} />;
};

export default MarketingApp;
