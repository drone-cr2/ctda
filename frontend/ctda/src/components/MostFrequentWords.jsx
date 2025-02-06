import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const MostFrequentWords = () => {
  const [wordsData, setWordsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/top-words")
      .then((response) => response.json())
      .then((data) => {
        const wordList = data.labels || []; // Extract word labels
        // console.log(wordList);

        const wordsContributions = wordList.map((word, index) => {
          const key = index + 1 < 10 ? `data0${index + 1}` : `data${index + 1}`;
          const yValue = data.data[key]?.[2]?.[0] || 0; // Extract contribution
          return {
            word,
            contribution: yValue,
          };
        });

        // console.log(wordsContributions);
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
    title: "Most Frequent Words",
    xaxis: { title: "Occurances" },
    yaxis: { title: "Words", tickangle: 0 },
    paper_bgcolor: "#f0f0f0",
    plot_bgcolor: "#ffffff",
    width: 1000, // Adjust width here
    height: 600, // Adjust height here
  };

  return <Plot data={[chartData]} layout={layout} />;
};

export default MostFrequentWords;
