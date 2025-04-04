import React, { useRef, useEffect } from "react";
import { mount } from "auth/AuthApp";
import { useNavigate, useLocation } from "react-router-dom";

const AuthApp = ({ onSignIn }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!ref.current) return; // Guard clause

    const { onParentNavigate, unmount } = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = location;
        if (pathname !== nextPathname) {
          navigate(nextPathname);
        }
      },
      onSignIn: (userData) => {
        // Pass the user data to container's onSignIn handler
        onSignIn(userData);
      },
    });

    // Update auth app when container location changes
    onParentNavigate(location);

    return () => {
      unmount();
    };
  }, [location, navigate, onSignIn]); // Add onSignIn to dependencies

  return <div ref={ref} />;
};

export default AuthApp;
