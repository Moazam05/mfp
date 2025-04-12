import React, { useEffect } from "react";
import {
  Routes,
  Route,
  MemoryRouter,
  BrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import Pricing from "./components/Pricing";
import NotFound from "./components/NotFound";
import Products from "./views/Products";
import ProductsDetails from "./views/Products/components/ProductsDetails";

// Create routes component to avoid duplication
const RoutesComponent = () => (
  <Routes>
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/" element={<Products />} />
    <Route path="/products/:id" element={<ProductsDetails />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// Component for container mode
const MountedApp = ({ onNavigate, setNavigationRef, initialPath }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Inside MountedApp component
  useEffect(() => {
    if (onNavigate) {
      onNavigate(location);
    }
  }, [location, onNavigate]);

  useEffect(() => {
    if (setNavigationRef) {
      setNavigationRef(navigate);
    }
  }, [navigate, setNavigationRef]);

  return <RoutesComponent />;
};

export default ({
  onNavigate,
  setNavigationRef,
  isStandalone,
  initialPath,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      {isStandalone ? (
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
      ) : (
        <MemoryRouter initialEntries={[initialPath || "/"]}>
          <MountedApp
            onNavigate={onNavigate}
            setNavigationRef={setNavigationRef}
            initialPath={initialPath}
          />
        </MemoryRouter>
      )}
    </StyledEngineProvider>
  );
};
