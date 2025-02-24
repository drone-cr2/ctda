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
          line: { color: "#636efa", width: 2 },
          name: data.data[0].name,
          marker: {
            size: 8,
            color: "#636efa",
            symbol: "circle",
          },
        },
      ];

      const structure = {
        title: {
          text: data.layout.title.text,
          x: 0.05,
          xanchor: "left",
        },
        margin: {
          l: 50, 
        },
        xaxis: data.layout.xaxis,
        yaxis: data.layout.yaxis,
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
