import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardActions, Button, Link, Typography, IconButton, AppBar, Toolbar, Menu, MenuItem, Chip } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AllModels = ({ modelData }) => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredModels, setFilteredModels] = useState(modelData);

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

  useEffect(() => {
    const filtered = modelData.filter((model) => selectedTags.length === 0 || model.tags.some(tag => selectedTags.includes(tag)));
    setFilteredModels(filtered);
  }, [selectedTags, modelData]);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleUpvoteClick = async (modelId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/model/${modelId}/upvote`);
      console.log("Upvote response:", response);
    } catch (error) {
      console.error("Error upvoting model:", error);
    }
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ backgroundColor: '#808080', padding: '20px'}}>
      <AppBar position="static" sx={{ backgroundColor: '#424242'}}>
        <Toolbar>
          <IconButton onClick={handleFilterClick} color="inherit">
            <FilterListIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} onClick={() => handleTagClick(tag)}>
                {tag}
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Filter by Tags
          </Typography>
          <div>
            {selectedTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={handleDeleteTag(tag)}
                color="primary"
                style={{ marginRight: 5 }}
              />
            ))}
          </div>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        {filteredModels.map((model) => (
          <Grid item xs={12} sm={6} md={4} key={model.id}>
            <Card sx={{borderRadius: '10px', margin: "10px", padding: "5px"}}>
              <CardContent>
                <Typography variant="h5">{model.slug}</Typography>
                <Typography variant="subtitle2" color="text.secondary"> 
                  developed by {model.owner__slug}
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={model.tryitout_link} target="_blank" color="#4CAF50">
                  Try it Out
                </Link>
                <Button size="small" onClick={() => navigate(`/model/${model.id}`)} sx={{color: '#3B82F6'}}>
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
