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
import { loginSchema } from "../lib/formSchema.js";
import { useAuthStore } from "../store/useAuthStore";
import FormikSubmitButton from "../Components/FormikSubmitButton.jsx";
import { useNavigate } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern.jsx";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (values) => {
    login(values);
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
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          // border={"1px solid"}
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
                      Welcome Back
                    </Typography>
                  </Stack>
                  <Typography variant="p" color={theme.palette.secondary.main}>
                    Signin to your account
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    enableReinitialize={true}
                    validationSchema={loginSchema}
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
                                id={isLoggingIn}
                                title="Sign in"
                                onLoadingTitle="Signing in..."
                              />
                            </Grid>
                            <Grid size={12} textAlign={"center"}>
                              <Typography
                                variant="p"
                                color={theme.palette.secondary.main}
                              >
                                Don&apos;t have an account?{" "}
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
                                  onClick={() => navigate("/signup")}
                                >
                                  Create account
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
            title={"Welcome back!"}
            subtitle={
              "Sign in to continue your conversations and catch up with your messages."
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
