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
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useTypedSelector from "../../hooks/useTypedSelector";
import { selectUsers } from "../../redux/users/userSlice";
import ToastAlert from "../../components/ToastAlert";

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
  const usersList = useTypedSelector(selectUsers);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Form handling with Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: (values) => {
      handleSignIn(values);
    },
  });

  const handleSignIn = async (values) => {
    setIsSubmitting(true);

    try {
      const payload = {
        email: values.email.toLowerCase(),
        password: values.password,
      };

      const findUser = usersList.find(
        (user) => user.email === values.email.toLowerCase()
      );

      if (!findUser) {
        setIsSubmitting(false);
        ToastAlert("User not found", "error");
        return;
      }

      if (findUser.password !== values.password) {
        setIsSubmitting(false);
        ToastAlert("Incorrect password", "error");
        return;
      }

      setTimeout(() => {
        ToastAlert("Sign-in successful", "success");
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Sign-in error:", error);
      ToastAlert("Something went wrong", "error");
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
            Welcome Back
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ width: "100%" }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  bgcolor: "background.paper",
                },
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  color="primary"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
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
              disabled={isSubmitting}
              sx={{
                mt: 2,
                mb: 3,
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
              {isSubmitting ? "Signing in..." : "Sign In"}
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

        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}
