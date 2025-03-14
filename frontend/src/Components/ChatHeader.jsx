import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import {
  Avatar,
  Box,
  Grid2 as Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ChatHeader = () => {
  const theme = useTheme();
  const { onlineUsers } = useAuthStore();
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <Grid size={"auto"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        p={2}
        sx={{ boxShadow: 1, backgroundColor: theme.palette.background.paper }}
      >
        <Stack direction={"row"} spacing={1.5}>
          <Avatar src={selectedUser?.profilePic} alt={selectedUser?.fullName} />
          <Stack spacing={0}>
            <Typography
              sx={{ color: theme.palette.primary.main, fontSize: 18 }}
            >
              {selectedUser?.fullName}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
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
