import React, { useState } from "react";
import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  PersonOutlineOutlined as PersonIcon,
  EmailOutlined as EmailIcon,
  LockOutlined as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const iconMap = {
  fullName: PersonIcon,
  email: EmailIcon,
  password: LockIcon,
};

const MyInput = ({
  name,
  label,
  isRequired = false,
  disabled = false,
  formikProps,
  ...props
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const { values, errors, touched, handleChange, handleBlur } = formikProps;
  const IconComponent = iconMap[name];

  return (
    <Box>
      <Typography variant="body2" color={theme.palette.secondary.main}>
        {label}{" "}
        {isRequired && (
          <Box component="span" color="red">
            *
          </Box>
        )}
      </Typography>

      <TextField
        variant="outlined"
        size="small"
        fullWidth
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        type={name === "password" && !showPassword ? "password" : "text"}
        sx={{ mt: 0.5 }}
        {...props}
        InputProps={{
          startAdornment: IconComponent && (
            <InputAdornment position="start">
              <IconComponent sx={{ color: theme.palette.secondary.main }} />
            </InputAdornment>
          ),
          endAdornment:
            name === "password" ? (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? (
                    <VisibilityOff
                      sx={{ color: theme.palette.secondary.main }}
                    />
                  ) : (
                    <Visibility sx={{ color: theme.palette.secondary.main }} />
                  )}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        error={Boolean(
          errors[name] && (touched[name] || formikProps.submitCount > 0)
        )}
      />
      {errors[name] && (touched[name] || formikProps.submitCount > 0) && (
        <FormHelperText sx={{ color: "red" }}>{errors[name]}</FormHelperText>
      )}
    </Box>
  );
};

export default MyInput;
