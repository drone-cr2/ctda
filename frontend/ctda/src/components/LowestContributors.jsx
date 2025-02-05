import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const LowestContributors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8080/contributions")
      .then((response) => response.json())
      .then((data) => {
        // Extract names and contributions
        const names = Object.values(data.percent);
        const contributions = Object.values(data.count);

        // Combine the names and contributions into a single array of objects
        const contributorsList = names.map((name, index) => ({
          name,
          contribution: contributions[index],
        }));

        // Sort the contributors by contribution in ascending order
        const sortedContributors = contributorsList.sort(
          (a, b) => a.contribution - b.contribution
        );

        // Show all contributors if there are fewer than 10, else get the bottom 10
        const bottomContributors = sortedContributors.slice(0, Math.min(10, sortedContributors.length));

        // Set the contributors to the state
        setContributors(bottomContributors);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Prepare the data for the Plotly table
  const tableData = [
    {
      type: "table",
      header: {
        values: ["Sr No", "Name", "Contributions"],
        align: "left",
        font: { family: "Arial", size: 12, color: "black" },
        fill: { color: "#f1f1f1" },
        height: 30,
      },
      cells: {
        values: [
          contributors.map((_, index) => index + 1), // Sr No
          contributors.map((contributor) => contributor.name), // Name
          contributors.map((contributor) => contributor.contribution), // Contributions
        ],
        align: "left",
        font: { family: "Arial", size: 12, color: "black" },
        fill: { color: "#ffffff" },
        height: 30,
      },
    },
  ];

  // Layout settings for the Plotly table
  const layout = {
    title: "Lowest Contributors",
    width: 1000, 
    height: 400,
    paper_bgcolor: "#f0f0f0",
    plot_bgcolor: "#ffffff",
    margin: {
      l: 10, 
      r: 10,
      b: 20, 
      t: 50, 
    },
  };

  return <Plot data={tableData} layout={layout} />;
};

export default LowestContributors;
