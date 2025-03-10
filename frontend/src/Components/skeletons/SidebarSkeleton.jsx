import React from "react";
import {
  Box,
  Skeleton,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

const SidebarSkeleton = () => {
  return (
    <List>
      {[...Array(6)].map((_, index) => (
        <ListItem key={index} sx={{ paddingY: 1 }}>
          <ListItemAvatar>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </ListItemAvatar>

          <ListItemText
            primary={<Skeleton variant="text" width={120} height={20} />}
            secondary={<Skeleton variant="text" width={80} height={15} />}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarSkeleton;
