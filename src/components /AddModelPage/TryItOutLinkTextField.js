import React from "react";
import TextField from "@mui/material/TextField";

function TryItOutLinkTextField({ value, onChange }) {
  return (
    <TextField
      fullWidth
      label="Online Link"
      name="tryitout_link"
      value={value}
      onChange={onChange}
      required
      color="secondary"
    />
  );
}

export default TryItOutLinkTextField;
