import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const PieChart = (props) => {
  const [plotData, setPlotData] = useState([]);
  const [layout, setLayout] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(props.url);
      const data = await response.json();

      // Prepare the processed data for Plotly
      const processedData = [
        {
          labels: data.data[0].labels,
          values: data.data[0].values,
          type: "pie",
          hovertemplate: data.data[0].hovertemplate,
          name: data.data[0].name,
          showlegend: data.data[0].showlegend,
        },
      ];

      const structure = {
        title: data.layout.title ? data.layout.title.text : "Pie Chart",
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

export default PieChart;
