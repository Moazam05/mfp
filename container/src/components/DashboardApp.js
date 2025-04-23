import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { mount } from "dashboard/DashboardApp";

export default () => {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Get the path after /dashboard/
    let initialPath = "/dashboard";
    if (location.pathname.startsWith("/dashboard")) {
      // Extract the subpath from the location (e.g., /dashboard/analytics -> /analytics)
      const subpath = location.pathname.replace("/dashboard", "");
      if (subpath) initialPath = subpath;
    }

    let unmountFunc;

    // Mount with the current path
    if (ref.current) {
      const { unmount } = mount(ref.current, {
        initialPath,
      });
      unmountFunc = unmount;
    }

    return () => {
      if (unmountFunc) unmountFunc();
    };
  }, [location]);

  return <div ref={ref} />;
};
