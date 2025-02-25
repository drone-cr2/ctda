import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const MostFrequentEmojis = () => {
  const [emojis, setEmojis] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://127.0.0.1:8080/top-emojis")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const emojisList = Object.values(data[0]);
        const countsList = Object.values(data[1]);

        const emojisData = emojisList.map((emoji, index) => ({
          emoji,
          count: countsList[index],
        }));

        const sortedEmojis = emojisData.sort((a, b) => b.count - a.count);
        setEmojis(sortedEmojis);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Prepare the data for the Plotly table
  const tableData = [
    {
      type: "table",
      header: {
        values: ["Sr No", "Emoji", "Count"],
        align: "left",
        font: { family: "Arial", size: 12, color: "black" },
        fill: { color: "#F3B340" }, // Golden header
        height: 30,
      },
      cells: {
        values: [
          emojis.map((_, index) => index + 1), // Sr No
          emojis.map((emoji) => emoji.emoji), // Emoji
          emojis.map((emoji) => emoji.count), // Count
        ],
        align: "left",
        font: { family: "Arial", size: 12, color: "white" },
        fill: { color: "#222222" }, // Dark background for cells
        height: 30,
      },
    },
  ];

  // Layout settings for the Plotly table
  const layout = {
    title: "Most Frequent Emojis",
    width: 700,
    height: 450,
    paper_bgcolor: "black", // Outer background
    plot_bgcolor: "black",  // Inner background
    font: { color: "white" }, // Global text color
    margin: { l: 10, r: 10, b: 20, t: 50 },
  };

  return <Plot data={tableData} layout={layout} />;
};

export default MostFrequentEmojis;
