import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";
import { useNavigate, useLocation } from "react-router-dom";

const MarketingApp = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { onParentNavigate, unmount } = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = location;
        if (pathname !== nextPathname) {
          navigate(nextPathname, { replace: false });
        }
      },
    });

    const handleNavigation = () => {
      if (onParentNavigate) {
        onParentNavigate(location);
      }
    };

    window.addEventListener("popstate", handleNavigation);

    // Initial sync
    handleNavigation();

    return () => {
      window.removeEventListener("popstate", handleNavigation);
      unmount();
    };
  }, []); // Empty dependency array to mount once

  return <div ref={ref} />;
};

export default MarketingApp;
