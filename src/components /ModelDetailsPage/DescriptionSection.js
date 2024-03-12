import React from "react";
import { Paper, Stack, Typography, Chip } from "@mui/material";

export const DescriptionSection = ({ data }) => {
  const descriptionParts = data.description.split('<python>');
  const normalText = descriptionParts[0];
  const codeText = descriptionParts[1] ? descriptionParts[1] : '';

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: '10px', backgroundColor: '#f7f7f7', marginBottom: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5" component="div" style={{ color: '#333' }}>Description</Typography>
        <Typography variant="body1" color="#333">{normalText}</Typography>
        {codeText && (
          <Paper sx={{ backgroundColor: '#333', padding: '16px', borderRadius: '4px' }}>
            <Typography variant="body1" style={{ color: '#f7f7f7', whiteSpace: 'pre-wrap' }}>
              {codeText}
            </Typography>
          </Paper>
        )}
        <Stack direction="row" spacing={1}>
          {data.tags.map((tag, index) => (
            <Chip key={index} label={tag} variant="outlined" color="primary" />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};
