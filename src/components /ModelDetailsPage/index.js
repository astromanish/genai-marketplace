import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Grid,
  Link,
  Button,
  IconButton,
  Paper,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import LaunchIcon from "@mui/icons-material/Launch";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#D4F3FF",
    },
    secondary: {
      main: "#347ACC",
    },
    background: {
      default: '#F1F5F9'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', 
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true, 
      },
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: '#347ACC',
          color: 'white',
          '&:hover': {
            backgroundColor: '#2969B3', 
          }
        }
      }
    }
  }
});

function ModelDetailsPage() {
  
  let a = useParams();
  let modelId = a.id;

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/model/${modelId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [modelId]);

  return (
    <ThemeProvider theme={myTheme}>
      <Grid container spacing={0}> 
        <Grid item xs={12} md={8}>
          {data && (
            <Paper elevation={3} sx={{ padding: 2, borderRadius: '10px', backgroundColor: 'white' }}> 
              <Stack spacing={1}> 
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{data.slug}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  built on {data.frameworks}
                </Typography>
                <Typography variant="body1">{new Date(data.generated_date).toDateString()}</Typography>
                <Typography variant="body1">
                  <IconButton size="small"><ThumbUpAltIcon fontSize="small" /> {data.upvotes.length > 0 ? data.upvotes[0].count : 0}</IconButton>
                  <IconButton size="small"><VisibilityIcon fontSize="small" /> {data.views.length > 0 ? data.views[0].count : 0}</IconButton>
                </Typography>
                <Typography variant="body1">
                  <LaunchIcon fontSize="small" /> <Link href={data.tryitout_link}>Try it out</Link>
                </Typography>
              </Stack>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {data && (
            <Paper elevation={3} sx={{ padding: 2, borderRadius: '10px', backgroundColor: 'white' }}>
              <Stack spacing={2}>
                <Typography variant="h5" component="div">Description</Typography>
                <Typography variant="body1">{data.description}</Typography>
              </Stack>
            </Paper>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ModelDetailsPage;
