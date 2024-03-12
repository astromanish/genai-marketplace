import React from "react";
import TextField from "@mui/material/TextField";

function SlugTextField({ value, onChange }) {
  return (
    <TextField
      fullWidth
      label="Model Name"
      name="slug"
      value={value}
      onChange={onChange}
      required
      color="secondary"
    />
  );
}

export default SlugTextField;
