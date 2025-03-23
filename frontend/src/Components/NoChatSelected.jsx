import { Stack, Typography, useTheme, Box, keyframes } from "@mui/material";
import React from "react";
import Logo from "./Logo";

// Tailwind's animate-bounce equivalent in MUI
const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); } 
  50% { transform: translateY(-25%); } 
`;

const NoChatSelected = () => {
  const theme = useTheme();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100%"
      spacing={2}
    >
      <Box
        sx={{
          animation: `${bounceAnimation} 1s infinite`,
        }}
      >
        <Logo logoText={false} />
      </Box>
      <Typography variant="h6" color="primary" fontWeight={700}>
        No chat selected
      </Typography>
      <Typography variant="body2" color={theme.palette.secondary.main}>
        Pick a conversation and start chatting!
      </Typography>
    </Stack>
  );
};

export default NoChatSelected;
