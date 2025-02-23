import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useTypedSelector from "../hooks/useTypedSelector";
import { addUser, selectUsers } from "../redux/users/userSlice";

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

export default function SignUp({ onSignIn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersList = useTypedSelector(selectUsers);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (values) => {
    try {
      setLoading(true);
      const payload = {
        name: values.userName,
        email: values.email.toLowerCase(),
        password: values.password,
      };

      console.log("payload", payload);
      return;

      // find user based on email
      const findUser = usersList.find(
        (user) => user.email === values.email.toLowerCase()
      );
      if (findUser) {
        setLoading(false);
        alert("User already exists");
        return;
      }
      await dispatch(addUser(payload));

      // Add a 2-second delay before navigating
      setTimeout(() => {
        setLoading(false);
        alert("User added successfully");
        navigate("/auth/signin");
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 70px)", // Subtracting header height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Paper
          elevation={3}
          sx={{
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
            Create Account
          </Typography>

          <Box
            component="form"
            onSubmit={(e) => e.preventDefault()}
            sx={{ width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      sx={{ borderRadius: 1 }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      I want to receive inspiration, marketing promotions and
                      updates via email.
                    </Typography>
                  }
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={onSignIn}
              onClick={handleSignUp}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: 1,
                fontSize: "1.1rem",
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                },
              }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  to="/auth/signin"
                  style={{
                    textDecoration: "none",
                    color: "primary.main",
                    fontWeight: 500,
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}
