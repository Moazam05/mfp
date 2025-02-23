import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import ToastAlert from "../components/ToastAlert";
import Copyright from "./Copyright";

export default function SignUp({ onSignIn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersList = useTypedSelector(selectUsers);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      const payload = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email.toLowerCase(),
        password: values.password,
      };
      console.log("payload", payload);

      // Check if user already exists
      const findUser = usersList.find(
        (user) => user.email === values.email.toLowerCase()
      );
      if (findUser) {
        setSubmitting(false);
        ToastAlert("User already exists", "error");
        return;
      }

      await dispatch(addUser(payload));
      ToastAlert("User added successfully", "success");

      // Simulate a delay before navigating
      setTimeout(() => {
        setSubmitting(false);
        navigate("/auth/signin");
      }, 2000);
    } catch (error) {
      setSubmitting(false);
      ToastAlert("Something went wrong", "error");
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 70px)",
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

          {/* Formik Form */}
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              allowExtraEmails: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ isSubmitting }) => (
              <Form style={{ width: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      autoComplete="fname"
                      name="firstName"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      variant="outlined"
                      helperText={<ErrorMessage name="firstName" />}
                      error={!!ErrorMessage.name}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      variant="outlined"
                      helperText={<ErrorMessage name="lastName" />}
                      error={!!ErrorMessage.name}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      variant="outlined"
                      helperText={<ErrorMessage name="email" />}
                      error={!!ErrorMessage.name}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      variant="outlined"
                      helperText={<ErrorMessage name="password" />}
                      error={!!ErrorMessage.name}
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
                        <Field
                          as={Checkbox}
                          name="allowExtraEmails"
                          color="primary"
                          sx={{ borderRadius: 1 }}
                        />
                      }
                      label={
                        <Typography variant="body2" color="text.secondary">
                          I want to receive inspiration, marketing promotions
                          and updates via email.
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
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
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
