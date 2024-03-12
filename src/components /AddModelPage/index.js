import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography, Button, Menu, MenuItem } from "@mui/material";

import SlugTextField from "./SlugTextField";
import DescriptionEditor from "./DescriptionEditor";
import FrameworksTextField from "./FrameworksTextField";
import TryItOutLinkTextField from "./TryItOutLinkTextField";
import OwnerSelect from "./OwnerSelect";
import TagsCheckbox from "./TagsCheckbox";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function AddModelPage() {
  const [formData, setFormData] = useState({
    slug: "",
    owner_id: "",
    description: EditorState.createEmpty(),
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
        const tagsResponse = await axios.get(`https://backend-orntt06q0-manish-singhs-projects-fb106251.vercel.app/api/tags`);
        setTags(JSON.parse(tagsResponse.data.tags));
        const ownersResponse = await axios.get(`https://backend-orntt06q0-manish-singhs-projects-fb106251.vercel.app/api/owners`);
        setOwners(JSON.parse(ownersResponse.data.owners));
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

  const handleTagToggle = (tag, checked) => {
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tag.pk],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        tags: prevData.tags.filter((t) => t !== tag.pk),
      }));
    }
  };
  

  const handleOwnerSelect = (event) => {
    setFormData({
      ...formData,
      owner_id: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Convert EditorState to string
    const descriptionString = formData.description.getCurrentContent().getPlainText();
  
    try {
      const response = await axios.post(
        "https://backend-orntt06q0-manish-singhs-projects-fb106251.vercel.app/api/model/add",
        {
          ...formData,
          description: descriptionString, // Send description as a string
        }
      );
      console.log(response);
  
      // Clear form fields after successful submission
      setFormData({
        slug: "",
        owner_id: "",
        description: EditorState.createEmpty(),
        generated_date: new Date().toISOString(),
        frameworks: "",
        tags: [],
        tryitout_link: "",
      });
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
    <Box bgcolor="#424242" minHeight="100vh" py={8} display="flex" justifyContent="center" alignItems="center">
      <Container maxWidth="md">
        <Box bgcolor="#fff" p={4} boxShadow={4} borderRadius={8}>
          <Typography variant="h4" color="textPrimary" mb={4} textAlign="center" fontWeight="bold" fontSize="2rem">
            Add Model
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <SlugTextField value={formData.slug} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <DescriptionEditor editorState={formData.description} onEditorStateChange={(editorState) => setFormData({ ...formData, description: editorState })} />
              </Grid>
              <Grid item xs={12}>
                <FrameworksTextField value={formData.frameworks} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TryItOutLinkTextField value={formData.tryitout_link} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <OwnerSelect value={formData.owner_id} onChange={handleOwnerSelect} owners={owners} />
              </Grid>
              <Grid item xs={12}>
                <TagsCheckbox tags={tags} formData={formData} handleTagToggle={handleTagToggle} />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button variant="contained" type="submit" style={{ backgroundColor: '#333', color: '#fff', borderRadius: 50, padding: '15px 30px', fontSize: '1.2rem', fontWeight: 'bold' }}>
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
              <MenuItem key={tag.pk} onClick={() => handleTagToggle(tag)} style={{ color: '#424242' }}>
                {tag.fields.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Container>
    </Box>
  );
}

export default AddModelPage;
