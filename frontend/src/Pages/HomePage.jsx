import React from "react";
import { Grid2 as Grid, Paper } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import NoChatSelected from "../Components/NoChatSelected";
import ChatContainer from "../Components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <Grid
      container
      height={"90vh"}
      alignItems={"center"}
      justifyContent={"center"}
      py={2}
    >
      <Grid size={8} height={"100%"}>
        <Paper
          sx={{
            height: "100%",
            p: 1,
          }}
        >
          <Grid container height={"100%"}>
            <Grid size={3}>
              <Sidebar />
            </Grid>
            <Grid
              size={9}
              sx={{
                borderLeft: "1px solid",
                borderColor: "rgba(255, 255, 255, 0.12)",
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
