import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";

const FormikSubmitButton = ({ id, title, onLoadingTitle }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={id ? true : false}
      fullWidth
      sx={{
        textTransform: "capitalize",
        fontWeight: 600,
        fontSize: "1rem",
      }}
    >
      {id ? (
        <>
          <CircularProgress size={20} color="inherit" />
          <Box component={"span"} ml={1}>
            {onLoadingTitle || title}
          </Box>
        </>
      ) : (
        title
      )}
    </Button>
  );
};

export default FormikSubmitButton;
