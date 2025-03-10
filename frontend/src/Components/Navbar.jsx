import React, { use } from "react";
import {
  Box,
  Button,
  Grid2 as Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Logo from "./Logo";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <Grid
      size={12}
      px={2}
      py={1}
      sx={{ boxShadow: 1, backgroundColor: theme.palette.background.paper }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography variant="h6">Chat App</Typography>
          <Logo fontSize="small" />
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Button
            variant="text"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "capitalize",
            }}
          >
            <SettingsIcon />
            <Typography>Settings</Typography>
          </Button>
          {authUser && (
            <>
              <Button
                variant="text"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  textTransform: "capitalize",
                }}
                onClick={() => navigate("/profile")}
              >
                <PersonOutlineOutlinedIcon />
                <Typography>Profile</Typography>
              </Button>
              <Button
                variant="text"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  textTransform: "capitalize",
                }}
                onClick={logout}
              >
                <LogoutOutlinedIcon />
                <Typography>Logout</Typography>
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Grid>
  );
};

export default Navbar;
