import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const TablePlot = (props) => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(props.url)
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
          (a, b) => b.contribution - a.contribution
        );

        // Show all contributors if there are fewer than 10, else get the bottom 10
        const bottomContributors = sortedContributors.slice(
          0,
          Math.min(10, sortedContributors.length)
        );

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
        values: ["<b>Sr No</b>", "<b>Name</b>", "<b>Contributions</b>"],
        align: "left",
        font: { family: "Arial", size: 14, color: "black" }, // Black header text
        fill: { color: "#F3F3F3" }, // Light gray header background
        height: 30,
      },
      cells: {
        values: [
          contributors.map((_, index) => index + 1), // Sr No
          contributors.map((contributor) => contributor.name), // Name
          contributors.map((contributor) => contributor.contribution), // Contributions
        ],
        align: "left",
        font: { family: "Arial", size: 12, color: "black" }, // Black cell text
        fill: { color: "white" }, // White background for cells
        height: 30,
      },
    },
  ];

  // Layout settings for the Plotly table
  const layout = {
    title: {
      text: props.sen + " Contributors",
      font: { color: "black", size: 18 }, // Black title
    },
    autosize: true, // Enables auto-resizing
    responsive: true, // Prevents data loss during resizing
    paper_bgcolor: "white", // Outer background white
    plot_bgcolor: "white", // Inner background white
    margin: {
      l: 10,
      r: 10,
      b: 20,
      t: 50,
    },
  };

  return (
    <Plot
      data={tableData}
      layout={layout}
      useResizeHandler
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default TablePlot;
