import React from "react";
import { Paper, Stack, Typography, Chip } from "@mui/material";

export const DescriptionSection = ({ data }) => {
  const descriptionParts = data.description.split('<python>');
  const normalText = descriptionParts[0];
  const codeText = descriptionParts[1] ? descriptionParts[1] : '';

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: '10px', backgroundColor: '#f7f7f7', marginBottom: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5" component="div" sx={{ color: '#333' }}>Description</Typography>
        <Typography variant="body1" sx={{ color: '#333' }}>{normalText}</Typography>
        {codeText && (
          <Paper sx={{ backgroundColor: '#333', padding: '16px', borderRadius: '4px', mt: 2 }}>
            <Typography variant="body1" sx={{ color: '#f7f7f7', whiteSpace: 'pre-wrap' }}>
              {codeText}
            </Typography>
          </Paper>
        )}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
          {data.tags.map((tag, index) => (
            <Chip key={index} label={tag} variant="outlined" color="primary" />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};
