import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Logo from "../Components/Logo";
import { Formik } from "formik";
import MyInput from "../Components/MyInput";
import { signupSchema } from "../lib/formSchema.js";
import { useAuthStore } from "../store/useAuthStore";
import FormikSubmitButton from "../Components/FormikSubmitButton.jsx";
import { useNavigate } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern.jsx";

const SignupPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (values) => {
    signup(values);
  };

  return (
    <Grid size={12} height={"100vh"}>
      <Grid
        container
        columns={12}
        sx={{
          height: "100%",
          p: { xs: 2, md: 12 },
        }}
      >
        <Grid
          size={{ xs: 12, md: 5 }}
          // border={"1px solid"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Paper
            sx={{
              p: 2.5,
              width: { xs: "100%", md: "64%" },
            }}
          >
            <Grid size={12}>
              <Grid container spacing={4}>
                <Grid size={12} textAlign={"center"}>
                  <Stack
                    spacing={2}
                    justifyContent={"center"}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <Box
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      <Logo logoText={false} />
                    </Box>
                    <Typography variant="h6" color="primary" fontWeight={700}>
                      Create Account
                    </Typography>
                  </Stack>
                  <Typography variant="p" color={theme.palette.secondary.main}>
                    Get Started with your free account
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Formik
                    initialValues={{
                      fullName: "",
                      email: "",
                      password: "",
                    }}
                    enableReinitialize={true}
                    validationSchema={signupSchema}
                    onSubmit={handleSubmit}
                  >
                    {(props) => {
                      return (
                        <Box
                          component={"form"}
                          width={"100%"}
                          onSubmit={props.handleSubmit}
                        >
                          <Grid container spacing={2}>
                            <Grid size={12}>
                              <MyInput
                                isRequired
                                name={"fullName"}
                                label="Full Name"
                                formikProps={props}
                              />
                            </Grid>
                            <Grid size={12}>
                              <MyInput
                                isRequired
                                name={"email"}
                                label="Email"
                                formikProps={props}
                              />
                            </Grid>
                            <Grid size={12}>
                              <MyInput
                                isRequired
                                name={"password"}
                                label="Password"
                                formikProps={props}
                              />
                            </Grid>
                            <Grid size={12} my={2}>
                              <FormikSubmitButton
                                id={isSigningUp}
                                title="Create Account"
                                onLoadingTitle="Creating Account..."
                              />
                            </Grid>
                            <Grid size={12} textAlign={"center"}>
                              <Typography
                                variant="p"
                                color={theme.palette.secondary.main}
                              >
                                Already have an account?{" "}
                                <Box
                                  component={"span"}
                                  sx={{
                                    color: "primary.main",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                    "&:hover": {
                                      textDecoration: "underline",
                                    },
                                  }}
                                  onClick={() => navigate("/login")}
                                >
                                  Login
                                </Box>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    }}
                  </Formik>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid size={1} display={{ xs: "none", md: "block" }}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid size={6} display={{ xs: "none", md: "block" }}>
          <AuthImagePattern
            title="Join our community"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
