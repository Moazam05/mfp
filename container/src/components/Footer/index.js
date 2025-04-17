import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link
        component={RouterLink}
        to="https://www.linkedin.com/in/moazam05"
        color="inherit"
        target="_blank"
        rel="noopener noreferrer"
      >
        Salman Muazam
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: "auto",
        background: "linear-gradient(to bottom, #f6f9fc 0%, #eef1f5 100%)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              ShopMaster
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Premium shopping experience with the best products and customer
              service.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Social icons could go here */}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Shop
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              New Arrivals
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Best Sellers
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Discounts
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Support
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Help Center
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Returns
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Contact Us
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Subscribe to get special offers and news about upcoming sales.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {/* Newsletter form could go here */}
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(0,0,0,0.08)",
            mt: 4,
            pt: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            © {new Date().getFullYear()} ShopMaster. All rights reserved.
          </Typography>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
