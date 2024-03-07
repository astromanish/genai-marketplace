import React, { useState } from "react";
import axios from "axios";
import { 
  Typography, 
  Grid, 
  TextField, 
  Button,
  Stack 
} from "@mui/material";

function AddModelPage() {
  const [formData, setFormData] = useState({
    slug: "",
    owner_id: 1, // Replace with appropriate owner ID
    description: "",
    generated_date: new Date().toISOString(), // Set to current date
    frameworks: "",
    tags: [], // Placeholder, you'll need to handle tag input separately
    tryitout_link: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
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
      // Handle successful submission (e.g., redirect, display a message)
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle submission error
    }
  };

  return (
    <div>
      <h1>Add Model</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Frameworks"
              name="frameworks"
              value={formData.frameworks}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Try it out Link"
              name="tryitout_link"
              value={formData.tryitout_link}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Add Model
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddModelPage;
