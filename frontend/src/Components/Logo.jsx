import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Link } from "react-router-dom";

const Logo = ({ fontSize = "large", logoText = true, smPadding = 1 }) => {
  return (
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        {logoText && <Typography variant="h6">Chat App</Typography>}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: 4,
            width: "fit-content",
            p: { xs: smPadding, md: 1 },
            borderRadius: "16%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <ChatBubbleOutlineIcon color="primary" fontSize={fontSize} />
        </Box>
      </Stack>
    </Link>
  );
};

export default Logo;
