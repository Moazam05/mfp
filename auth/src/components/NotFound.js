import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography variant="h1" color="primary" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Oops! The page you're looking for doesn't exist.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            It seems you've found a page that either doesn't exist or has been
            moved to a new location.
          </Typography>
          <RouterLink to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" sx={{ mt: 3 }}>
              Back to Home
            </Button>
          </RouterLink>
        </Box>
      </Container>
    </Box>
  );
}
