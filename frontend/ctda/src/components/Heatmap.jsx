import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const Heatmap = () => {
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

  console.log("x", xValues);
  console.log("y", yValues);
  console.log("z", zValues);

  // Plotly heatmap data
  const plotData = [
    {
      z: zValues,
      x: xValues,
      y: yValues,
      type: "heatmap",
      colorscale: "Viridis",
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
    autosize: true,
    paper_bgcolor: "#f0f0f0",
    plot_bgcolor: "#ffffff",
  };

  return (
    <div>
      <Plot data={plotData} layout={layout} />
    </div>
  );
};

export default Heatmap;
