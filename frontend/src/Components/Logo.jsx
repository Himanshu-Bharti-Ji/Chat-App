import { Box } from "@mui/material";
import React from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Logo = ({ fontSize = "large" }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: 4,
        width: "fit-content",
        p: 1,
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
  );
};

export default Logo;
