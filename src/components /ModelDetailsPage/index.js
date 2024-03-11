import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeaderSection } from "./HeaderSection";
import { DescriptionSection } from "./DescriptionSection";
import { ChartSection } from "./ChartSection";

function ModelDetailsPage() {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/model/${id}`);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Error fetching data. Please try again later.");
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {error && <p>{error}</p>}
      {data && (
        <>
          <HeaderSection data={data} />
          <DescriptionSection data={data} />
          <ChartSection data={data} />
        </>
      )}
    </>
  );
}

export default ModelDetailsPage;
