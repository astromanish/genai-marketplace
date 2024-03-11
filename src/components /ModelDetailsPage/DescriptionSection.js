import React from "react";
import { Paper, Stack, Typography } from "@mui/material";

export const DescriptionSection = ({ data }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: '10px', backgroundColor: '#f7f7f7', marginBottom: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5" component="div" style={{ color: '#333' }}>Description</Typography>
        <Typography variant="body1" color="#333">{data.description}</Typography>
      </Stack>
    </Paper>
  );
};

