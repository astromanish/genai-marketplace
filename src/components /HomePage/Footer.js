import React from "react";
import { Typography, Box } from "@mui/material";

export const Footer = () => {
  return (
    <Box mt={4} textAlign="center" bgcolor="#111" color="white" py={2}>
      <Typography variant="body1">
        Built with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by Manish Singh
      </Typography>
    </Box>
  );
};

