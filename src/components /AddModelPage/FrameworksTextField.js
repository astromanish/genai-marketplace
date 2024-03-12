import React from "react";
import TextField from "@mui/material/TextField";

function FrameworksTextField({ value, onChange }) {
  return (
    <TextField
      fullWidth
      label="Framework Name"
      name="frameworks"
      value={value}
      onChange={onChange}
      required
      color="secondary"
    />
  );
}

export default FrameworksTextField;
