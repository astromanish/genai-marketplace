import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavBar } from "./NavBar";
import { FeaturedModels } from "./FeaturedModel";
import { AllModels } from "./AllModel";
import { Footer } from './Footer';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress component

const IndexPage = () => {
  const [loading, setLoading] = useState(true); // State to manage loading
  const [modelData, setModelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-orntt06q0-manish-singhs-projects-fb106251.vercel.app/api/model/"); 
        setModelData(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      {loading ? ( // Render loading screen if loading is true
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <FeaturedModels modelData={modelData} />
          <AllModels modelData={modelData} />
        </>
      )}
      <Footer />
    </>
  );
};

export default IndexPage;
