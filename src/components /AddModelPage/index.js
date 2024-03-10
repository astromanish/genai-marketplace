import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Typography, 
  Grid, 
  TextField, 
  Button,
  Chip,
  Stack,
  Container,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Menu
} from "@mui/material";

function AddModelPage() {
  const [formData, setFormData] = useState({
    slug: "",
    owner_id: "", 
    description: "",
    generated_date: new Date().toISOString(), 
    frameworks: "",
    tags: [],
    tryitout_link: "",
  });
  const [tags, setTags] = useState([]);
  const [owners, setOwners] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsResponse = await axios.get(`http://localhost:8000/api/tags`);
        setTags(tagsResponse.data.tags);
        const ownersResponse = await axios.get(`http://localhost:8000/api/owners`);
        setOwners(ownersResponse.data.owners);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTagDelete = (tagToDelete) => () => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleTagSelect = (event) => {
    setFormData({
      ...formData,
      tags: event.target.value,
    });
    setAnchorEl(null);
  };

  const handleOwnerSelect = (event) => {
    setFormData({
      ...formData,
      owner_id: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/model/add",
        formData
      );
      console.log(response);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Box mt={4} mb={4} textAlign="center">
        <Typography variant="h3" style={{ color: '#333' }}>Add Model</Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="What can it do?"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Which framework it was built upon?"
                  name="frameworks"
                  value={formData.frameworks}
                  onChange={handleChange}
                  required
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Where can I get my hands dirty?"
                  name="tryitout_link"
                  value={formData.tryitout_link}
                  onChange={handleChange}
                  required
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: '#808080' }}>Owner</InputLabel>
                  <Select
                    value={formData.owner_id}
                    onChange={handleOwnerSelect}
                    required
                  >
                    {owners.map((owner) => (
                      <MenuItem key={owner} value={owner} style={{ color: '#424242' }}>
                        {owner}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => (
                      <Stack spacing={1} direction="row">
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            onDelete={handleTagDelete(value)}
                            style={{ backgroundColor: '#808080', color: '#fff' }}
                          />
                        ))}
                      </Stack>
                    ),
                  }}
                  onClick={handleFilterClick}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag} value={tag} style={{ color: '#424242' }}>
                      {tag}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" style={{ backgroundColor: '#333', color: '#fff' }}>
                  Add Model
                </Button>
              </Grid>
            </Grid>
          </form>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} onClick={() => handleTagSelect(tag)} style={{ color: '#424242' }}>
                {tag}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddModelPage;
