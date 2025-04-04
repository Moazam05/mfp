import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import useTypedSelector from "../../hooks/useTypedSelector";
import { selectUsers } from "../../redux/users/userSlice";
import ToastAlert from "../../components/ToastAlert";
import Copyright from "../../components/Copyright";
import CustomTextField from "../../components/CustomTextField";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignIn({ onSignIn }) {
  const navigate = useNavigate();
  const usersList = useTypedSelector(selectUsers);

  const handleSignIn = async (values, { setSubmitting }) => {
    try {
      const payload = {
        email: values.email.toLowerCase(),
        password: values.password,
      };

      const findUser = usersList.find(
        (user) => user.email === values.email.toLowerCase()
      );

      if (!findUser) {
        setSubmitting(false);
        ToastAlert("User not found", "error");
        return;
      }

      if (findUser.password !== values.password) {
        setSubmitting(false);
        ToastAlert("Incorrect password", "error");
        return;
      }

      // Simulate a successful sign-in
      setTimeout(() => {
        // Pass the user data to the container
        onSignIn({
          name: findUser.name,
          email: findUser.email,
        });

        ToastAlert("Sign-in successful", "success");
        setSubmitting(false);
      }, 1000);
    } catch (error) {
      setSubmitting(false);
      console.error("Sign-in error:", error);
      ToastAlert("Something went wrong", "error");
    }
  };

  // Rest of your component stays the same...
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

          <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
            validateOnMount={false}
          >
            {({ isSubmitting }) => (
              <Form style={{ width: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={CustomTextField}
                      name="email"
                      label="Email Address"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={CustomTextField}
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name="rememberMe"
                          color="primary"
                          sx={{ borderRadius: 1 }}
                        />
                      }
                      label={
                        <Typography variant="body2" color="text.secondary">
                          Remember me
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
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
              </Form>
            )}
          </Formik>
        </Paper>

        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}
