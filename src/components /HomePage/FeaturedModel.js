import React from "react";
import {Card, CardContent, CardActions, Link, Typography, IconButton } from "@mui/material";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'; // Import the visibility icon
import Slider from "react-slick";
import axios from "axios";

export const FeaturedModels = ({ modelData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 2,
    slidesToScroll: 2
  };
  return (
    <div className="slider-container" style={{ backgroundColor: '#808080', padding: '20px', marginTop: '20px', minHeight: '250px'}}>
      <Slider {...settings}>
        {modelData
          .filter((model) => model.featured)
          .map((model) => (
            <Item key={model.id} model={model} /> 
          ))}
      </Slider>
    </div>
  );
};

const Item = (props) => {

  const formatNumber = (num) => {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1) + "k";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else {
      return num;
    }
  };

  const handleUpvoteClick = async (modelId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/model/${modelId}/upvote`);
      console.log("Upvote response:", response);
    } catch (error) {
      console.error("Error upvoting model:", error);
    }
  };

  return ( 
    <Card sx={{ maxWidth: '75%', margin: 'auto', borderRadius: '20px', overflow: 'visible'}}> 
      <CardContent style={{ height: '100%' }}>
        <Typography variant="h5" sx={{ fontSize: '60px', fontFamily: 'Kode Mono, monospace', textAlign: 'center' }}> 
          {props.model.slug}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ textAlign: 'center' }}>
          developed by {props.model.owner__slug}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <IconButton
          variant="outlined"
          onClick={() => handleUpvoteClick(props.model.id)}
        >
          {formatNumber(props.model.total_upvote)} <ThumbUpAltOutlinedIcon 
           sx={{marginLeft: '6px'}} />
        </IconButton>
        <IconButton disabled>
          {formatNumber(props.model.total_view)} <VisibilityOutlinedIcon 
          sx={{marginLeft: '6px'}} /> 
        </IconButton>
      </CardActions>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Link href={props.model.tryitout_link} target="_blank" color="#4CAF50">
          Try it Out
        </Link>
      </CardActions>
    </Card>
  );
};
