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

import Products from "./views/Products";
import ProductsDetails from "./views/Products/components/ProductsDetails";
import Cart from "./views/Cart";
// Not Found
import NotFound from "./components/NotFound";

// Create routes component to avoid duplication
const RoutesComponent = ({ isSignedIn }) => (
  <Routes>
    <Route path="/" element={<Products />} />
    <Route path="/products/:id" element={<ProductsDetails />} />
    <Route path="/cart" element={<Cart isSignedIn={isSignedIn} />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// Component for container mode
const MountedApp = ({
  onNavigate,
  setNavigationRef,
  initialPath,
  isSignedIn,
}) => {
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

  return <RoutesComponent isSignedIn={isSignedIn} />;
};

export default ({
  onNavigate,
  setNavigationRef,
  isStandalone,
  initialPath,
  isSignedIn,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      {isStandalone ? (
        <BrowserRouter>
          <RoutesComponent isSignedIn={isSignedIn} />
        </BrowserRouter>
      ) : (
        <MemoryRouter initialEntries={[initialPath || "/"]}>
          <MountedApp
            onNavigate={onNavigate}
            setNavigationRef={setNavigationRef}
            initialPath={initialPath}
            isSignedIn={isSignedIn}
          />
        </MemoryRouter>
      )}
    </StyledEngineProvider>
  );
};
