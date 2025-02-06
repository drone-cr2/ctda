import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const BusiestUsers = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/top-users");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Extract usernames for x-axis and activity values for y-axis
  const xValues = data ? data.labels : [];
  const yValues = data ? Object.values(data.data).map((coords) => coords[3][1]) : [];

  const plotData = [
    {
      x: xValues,
      y: yValues,
      type: "bar",
      marker: {
        color: "green",
      },
    },
  ];

  const layout = {
    title: "Busy Users",
    xaxis: {
      title: "Users",
    },
    yaxis: {
      title: "Activity",
    },
    width: 1000, // Adjust width here
    height: 600, // Adjust height here
    paper_bgcolor: "#f0f0f0",
    plot_bgcolor: "#ffffff",
  };

  return (
    <div>
      <Plot data={plotData} layout={layout} />
    </div>
  );
};

export default BusiestUsers;
