import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const LinePlot = (props) => {
  const [plotData, setPlotData] = useState([]);
  const [layout, setLayout] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(props.url);
      const data = await response.json();

      // Prepare the processed data for Plotly
      const processedData = [
        {
          x: data.data[0].x,
          y: data.data[0].y,
          type: "scatter",
          mode: "lines+markers",
          line: { color: "#F3B340", width: 2 },
          name: data.data[0].name,
          marker: {
            size: 8,
            color: "#F3B340",
            symbol: "circle",
          },
        },
      ];

      const structure = {
        title: {
          text: data.layout.title.text,
          x: 0.05,
          xanchor: "left",
          font: { color: "white" }, // Title text color
        },
        margin: {
          l: 50,
        },
        paper_bgcolor: "black", // Outer background
        plot_bgcolor: "black", // Inner plot background
        font: { color: "white" }, // Global text color
        xaxis: {
          ...data.layout.xaxis,
          title: { ...data.layout.xaxis.title, font: { color: "white" } },
          tickfont: { color: "white" },
          gridcolor: "#444", // Light gridlines
        },
        yaxis: {
          ...data.layout.yaxis,
          title: { ...data.layout.yaxis.title, font: { color: "white" } },
          tickfont: { color: "white" },
          gridcolor: "#444",
        },
        width: 700,
        height: 450,
      };

      setPlotData(processedData);
      setLayout(structure);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Plot data={plotData} layout={layout} />;
};

export default LinePlot;
