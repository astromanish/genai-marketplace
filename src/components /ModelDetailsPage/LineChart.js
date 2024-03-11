import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export const LineChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        grid: {
            display: true,
            color: "#d8e1ec",
            drawTicks: true
        }
      },
      x: {
        display: true,
        title: {
          display: true,
          text: 'Day'
        },
      },
    },
  };
  
  return (
    <Line
      style={{
        width: "350px",
        height: "200px",
        marginBottom: "20px",
        borderRadius: "10px"
      }}
      data={data}
      options={options}
    />
  );
};

