import React from "react";
import {
  Routes,
  Route,
  MemoryRouter,
  BrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";
import NotFound from "./components/NotFound";

// Create routes component to avoid duplication
const RoutesComponent = () => (
  <Routes>
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/" element={<Landing />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// Component for container mode
const MountedApp = ({ onNavigate, setNavigationRef }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (setNavigationRef) {
      setNavigationRef(navigate);
    }
  }, [navigate, setNavigationRef]);

  React.useEffect(() => {
    if (onNavigate) {
      onNavigate(location);
    }
  }, [location, onNavigate]);

  return <RoutesComponent />;
};

export default ({ onNavigate, setNavigationRef, isStandalone }) => {
  return (
    <StyledEngineProvider injectFirst>
      {isStandalone ? (
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
      ) : (
        <MemoryRouter>
          <MountedApp
            onNavigate={onNavigate}
            setNavigationRef={setNavigationRef}
          />
        </MemoryRouter>
      )}
    </StyledEngineProvider>
  );
};
