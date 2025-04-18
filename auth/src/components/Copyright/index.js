import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link
        component={RouterLink}
        to="https://www.linkedin.com/in/moazam05"
        color="inherit"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#606163" }}
      >
        Salman Muazam
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
