import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { LineChart } from "./LineChart";

export const ChartSection = ({ data }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: '10px', backgroundColor: '#f7f7f7' }}>
      <Stack spacing={2}>
        <Typography variant="h5" component="div" style={{ color: '#333' }}>Charts</Typography>
        <LineChart data={{
          labels: data.views.map(entry => entry.date),
          datasets: [{
            label: 'View Count',
            data: data.views.map(entry => entry.count),
            borderColor: '#3e82fc',
            fill: false
          }]
        }} title="Day vs View Count" />
        <LineChart data={{
          labels: data.upvotes.map(entry => entry.date),
          datasets: [{
            label: 'Upvote Count',
            data: data.upvotes.map(entry => entry.count),
            borderColor: '#4caf50',
            fill: false
          }]
        }} title="Day vs Upvote Count" />
      </Stack>
    </Paper>
  );
};

