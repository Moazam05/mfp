import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";

export default function Header({ isSignedIn, onSignOut, userData }) {
  const [cartState, setCartState] = useState({ count: 0, total: 0 });
  const [marketingAppLoaded, setMarketingAppLoaded] = useState(false);

  // Check periodically if marketingApp is available
  useEffect(() => {
    // First try
    if (window.marketingApp) {
      setMarketingAppLoaded(true);
      return;
    }

    // If not available yet, set up a polling mechanism
    const interval = setInterval(() => {
      if (window.marketingApp) {
        setMarketingAppLoaded(true);
        clearInterval(interval);
      }
    }, 300); // Check every 300ms

    // Cleanup interval
    return () => clearInterval(interval);
  }, []);

  // Subscribe to cart updates once marketingApp is loaded
  useEffect(() => {
    if (!marketingAppLoaded) return;

    try {
      // Initial cart state
      const initialCount = window.marketingApp.getCartItemsCount();
      const initialTotal = window.marketingApp.getCartTotal();

      // console.log("Initial cart state:", {
      //   count: initialCount,
      //   total: initialTotal,
      // });

      setCartState({
        count: initialCount,
        total: initialTotal,
      });

      // Subscribe to cart changes
      const unsubscribe = window.marketingApp.subscribeToCart((newState) => {
        // console.log("Cart updated:", newState);
        setCartState(newState);
      });

      // Cleanup subscription when component unmounts
      return () => {
        if (unsubscribe) unsubscribe();
      };
    } catch (error) {
      console.error("Error setting up cart subscription:", error);
    }
  }, [marketingAppLoaded]);

  const onClick = () => {
    if (isSignedIn && onSignOut) {
      onSignOut();
    }
  };

  // Get first letter of name for avatar if user is signed in
  const avatarLetter = userData?.name
    ? userData.name.charAt(0).toUpperCase()
    : "";

  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar
          sx={{
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            ShopMaster{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textFillColor: "transparent",
                fontSize: "0.8em",
                fontWeight: "normal",
              }}
            >
              (Micro Frontend App)
            </span>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Cart Icon with Badge */}
            <IconButton
              color="primary"
              component={RouterLink}
              to="/cart"
              aria-label="Cart"
            >
              <Badge badgeContent={cartState.count || 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Cart Total */}
            {cartState.count > 0 && (
              <Typography variant="body2" color="primary" sx={{ mr: 1 }}>
                ${(cartState.total || 0).toFixed(2)}
              </Typography>
            )}

            {isSignedIn && userData && (
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "primary.main",
                    mr: 1,
                  }}
                >
                  {avatarLetter}
                </Avatar>
                <Typography variant="body2">{userData.name}</Typography>
              </Box>
            )}

            <Button
              color="primary"
              variant="outlined"
              component={RouterLink}
              to={isSignedIn ? "/" : "/auth/signin"}
              onClick={onClick}
              sx={{
                my: 1,
              }}
            >
              {isSignedIn ? "Logout" : "Login"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
