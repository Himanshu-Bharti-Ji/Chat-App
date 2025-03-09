import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormLabel,
  Grid2 as Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../Components/Logo";
import { Formik } from "formik";
import MyInput from "../Components/MyInput";
import { loginSchema } from "../lib/formSchema.js";
import { useAuthStore } from "../store/useAuthStore";
import FormikSubmitButton from "../Components/FormikSubmitButton.jsx";
import { useNavigate } from "react-router-dom";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { updateProfile, authUser, isUpdatingProfile } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      setUserData(authUser?.data);
    }
  }, [authUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

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
          p: { xs: 6, md: 12 },
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid size={{ xs: 12, md: 3.5 }}>
          <Paper
            sx={{
              p: 2.5,
              width: "100%",
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
                    <Typography variant="h6" color="primary" fontWeight={700}>
                      Profile
                    </Typography>
                    <Typography
                      variant="p"
                      color={theme.palette.secondary.main}
                    >
                      Your profile information
                    </Typography>
                    <Box
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <>
                            <input
                              id="profilePicture"
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={handleImageUpload}
                              disabled={isUpdatingProfile}
                            />
                            <FormLabel htmlFor="profilePicture">
                              <IconButton
                                size="small"
                                component="span"
                                sx={{
                                  backgroundColor: theme.palette.primary.main,
                                  color: "#1E1E1E",
                                  "&:hover": {
                                    backgroundColor: theme.palette.primary.dark,
                                  },
                                }}
                              >
                                <PhotoCameraOutlinedIcon fontSize="small" />
                              </IconButton>
                            </FormLabel>
                          </>
                        }
                      >
                        <Avatar
                          alt={userData?.fullName}
                          src={selectedImage || userData?.profilePic || ""}
                          sx={{ width: 100, height: 100 }}
                        />
                      </Badge>
                    </Box>
                    <Typography
                      variant="body2"
                      color={theme.palette.secondary.main}
                    >
                      {isUpdatingProfile
                        ? "Updating..."
                        : "Click the camera icon to update your profile picture"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={12}>
                  <Formik
                    initialValues={{
                      fullName: userData?.fullName || "",
                      email: userData?.email || "",
                    }}
                    enableReinitialize={true}
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
                                disabled
                                name={"fullName"}
                                label="Full Name"
                                formikProps={props}
                              />
                            </Grid>
                            <Grid size={12}>
                              <MyInput
                                disabled
                                name={"email"}
                                label="Email Address"
                                formikProps={props}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    }}
                  </Formik>
                </Grid>
                <Grid size={12} color={theme.palette.secondary.main}>
                  <Stack spacing={1.5}>
                    <Typography>Account Information</Typography>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography fontSize={14}>Member Since</Typography>
                      <Typography fontSize={14}>2024-12-12</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography fontSize={14}>Account Status</Typography>
                      <Chip color="success" label="Active" variant="outlined" />
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
