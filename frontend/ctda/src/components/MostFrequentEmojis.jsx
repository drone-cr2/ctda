import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const MostFrequentEmojis = () => {
  const [emojis, setEmojis] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8080/top-emojis")
      .then((response) => {
        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Extract emojis and counts
        const emojisList = Object.values(data[0]);
        const countsList = Object.values(data[1]);

        // Combine the emojis and counts into a single array of objects
        const emojisData = emojisList.map((emoji, index) => ({
          emoji,
          count: countsList[index],
        }));

        // Sort the emojis by count in descending order
        const sortedEmojis = emojisData.sort((a, b) => b.count - a.count);

        // Set the top emojis to the state
        setEmojis(sortedEmojis);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message); // Set the error message
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Prepare the data for the Plotly table
  const tableData = [
    {
      type: "table",
      header: {
        values: ["Sr No", "Emoji", "Count"],
        align: "left",
        font: { family: "Arial", size: 14, color: "black" },
        fill: { color: "#f1f1f1" },
        height: 30,
      },
      cells: {
        values: [
          emojis.map((_, index) => index + 1), // Sr No
          emojis.map((emoji) => emoji.emoji), // Emoji
          emojis.map((emoji) => emoji.count), // Count
        ],
        align: "left",
        font: { family: "Arial", size: 14, color: "black" },
        fill: { color: "#ffffff" },
        height: 30,
      },
    },
  ];

  // Layout settings for the Plotly table
  const layout = {
    title: "Most Frequent Emojis",
    width: 1000, // Adjust width here
    height: 400, // Adjust height here
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

export default MostFrequentEmojis;
