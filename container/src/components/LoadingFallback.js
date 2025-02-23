import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 70px)",
      gap: 2,
    }}
  >
    <CircularProgress
      size={40}
      thickness={4}
      sx={{
        color: "primary.main",
        "& .MuiCircularProgress-circle": {
          strokeLinecap: "round",
        },
      }}
    />
  </Box>
);

export default LoadingFallback;
