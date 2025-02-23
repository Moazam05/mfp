import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#2196f3",
          color: "white",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Welcome to Auth App
          </Typography>
          <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
            You are logged in as Salman Muazam
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Our App Routes
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{
            marginTop: 2,
          }}
        >
          {/* Feature Card 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
              }}
            >
              <CardActionArea component={Link} to="/auth/signin">
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Sign In
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla vitae lorem auctor.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Feature Card 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
              }}
            >
              <CardActionArea component={Link} to="/auth/signup">
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Sign Up
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla vitae lorem auctor.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
