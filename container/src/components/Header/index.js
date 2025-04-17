import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export default function Header({ isSignedIn, onSignOut, userData }) {
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
            Micro Frontend App
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
