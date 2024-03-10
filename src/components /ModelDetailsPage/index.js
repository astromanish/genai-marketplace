import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Grid,
  Link,
  IconButton,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

function ModelDetailsPage() {
  
  let { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/model/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Grid container spacing={2} justifyContent="center"> 
      <Grid item xs={12} md={8}>
        {data && (
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
        )}
      </Grid>
      <Grid item xs={12} md={8}>
        {data && (
          <Paper elevation={3} sx={{ padding: 3, borderRadius: '10px', backgroundColor: '#f7f7f7' }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="div" style={{ color: '#333' }}>Description</Typography>
              <Typography variant="body1" color="#333">{data.description}</Typography>
            </Stack>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}

export default ModelDetailsPage;
