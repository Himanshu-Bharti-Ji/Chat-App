import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import {
  Avatar,
  Box,
  Grid2 as Grid,
  IconButton,
  ListItemAvatar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { StyledBadge } from "./HelperStructure";

const ChatHeader = () => {
  const theme = useTheme();
  const { onlineUsers } = useAuthStore();
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <Grid size={"auto"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        p={{ xs: 1, md: 2 }}
        sx={{ boxShadow: 1, backgroundColor: theme.palette.background.paper }}
      >
        <Stack direction={"row"} spacing={0}>
          <ListItemAvatar>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant={
                onlineUsers.includes(selectedUser?._id) ? "dot" : "standard"
              }
            >
              <Avatar
                src={selectedUser?.profilePic}
                alt={selectedUser?.fullName}
              />
            </StyledBadge>
          </ListItemAvatar>
          <Stack spacing={0}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: 16, md: 18 },
              }}
            >
              {selectedUser?.fullName}
            </Typography>
            <Typography sx={{ fontSize: { xs: 12, md: 14 } }}>
              {onlineUsers?.includes(selectedUser?._id) ? "Online" : "Offline"}
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <IconButton aria-label="close" onClick={() => setSelectedUser(null)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      </Stack>
    </Grid>
  );
};

export default ChatHeader;
