import React from "react";
import { Card, CardContent, CardActions, Link, Typography, IconButton, CardMedia } from "@mui/material";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'; 
import Slider from "react-slick";
import axios from "axios";

// Image imports
import AmazonBg from './images/amazon.webp';
import XBg from './images/x.webp';
import GoogleBg from './images/google.webp';
import MicrosoftBg from './images/microsoft.webp';
import OpensourceBg from './images/opensource.webp';
import OpenaiBg from './images/openai.webp';
import AnthropicBg from './images/anthropic.webp';

const ownerBackgroundImages = {
  "Amazon": AmazonBg,
  "X": XBg,
  "Google": GoogleBg,
  "Microsoft": MicrosoftBg,
  "Open Source Community": OpensourceBg,
  "OpenAI": OpenaiBg,
  "Claude AI": AnthropicBg,
};

export const FeaturedModels = ({ modelData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600, 
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1,
        }
      }
    ],
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

const Item = ({ model }) => {

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
      const response = await axios.post(`https://atlan-backend-acf306a15a9e.herokuapp.com/api/model/${modelId}/upvote`);
      console.log("Upvote response:", response);
    } catch (error) {
      console.error("Error upvoting model:", error);
    }
  };

  return ( 
    <Card sx={{ maxWidth: '75%', margin: 'auto', borderRadius: '20px', overflow: 'visible'}}> 
      <CardMedia
        component="img"
        height="200"
        image={ownerBackgroundImages[model.owner__slug] || OpensourceBg}
        alt="Model background"
      />
      <CardContent style={{ height: '100%' }}>
        <Typography variant="h6" sx={{ fontSize: '40px', fontFamily: 'Kode Mono, monospace', textAlign: 'center' }}> 
          {model.slug}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ textAlign: 'center' }}>
          developed by {model.owner__slug}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <IconButton
          variant="outlined"
          onClick={() => handleUpvoteClick(model.id)}
        >
          {formatNumber(model.total_upvote)} <ThumbUpAltOutlinedIcon 
           sx={{marginLeft: '6px'}} />
        </IconButton>
        <IconButton disabled>
          {formatNumber(model.total_view)} <VisibilityOutlinedIcon 
          sx={{marginLeft: '6px'}} /> 
        </IconButton>
      </CardActions>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Link href={model.tryitout_link} target="_blank" color="#4CAF50">
          Try it Out
        </Link>
      </CardActions>
    </Card>
  );
};
