import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Logo from "./Logo";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: "Chat", icon: <QuestionAnswerOutlinedIcon />, path: "/" },
  ];

  if (authUser) {
    menuItems.push(
      {
        text: "Profile",
        icon: <PersonOutlineOutlinedIcon />,
        path: "/profile",
      },
      { text: "Logout", icon: <LogoutOutlinedIcon />, action: logout }
    );
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: 1,
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Logo fontSize="small" smPadding={0.6} />

        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            size="large"
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
        )}

        {!isMobile && authUser && (
          <Box display="flex" gap={2}>
            {menuItems.map(({ text, icon, path, action }, idx) => (
              <Button
                key={idx}
                variant="text"
                onClick={() => (action ? action() : navigate(path))}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  textTransform: "capitalize",
                }}
              >
                {icon}
                <Typography>{text}</Typography>
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            borderEndEndRadius: 0,
            borderStartEndRadius: 0,
          },
        }}
      >
        <Box
          width={250}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          py={2}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1.5 }}>
            <Logo fontSize="small" smPadding={0.6} />
          </Box>
          <Divider sx={{ mb: 1 }} />
          <List>
            {menuItems.map(({ text, icon, path, action }, idx) => (
              <>
                <ListItem key={idx} disablePadding>
                  <ListItemButton
                    onClick={() => (action ? action() : navigate(path))}
                  >
                    <ListItemIcon sx={{ mr: -2, color: "primary.main" }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ color: "primary.main" }}
                    />
                  </ListItemButton>
                </ListItem>
                {idx < menuItems.length - 1 && <Divider />}
              </>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
