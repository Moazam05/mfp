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
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Tooltip from "@mui/material/Tooltip";

export default function Header({ isSignedIn, onSignOut, userData }) {
  const [cartState, setCartState] = useState({ count: 0, total: 0 });

  // Load cart state from either marketingApp or localStorage
  const refreshCartState = () => {
    try {
      // First try to get from localStorage (always available)
      const cartStateJson = localStorage.getItem("cartState");
      if (cartStateJson) {
        const loadedState = JSON.parse(cartStateJson);
        setCartState({
          count: loadedState.count || 0,
          total: loadedState.total || 0,
        });
      }

      // Then check if marketingApp is available (more accurate)
      if (window.marketingApp) {
        const count = window.marketingApp.getCartItemsCount();
        const total = window.marketingApp.getCartTotal();
        setCartState({ count, total });
      }
    } catch (error) {
      console.error("Error refreshing cart state:", error);
    }
  };

  // Initial load and setup event listeners
  useEffect(() => {
    // Initial load
    refreshCartState();

    // Setup event listeners
    const handleCartStateUpdated = (event) => {
      if (event.detail) {
        setCartState({
          count: event.detail.count || 0,
          total: event.detail.total || 0,
        });
      }
    };

    const handleStorage = (e) => {
      if (e.key === "cartState") {
        refreshCartState();
      }
    };

    const handleFocus = () => {
      refreshCartState();
    };

    // Listen for events
    window.addEventListener("cartStateUpdated", handleCartStateUpdated);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleFocus);

    // Try to subscribe to marketingApp if available
    const setupMarketingAppSubscription = () => {
      if (window.marketingApp && window.marketingApp.subscribeToCart) {
        return window.marketingApp.subscribeToCart(setCartState);
      }
      return null;
    };

    // Try subscribing immediately
    let unsubscribe = setupMarketingAppSubscription();

    // If not available, poll briefly to check for marketingApp
    if (!unsubscribe) {
      const interval = setInterval(() => {
        if (window.marketingApp && window.marketingApp.subscribeToCart) {
          unsubscribe = setupMarketingAppSubscription();
          if (unsubscribe) {
            clearInterval(interval);
          }
        }
      }, 50);

      // Clear interval after a reasonable time if marketingApp doesn't load
      setTimeout(() => clearInterval(interval), 2000);
    }

    // Cleanup
    return () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener("cartStateUpdated", handleCartStateUpdated);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

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
    <AppBar position="sticky" color="default" elevation={0}>
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
            onClick={refreshCartState} // Refresh cart state when clicking cart icon
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box style={{ textDecoration: "none", color: "inherit" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mr: 2,
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
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
              </Box>

              {/* Dashboard Icon */}
              <Tooltip title="Dashboard">
                <IconButton
                  color="primary"
                  component={RouterLink}
                  to="/dashboard"
                  aria-label="Dashboard"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  <DashboardIcon />
                </IconButton>
              </Tooltip>

              {/* Admin Icon */}
              <Tooltip title="Admin Panel">
                <IconButton
                  color="primary"
                  component={RouterLink}
                  to="/admin"
                  aria-label="Admin Panel"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  <AdminPanelSettingsIcon />
                </IconButton>
              </Tooltip>
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
  );
}
