import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HeaderSection } from "./HeaderSection";
import { DescriptionSection } from "./DescriptionSection";
import { ChartSection } from "./ChartSection";
import { Box, CircularProgress } from "@mui/material";

function ModelDetailsPage() {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send request to fetch model details
        const response = await axios.get(`https://atlan-backend-acf306a15a9e.herokuapp.com/api/model/${id}`);
        setData(response.data);
        setError(null);

        // Send request to log view
        await axios.post(`https://atlan-backend-acf306a15a9e.herokuapp.com/api/model/${id}/view`);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {loading && ( 
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </div>
      )}
      {error && ( 
        <p>{error}</p>
      )}
      {data && !loading && ( 
        <>
          <Box ml={15} mr={15} mt={5}>
            <HeaderSection data={data} />
          </Box>
          <Box ml={15} mr={15}> 
            <DescriptionSection data={data} />
          </Box>
          <Box ml={15} mr={15} mb={5}>
            <ChartSection data={data} />
          </Box>
        </>
      )}
    </>
  );
}

export default ModelDetailsPage;
