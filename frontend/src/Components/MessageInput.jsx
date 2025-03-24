import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  Grid2 as Grid,
  IconButton,
  Stack,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MyInput from "./MyInput";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";

const MessageInput = () => {
  const [image, setImage] = useState({ file: null, preview: null });
  const fileInputRef = useRef(null);
  const { sendMessage, isSendingMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    setImage({ file, preview: URL.createObjectURL(file) });
  };

  const removeImage = () => {
    if (isSendingMessage) return;
    setImage({ file: null, preview: null });
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSendMessage = async (values, { resetForm }) => {
    if (!values.message.trim() && !image.file) return;

    try {
      const formData = new FormData();
      formData.append("text", values.message.trim());
      if (image.file) formData.append("image", image.file);

      await sendMessage(formData);

      resetForm();
      setImage({ file: null, preview: null });
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Grid size={"auto"} px={{ xs: 1, md: 2 }} py={1}>
      {image.preview && (
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Badge
            overlap="circular"
            sx={{ position: "relative" }}
            badgeContent={
              !isSendingMessage && (
                <IconButton
                  size="small"
                  onClick={removeImage}
                  sx={{
                    color: "white",
                    backgroundColor: "red",
                    "&:hover": { backgroundColor: "#d32f2f" },
                    position: "absolute",
                    top: -12,
                    right: -12,
                  }}
                >
                  <CloseRoundedIcon fontSize="inherit" />
                </IconButton>
              )
            }
          >
            <Avatar
              variant="rounded"
              src={image.preview}
              sx={{
                width: 80,
                height: 80,
                objectFit: "cover",
                opacity: isSendingMessage ? 0.5 : 1,
              }}
            />
          </Badge>

          {isSendingMessage && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                borderRadius: "4px",
              }}
            >
              <CircularProgress size={24} sx={{ color: "white" }} />
            </Box>
          )}
        </Box>
      )}

      <Formik
        initialValues={{
          message: "",
        }}
        onSubmit={handleSendMessage}
      >
        {(props) => (
          <Box component={"form"} width={"100%"} onSubmit={props.handleSubmit}>
            <Grid container alignItems={"center"}>
              <Grid size="grow">
                <MyInput
                  name="message"
                  placeholder="Type a message..."
                  formikProps={props}
                />
              </Grid>

              <Grid size="auto">
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    disabled={isSendingMessage}
                  />
                  <IconButton
                    onClick={() =>
                      !isSendingMessage && fileInputRef.current?.click()
                    }
                    disabled={isSendingMessage}
                  >
                    <ImageOutlinedIcon
                      sx={{ color: image.preview ? "green" : "lightgray" }}
                    />
                  </IconButton>

                  <IconButton
                    type="submit"
                    disabled={
                      isSendingMessage ||
                      (!image.file && !props.values.message.trim())
                    }
                  >
                    {isSendingMessage ? (
                      <CircularProgress size={20} />
                    ) : (
                      <SendIcon fontSize="small" />
                    )}
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Grid>
  );
};

export default MessageInput;
