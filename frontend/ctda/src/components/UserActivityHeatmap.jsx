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

  // console.log("x", xValues);
  // console.log("y", yValues);
  // console.log("z", zValues);

  // Plotly heatmap data
  const plotData = [
    {
      z: zValues,
      x: xValues,
      y: yValues,
      type: "heatmap",
      colorscale: "Viridis", // Portland
      colorbar: { title: "Message Count" },
    },
  ];

  // Layout settings
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
    width: 700, 
    height: 500,
    paper_bgcolor: "white",
    plot_bgcolor: "white",
  };

  return (
    <div>
      <Plot data={plotData} layout={layout} />
    </div>
  );
};

export default UserActivityHeatmap;
