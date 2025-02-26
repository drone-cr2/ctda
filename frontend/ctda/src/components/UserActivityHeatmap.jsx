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
      colorscale: "Viridis", // Default colorscale
      colorbar: {
        title: "Activity",
      },
    },
  ];

  // Layout settings (light theme)
  const layout = {
    title: "User Activity Heatmap",
    xaxis: {
      title: "Time Period",
      type: "category",
    },
    yaxis: {
      title: "Days of the Week",
      type: "category",
    },
    autosize: true,
    responsive: true,
  };

  return (
    <div>
      <Plot
        data={plotData}
        layout={layout}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default UserActivityHeatmap;
