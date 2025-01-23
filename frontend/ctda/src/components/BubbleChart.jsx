import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const BubbleChart = () => {
  const [plotData, setPlotData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/plot-json');
      const data = await response.json();

      // Extract x and y coordinates from data01
      const x_co = data.data.data01.map(point => point[0]);
      const y_co = data.data.data01.map(point => point[1]);

      // Prepare the processed data for Plotly
      const processedData = [
        {
          x: x_co,
          y: y_co,
          mode: 'markers',
          marker: {
            size: x_co.map((x, i) => x * y_co[i] * 2), // Example: Bubble size proportional to x*y
            color: '#1F77B4',
            opacity: 0.7
          },
          name: 'Bubble Points'
        }
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
    title: 'Bubble Chart',
    xaxis: { title: 'X-axis' },
    yaxis: { title: 'Y-axis' },
    showlegend: true
  };

  return <Plot data={plotData} layout={layout} />;
};

export default BubbleChart;
