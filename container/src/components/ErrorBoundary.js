import React from "react";
import { Box } from "@mui/material";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 70px)",
            color: "text.secondary",
            gap: 2,
          }}
        >
          <span>Something went wrong. Please refresh the page.</span>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
