import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import { NavBar } from "./NavBar";
import { FeaturedModels } from "./FeaturedModel";
import { AllModels } from "./AllModel";
import { Footer } from './Footer';

const IndexPage = () => {
  const [modelData, setModelData] = useState([]);

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
    <>
      <NavBar />
      <div style={{ marginBottom: '0px' }}>
        <FeaturedModels modelData={modelData} />
      </div>
      <div style={{ marginBottom: '0px' }}>
        <AllModels modelData={modelData} />
      </div>
      <Footer />
    </>
  );
};

export default IndexPage;
