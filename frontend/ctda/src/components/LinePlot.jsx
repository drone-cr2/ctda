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
          line: { color: "#636efa", width: 2 }, // Changed to blue
          name: data.data[0].name,
          marker: {
            size: 8,
            color: "#636efa", // Changed to blue
            symbol: "circle",
          },
        },
      ];

      const structure = {
        title: {
          text: data.layout.title.text,
          x: 0.05,
          xanchor: "left",
          font: { color: "black" },
        },
        margin: {
          l: 50,
        },
        paper_bgcolor: "white", // White background
        plot_bgcolor: "white", // White plot area
        font: { color: "black" }, // Black text
        xaxis: {
          ...data.layout.xaxis,
          title: { ...data.layout.xaxis.title, font: { color: "black" } },
          tickfont: { color: "black" },
          gridcolor: "#ddd", // Light gridlines
        },
        yaxis: {
          ...data.layout.yaxis,
          title: { ...data.layout.yaxis.title, font: { color: "black" } },
          tickfont: { color: "black" },
          gridcolor: "#ddd",
        },
        autosize: true, // Makes it auto-adjustable
        responsive: true, // Ensures it adjusts dynamically
      };

      setPlotData(processedData);
      setLayout(structure);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.url]); // Rerun if URL changes

  return (
    <div className="w-full">
      <Plot
        data={plotData}
        layout={layout}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default LinePlot;
