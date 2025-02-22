import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignIn({ onSignIn }) {
  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: "primary.main",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 32 }} />
        </Avatar>

        <Typography
          component="h1"
          variant="h4"
          sx={{
            mt: 2,
            mb: 3,
            fontWeight: 600,
          }}
        >
          Welcome Back
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{ width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "background.paper",
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                sx={{ borderRadius: 1 }}
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                Remember me
              </Typography>
            }
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={onSignIn}
            sx={{
              mt: 2,
              mb: 3,
              py: 1.5,
              borderRadius: 2,
              fontSize: "1.1rem",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            Sign In
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Link
                to="/auth/signup"
                style={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: 500,
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box sx={{ mt: 4, mb: 4 }}>
        <Copyright />
      </Box>
    </Container>
  );
}
