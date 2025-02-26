import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const UserActivityHeatmap = () => {
  const [data, setData] = useState({ x: [], y: [], z: [] });

  useEffect(() => {
    const fetchAndSortHeatmapData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/heatmap");
        const result = await response.json();

        let { x, y, z } = result;

        // Convert x labels to a sortable format
        let indexedX = x.map((label, index) => {
          let parts = label.split("-").map(Number);
          let start = parts[0] === 0 ? 24 : parts[0]; // Handle "00-1" case as 24
          return { label, index, sortValue: start };
        });

        // Sort x labels based on numeric order
        indexedX.sort((a, b) => a.sortValue - b.sortValue);

        // Get sorted x values and their new order
        let sortedX = indexedX.map(item => item.label);
        let sortedIndices = indexedX.map(item => item.index);

        // Reorder z values based on sorted x indices
        let sortedZ = z.map(row => sortedIndices.map(idx => row[idx]));

        // Update state with sorted data
        setData({ x: sortedX, y, z: sortedZ });
      } catch (error) {
        console.error("Error fetching or processing heatmap data:", error);
      }
    };

    fetchAndSortHeatmapData();
  }, []);

  // Plotly heatmap data
  const plotData = [
    {
      z: data.z,
      x: data.x,
      y: data.y,
      type: "heatmap",
      colorscale: "Viridis",
      colorbar: { title: "Activity" },
    },
  ];

  // Layout settings
  const layout = {
    title: "User Activity Heatmap",
    xaxis: { title: "Time Period", type: "category" },
    yaxis: { title: "Days of the Week", type: "category" },
    autosize: true,
    responsive: true,
  };

  return (
    <div>
      <Plot data={plotData} layout={layout} useResizeHandler style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default UserActivityHeatmap;
