import React from "react";
import { Paper, Stack, Typography, Chip, IconButton, Link } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export const HeaderSection = ({ data }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: '10px', backgroundColor: '#f7f7f7', marginBottom: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <div>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>{data.slug}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            developed by {data.owner_slug}
          </Typography>
          <Typography variant="body1" color="#333">{new Date(data.generated_date).toDateString()}</Typography>
        </div>
        <div>
          <Stack direction="row" spacing={1}>
            {data.frameworks && <Chip label={data.frameworks} color="secondary" style={{ backgroundColor: '#424242', color: '#fff' }} />}
          </Stack>
          <div>
            <IconButton size="small" style={{ color: '#333' }}><ThumbUpAltIcon fontSize="small" /> {data.upvotes.length > 0 ? data.upvotes[0].count : 0}</IconButton>
            <IconButton size="small" style={{ color: '#333' }}><VisibilityIcon fontSize="small" /> {data.views.length > 0 ? data.views[0].count : 0}</IconButton>
          </div>
          <Typography variant="body1">
            <Link href={data.tryitout_link} style={{ color: '#4CAF50' }}>Try it out</Link>
          </Typography>
        </div>
      </Stack>
    </Paper>
  );
};

export default HeaderSection;
