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

import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

// Create routes component to avoid duplication
const RoutesComponent = ({ onSignIn }) => (
  <Routes>
    <Route path="/auth/signin" element={<SignIn onSignIn={onSignIn} />} />
    <Route path="/auth/signup" element={<SignUp onSignIn={onSignIn} />} />
  </Routes>
);

// Component for container mode
const MountedApp = ({
  onNavigate,
  setNavigationRef,
  initialPath,
  onSignIn,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

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

  return <RoutesComponent onSignIn={onSignIn} />;
};

// Main component that handles both standalone and container modes
export default ({
  onNavigate,
  setNavigationRef,
  isStandalone,
  initialPath,
  onSignIn,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      {isStandalone ? (
        <BrowserRouter>
          <RoutesComponent onSignIn={onSignIn} />
        </BrowserRouter>
      ) : (
        <MemoryRouter initialEntries={[initialPath || "/"]}>
          <MountedApp
            onNavigate={onNavigate}
            setNavigationRef={setNavigationRef}
            initialPath={initialPath}
            onSignIn={onSignIn}
          />
        </MemoryRouter>
      )}
    </StyledEngineProvider>
  );
};
