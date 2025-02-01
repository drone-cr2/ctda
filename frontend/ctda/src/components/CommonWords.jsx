import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const CommonWords = () => {
  const [wordsData, setWordsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/commons")
      .then((response) => response.json())
      .then((data) => {
        const wordList = data.wordlist || []; // Extract word labels

        const wordsContributions = wordList.map((word, index) => {
          const yValue = data.data[`data0${index + 1}`][2][0]; // Extract contribution
          return {
            word,
            contribution: yValue,
          };
        });

        // Set the processed words data to the state
        setWordsData(wordsContributions);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const chartData = {
    type: "bar",
    x: wordsData.map((item) => item.contribution),
    y: wordsData.map((item) => item.word),
    orientation: "h",
    marker: {
      color: "#1F77B4",
    },
  };

  const layout = {
    title: "Frequent Words",
    xaxis: { title: "Contribution" },
    yaxis: { title: "Words", tickangle: 0 },
    paper_bgcolor: "#f0f0f0",
    plot_bgcolor: "#ffffff",
    autosize: true,
  };

  return <Plot data={[chartData]} layout={layout} />;
};

export default CommonWords;
