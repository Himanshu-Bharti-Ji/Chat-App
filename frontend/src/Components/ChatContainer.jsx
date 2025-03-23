import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Avatar, Box, Grid2 as Grid, Typography } from "@mui/material";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { getFormatedDate } from "../lib/helper";

const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    isMessagesLoading,
    getMessages,
    subscribeToMessages,
    unSubscribeToMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser?._id);

    subscribeToMessages();

    return () => unSubscribeToMessages();
  }, [selectedUser?._id, getMessages]);

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && messages && messages?.length > 0) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <Grid
      container
      flexDirection={"column"}
      sx={{ height: "100%", overflow: "hidden" }}
    >
      <ChatHeader />

      {/* Messages Container */}
      <Grid size={"grow"} sx={{ overflowY: "auto", overflowX: "hidden" }}>
        <Grid
          container
          spacing={2}
          sx={{
            overflowY: "auto",
            p: 2,
          }}
        >
          {messages &&
            messages?.length > 0 &&
            messages?.map((message) => {
              const isSender = message?.senderId === authUser?._id;
              return (
                <Grid size={12} key={message?._id}>
                  <Box
                    key={message?._id}
                    ref={messageEndRef}
                    sx={{
                      display: "flex",
                      justifyContent: isSender ? "flex-end" : "flex-start",
                      alignItems: "start",
                    }}
                  >
                    {/* Avatar */}
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                    >
                      {!isSender && (
                        <Avatar
                          src={selectedUser?.profilePic || "/avatar.png"}
                          sx={{ width: 40, height: 40, mr: 1 }}
                        />
                      )}
                    </Box>

                    {/* Message Content */}
                    <Box
                      sx={{
                        maxWidth: "60%",
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: isSender
                          ? "secondary.main"
                          : "grey.300",
                        color: isSender ? "black" : "black",
                        wordWrap: "break-word",
                        textAlign: isSender ? "right" : "left",
                      }}
                    >
                      {/* Message Image */}
                      {message.image && (
                        <img
                          src={message?.image}
                          alt="Attachment"
                          style={{
                            maxWidth: "200px",
                            borderRadius: "8px",
                          }}
                        />
                      )}
                      {/* Message Text */}
                      {message.text && (
                        <Typography variant="body2">{message.text}</Typography>
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          textAlign: "right",
                          opacity: 0.6,
                          mt: 0.5,
                        }}
                      >
                        {getFormatedDate(message.createdAt, "hh:mm A")}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Grid>

      <MessageInput />
    </Grid>
  );
};

export default ChatContainer;
