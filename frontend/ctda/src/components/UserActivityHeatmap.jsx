import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const UserActivityHeatmap = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/heatmap");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching heatmap data:", error);
      }
    };

    fetchData();
  }, []);

  // Extract values from API response or use empty arrays if no data is available
  const xValues = data ? data.x : [];
  const yValues = data ? data.y : [];
  const zValues = data ? data.z : [];

  // Plotly heatmap data
  const plotData = [
    {
      z: zValues,
      x: xValues,
      y: yValues,
      type: "heatmap",
      colorscale: "Cividis", // Cividis Inferno Hot
      colorbar: {
        title: "Activity",
        tickcolor: "white",
        titlefont: { color: "white" },
        thickness: 16, 
      },
    },
  ];

  // Layout settings
  const layout = {
    title: {
      text: "User Activity Heatmap",
      font: { color: "white" },
    },
    xaxis: {
      title: "Time Period",
      type: "category",
      tickfont: { color: "white" },
      titlefont: { color: "white" },
      gridcolor: "gray",
    },
    yaxis: {
      title: "Days of the Week",
      type: "category",
      tickfont: { color: "white" },
      titlefont: { color: "white" },
      gridcolor: "gray",
    },
    width: 700,
    height: 450,
    paper_bgcolor: "black", // Outer background
    plot_bgcolor: "black", // Inner background
    hoverlabel: { font: { color: "black" }, bgcolor: "#f9e34a" },
  };

  return (
    <div>
      <Plot data={plotData} layout={layout} />
    </div>
  );
};

export default UserActivityHeatmap;
