import React from "react";
import { Paper, Stack, Typography, Chip, IconButton, Link } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export const HeaderSection = ({ data }) => {
  const formatNumber = (num) => {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1) + "k";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else {
      return num;
    }
  };

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
        <Stack direction="column" alignItems="center" spacing={1}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" style={{ color: '#333', marginRight: '2px' }}><ThumbUpAltIcon fontSize="small"/> {formatNumber(data.total_upvote)}</IconButton>
            <IconButton size="small" style={{ color: '#333', marginRight: '2px' }}><VisibilityIcon fontSize="small" /> {formatNumber(data.total_view)}</IconButton>
          </div>
          <Stack direction="row" alignItems="center" spacing={1}>
            {data.frameworks && <Chip label={data.frameworks} color="secondary" style={{ backgroundColor: '#424242', color: '#fff' }} />}
            <Typography variant="body1">
              <Link href={data.tryitout_link} style={{ color: '#4CAF50' }}>Try it out</Link>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default HeaderSection;
