import React from "react";
import { FormControl, FormControlLabel, FormGroup, Checkbox, FormLabel } from "@mui/material";

function TagsCheckbox({ tags, formData, handleTagToggle }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Tags</FormLabel>
      <FormGroup>
        {tags.map((tag) => (
          <FormControlLabel
            key={tag.pk}
            control={
              <Checkbox
                checked={formData.tags.includes(tag.pk)}
                onChange={(event) => handleTagToggle(tag, event.target.checked)}
                name={tag.fields.name}
              />
            }
            label={tag.fields.name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default TagsCheckbox;
