import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid2 as Grid,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const theme = useTheme();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <Grid size={12}>
      <Box sx={{ p: 1, color: theme.palette.primary.main }}>
        <Stack direction={"row"} spacing={1}>
          <PeopleAltIcon />
          <Typography>Contacts</Typography>
        </Stack>
        {/* TODO: implement online toggle functionality */}
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Show online only"
        />
        <Box component={"span"} fontSize={14} ml={-1}>
          (0 online)
        </Box>
      </Box>
      <Divider />
      <Grid size={12} py={2} sx={{ overflowY: "auto", maxHeight: "75vh" }}>
        {users &&
          users?.length > 0 &&
          users?.map((user, idx) => {
            const labelId = `${idx}`;
            return (
              <ListItem
                key={idx}
                disablePadding
                sx={{
                  backgroundColor:
                    selectedUser?._id === user._id
                      ? theme.palette.background.paper
                      : "transparent",
                }}
              >
                <ListItemButton onClick={() => setSelectedUser(user)}>
                  <ListItemAvatar>
                    <Avatar
                      alt={`${user.fullName}`}
                      src={`${user.profilePic}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`${user?.fullName}`}
                    secondary={`online`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default Sidebar;
