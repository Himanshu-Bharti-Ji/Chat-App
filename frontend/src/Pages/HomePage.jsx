import React from "react";
import { Grid2 as Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import NoChatSelected from "../Components/NoChatSelected";
import ChatContainer from "../Components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      container
      height={{ xs: "100dvh", md: "100sh" }}
      alignItems={"center"}
      justifyContent={"center"}
      p={2}
    >
      <Grid size={{ xs: 12, md: 8 }} height={"100%"}>
        <Paper
          sx={{
            height: "100%",
            p: 1,
            overflow: "hidden",
          }}
        >
          <Grid container height={"100%"}>
            <Grid
              size={{ xs: 12, md: 3 }}
              display={selectedUser && isMobile ? "none" : "block"}
            >
              <Sidebar />
            </Grid>
            <Grid
              size={{ xs: 12, md: 9 }}
              sx={{
                borderLeft: {
                  xs: "none",
                  md: "1px solid rgba(255, 255, 255, 0.12)",
                },
              }}
            >
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HomePage;
