import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardActions, Button, Link, Typography, IconButton } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AllModels = ({ modelData }) => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/tags`);
        setTags(response.data.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleUpvoteClick = async (modelId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/model/${modelId}/upvote`);
      console.log("Upvote response:", response);
    } catch (error) {
      console.error("Error upvoting model:", error);
    }
  };

  return (
    <div style={{ backgroundColor: '#ddd', padding: '20px', borderRadius: "5px" }}>
      <h2>All Models</h2>
      <Grid container spacing={3}>
        {modelData.map((model) => (
          <Grid item xs={12} sm={6} md={4} key={model.id}>
            <Card sx={{borderRadius: '10px', margin: "10px", padding: "5px"}}>
              <CardContent>
                <Typography variant="h5">{model.slug}</Typography>
                <Typography variant="subtitle2" color="text.secondary"> 
                  built by {model.owner__slug}
                </Typography>
              </CardContent>
              <CardActions>
              <Link href={model.tryitout_link} target="_blank">
                  Try it Out
                </Link>
                <Button size="small" onClick={() => navigate(`/model/${model.id}`)}>
                  More Details
                </Button>
                <IconButton onClick={() => handleUpvoteClick(model.id)}>
                  <ThumbUpAltIcon fontSize="small" /> 
                </IconButton>
                
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
