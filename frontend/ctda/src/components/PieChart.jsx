import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const PieChart = (props) => {
  const [plotData, setPlotData] = useState([]);
  const [layout, setLayout] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(props.url);
      const data = await response.json();

      // Improved diverse color palette (spread out similar colors)
      const pieColors = [
        "#E74C3C", "#2980B9", "#F4C542", "#8E44AD", "#1ABC9C",
        "#D35400", "#27AE60", "#C0392B", "#F39C12", "#7D3C98",
        "#2ECC71", "#A93226", "#3498DB", "#E67E22", "#16A085"
      ];

      // Prepare the processed data for Plotly
      const processedData = [
        {
          labels: data.data[0].labels,
          values: data.data[0].values,
          type: "pie",
          hovertemplate: data.data[0].hovertemplate,
          name: data.data[0].name,
          showlegend: data.data[0].showlegend,
          marker: { colors: pieColors }, // Applying reordered colors
        },
      ];

      const structure = {
        title: {
          text: data.layout.title ? data.layout.title.text : "Pie Chart",
          font: { color: "white" },
        },
        width: 700,
        height: 450,
        paper_bgcolor: "black", // Dark background
        plot_bgcolor: "black",
        font: { color: "white" }, // White text for contrast
        legend: {
          font: { color: "white" },
          bgcolor: "rgba(0,0,0,0)", // Transparent legend background
        },
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

export default PieChart;
