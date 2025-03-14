import React from "react";
import { Skeleton, Stack } from "@mui/material";

const MessageSkeleton = () => {
  return (
    <Stack spacing={1} p={1} width="100%">
      {/* Simulating multiple message bubbles */}
      {[...Array(10)].map((_, index) => (
        <Stack
          key={index}
          direction={index % 2 === 0 ? "row" : "row-reverse"}
          spacing={1}
          alignItems="center"
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton
            variant="rectangular"
            width={120 + Math.random() * 80}
            height={30}
            sx={{ borderRadius: 2 }}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default MessageSkeleton;
