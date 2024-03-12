import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function OwnerSelect({ value, onChange, owners }) {
  return (
    <FormControl fullWidth>
      <InputLabel style={{ color: '#808080' }}>Owner</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        required
      >
        {owners.map((owner) => (
          <MenuItem key={owner.pk} value={owner.pk} style={{ color: '#424242' }}>
            {owner.fields.slug}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default OwnerSelect;
