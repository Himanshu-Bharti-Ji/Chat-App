import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import {
  Avatar,
  Badge,
  Box,
  Grid2 as Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MyInput from "./MyInput";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeIamge = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSendMessage = async (values, { resetForm }) => {
    if (!values.message.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text: values.message.trim(),
        image: imagePreview,
      });
      resetForm();
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.log("Error in handleSendMessage : ", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Grid size={"auto"} px={{ xs: 1, md: 2 }} py={1}>
      {imagePreview && (
        <Badge
          overlap="circular"
          sx={{ position: "relative" }}
          badgeContent={
            <IconButton
              size="small"
              onClick={removeIamge}
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
          }
        >
          <Avatar
            variant="rounded"
            src={imagePreview}
            sx={{ width: 80, height: 80, objectFit: "cover" }}
          />
        </Badge>
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
                  />
                  <IconButton onClick={() => fileInputRef.current?.click()}>
                    <ImageOutlinedIcon
                      sx={{ color: imagePreview ? "green" : "lightgray" }}
                    />
                  </IconButton>

                  <IconButton
                    type="submit"
                    disabled={!imagePreview && !props.values.message.trim()}
                  >
                    <SendIcon fontSize="small" />
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
