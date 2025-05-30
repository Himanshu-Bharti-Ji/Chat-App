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
import { StyledBadge } from "./HelperStructure";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const theme = useTheme();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(true);

  useEffect(() => {
    getUsers();
    // setShowOnlineOnly(true); 
  }, [getUsers, onlineUsers]);

  const filteredUsers = showOnlineOnly
    ? users?.filter((user) => onlineUsers?.includes(user?._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <Grid size={12}>
      <Box sx={{ p: 1, color: theme.palette.primary.main }}>
        <Stack direction={"row"} spacing={1}>
          <PeopleAltIcon />
          <Typography>Contacts</Typography>
        </Stack>
        <FormControlLabel
          control={
            <Checkbox
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
          }
          label="Show online only"
        />
        <Box component={"span"} fontSize={14} ml={-1}>
          ({Math.max(0, onlineUsers.length - 1)} online)
        </Box>
      </Box>
      <Divider />
      <Grid
        size={12}
        py={1}
        sx={{ overflowY: "auto", maxHeight: "calc(100vh - 150px)" }}
      >
        {filteredUsers &&
          filteredUsers?.length > 0 &&
          filteredUsers?.map((user, idx) => {
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
                <ListItemButton
                  onClick={() => setSelectedUser(user)}
                  sx={{ px: 1 }}
                >
                  <ListItemAvatar>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant={
                        onlineUsers.includes(user._id) ? "dot" : "standard"
                      }
                    >
                      <Avatar
                        alt={`${user?.fullName}`}
                        src={`${user?.profilePic}`}
                      />
                    </StyledBadge>
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`${user?.fullName}`}
                    secondary={
                      onlineUsers.includes(user?._id) ? `online` : "offline"
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        {filteredUsers?.length === 0 && (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
          >
            <Typography color={"text.secondary"}>No online users</Typography>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default Sidebar;
