import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const BarChart = () => {
  const [plotData, setPlotData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/plot-json');
      const data = await response.json();

      const x_co = data.data.data03[0]; // Assuming `data02` exists and is appropriate for a bar chart
      const y_co = data.data.data03[1];

      const processedData = [
        {
          x: x_co.map((item) => item), // Mapping over x-axis categories
          y: y_co.map((item) => item), // Mapping over y-axis values
          type: 'bar',
          marker: {
            color: x_co.map((_, index) =>
              ['#1F77B4', '#FF7F0E', '#2CA02C'][index % 3]
            ), // Assign a repeating color pattern
          },
          name: 'Bar Data',
        },
      ];
      setPlotData(processedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const layout = {
    title: 'Bar Chart',
    xaxis: { title: 'X-axis' },
    yaxis: { title: 'Y-axis' },
  };

  return <Plot data={plotData} layout={layout} />;
};

export default BarChart;
