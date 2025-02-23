import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomTextField = ({
  field, // Formik field prop
  form: { touched, errors }, // Formik form prop
  type = "text",
  label,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isError = touched[field.name] && errors[field.name];

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      {...field}
      {...props}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      label={label}
      required={required}
      fullWidth
      variant="outlined"
      error={!!isError}
      helperText={isError ? errors[field.name] : ""}
      InputProps={{
        ...props.InputProps,
        endAdornment: type === "password" && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          borderRadius: 1,
          ...props.InputProps?.sx,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: "primary.main",
          },
        },
        ...props.sx,
      }}
    />
  );
};

export default CustomTextField;
