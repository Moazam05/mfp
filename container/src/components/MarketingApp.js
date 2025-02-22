import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";
import { useNavigate, useLocation } from "react-router-dom";

const MarketingApp = () => {
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
    });

    // Update marketing app when container location changes
    onParentNavigate(location);

    return () => {
      unmount();
    };
  }, [location, navigate]); // Add location and navigate to dependencies

  return <div ref={ref} />;
};

export default MarketingApp;
