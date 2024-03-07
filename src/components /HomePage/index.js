import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Link,
  ThemeProvider, 
  createTheme,
  styled,
  IconButton
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif", // Replace with your desired cool font
  },
});

const StyledTypography = styled(Typography)`
  font-weight: bold;
  /* Add other font styling as desired */
`;

const handleUpvoteClick = async (modelId) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/model/${modelId}/upvote`);
    console.log("Upvote response:", response);
  } catch (error) {
    console.error("Error upvoting model:", error);
  }
};


function HomePage() {
  const [modelData, setModelData] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/model");
        setModelData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
      <AppBar position="static">
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <StyledTypography variant="h6">AI Marketplace</StyledTypography>
              </Grid>
              <Grid item>
                <Button 
                  variant="contained" 
                  size="small" 
                  onClick={() => navigate("/model/add")}
                >
                  Add Model
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {/* Featured Models Section */}
        <h2>Featured Models</h2>
        <Carousel>
            {modelData.filter(model => model.featured).map((model) => (
              <FeaturedItem key={model.id} model={model} /> 
            ))}
        </Carousel>


        {/* All Models Section */}
        <h2>All Models</h2> 
        <Grid container spacing={3}>
          {modelData.map((model) => (
            <Grid item xs={12} sm={6} md={4} key={model.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{model.slug}</Typography>
                  <Typography variant="subtitle2" color="text.secondary"> 
                    built on {model.frameworks}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>{model.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate(`/model/${model.id}`)}>
                    More Details
                  </Button>
                  <Link href={model.tryitout_link} target="_blank">
                    Try it Out
                  </Link>
                  <IconButton onClick={() => handleUpvoteClick(model.id)}>
                    <ThumbUpAltIcon fontSize="small" /> 
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </ThemeProvider>
  );
}

function FeaturedItem(props) {
  return ( 
    <Card sx={{ maxWidth: '50%', margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: '20px' }}>{props.model.slug}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          built on {props.model.frameworks}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={props.model.tryitout_link} target="_blank">
          Try it Out
        </Link>
        <IconButton onClick={() => handleUpvoteClick(props.model.id)}>
          <ThumbUpAltIcon fontSize="small" /> 
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default HomePage;
