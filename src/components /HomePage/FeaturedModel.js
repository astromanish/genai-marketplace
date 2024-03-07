import React from "react";
import { Grid, Card, CardContent, CardActions, Link, Typography, IconButton } from "@mui/material";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'; // Import the visibility icon
import Carousel from "react-material-ui-carousel";
import axios from "axios";

export const FeaturedModels = ({ modelData }) => {
  return (
    <div style={{ backgroundColor: '#eee', padding: '20px', marginTop: '20px' }}> {/* Change background color of the main div */}
      <h2>Featured Models</h2> 
      <Carousel sx={{ height: '270px' }}>
        {modelData
          .filter((model) => model.featured)
          .map((model) => (
            <Item key={model.id} model={model} /> 
          ))}
      </Carousel>
    </div>
  );
};

const Item = (props) => {

  const handleUpvoteClick = async (modelId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/model/${modelId}/upvote`);
      console.log("Upvote response:", response);
    } catch (error) {
      console.error("Error upvoting model:", error);
    }
  };

  return ( 
    <Card sx={{ maxWidth: '75%', margin: 'auto', borderRadius: '20px'}}> 
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: '60px', fontFamily: 'Kode Mono, monospace', textAlign: 'center' }}> 
          {props.model.slug}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ textAlign: 'center' }}>
          built by {props.model.owner__slug}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <IconButton
          variant="outlined"
          onClick={() => handleUpvoteClick(props.model.id)}
        >
          {props.model.total_upvote} <ThumbUpAltOutlinedIcon />
        </IconButton>
        <IconButton disabled>
          {props.model.total_view} <VisibilityOutlinedIcon /> 
        </IconButton>
      </CardActions>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Link href={props.model.tryitout_link} target="_blank">
          Try it Out
        </Link>
      </CardActions>
    </Card>
  );
};
