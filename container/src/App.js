import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AppContent from "./components/AppContent";

const App = () => {
  // Initialize state from localStorage if available
  const [isSignedIn, setIsSignedIn] = useState(() => {
    const storedAuthState = localStorage.getItem("loggedInUser");
    return storedAuthState ? JSON.parse(storedAuthState).isSignedIn : false;
  });

  const [userData, setUserData] = useState(() => {
    const storedAuthState = localStorage.getItem("loggedInUser");
    return storedAuthState ? JSON.parse(storedAuthState).userData : null;
  });

  // Update localStorage when auth state changes
  useEffect(() => {
    const authState = { isSignedIn, userData };
    localStorage.setItem("loggedInUser", JSON.stringify(authState));
  }, [isSignedIn, userData]);

  const handleSignIn = (user) => {
    setIsSignedIn(true);
    setUserData(user);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserData(null);
  };

  return (
    <BrowserRouter>
      <Header
        isSignedIn={isSignedIn}
        onSignOut={handleSignOut}
        userData={userData}
      />
      <AppContent
        isSignedIn={isSignedIn}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
