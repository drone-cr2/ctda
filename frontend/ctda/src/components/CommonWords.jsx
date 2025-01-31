import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const CommonWords = () => {
  const [wordsData, setWordsData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8080/commons")
      .then((response) => response.json())
      .then((data) => {
        // Extract y-values (from index 2 for each word in data) for each word
        const wordsContributions = Object.keys(data.data).map((_, index) => {
          // Extract the y-value at index 2 (data[i][2][0])
          const yValue = data.data[`data0${index + 1}`][2][0];  // Picking the y-value from the 3rd point (index 2)

          return {
            word: `Word ${index + 1}`,  // Labeling as Word 1, Word 2, etc.
            contribution: yValue,  // Contribution (y-value)
          };
        });

        // Set the processed words data to the state
        setWordsData(wordsContributions);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
;

  // Prepare the data for the Plotly bar chart
  const chartData = {
    type: "bar",
    x: wordsData.map((word) => word.contribution), // Contribution on the x-axis
    y: wordsData.map((word) => word.word), // Word on the y-axis
    orientation: "h", // Make the plot horizontal
    marker: {
      color: "#1F77B4", // Set the bar color
    },
  };

  // Layout settings for the bar chart
  const layout = {
    title: "Word Contributions",
    xaxis: {
      title: "Contribution",
    },
    yaxis: {
      title: "Words",
      tickangle: 0, // Keeping the y-axis labels upright for readability
    },
    paper_bgcolor: "#f0f0f0",
    plot_bgcolor: "#ffffff",
    autosize: true,
  };

  return <Plot data={[chartData]} layout={layout} />;
};

export default CommonWords;
