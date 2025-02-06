import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const MessageTrendTillNow = () => {
  const [plotData, setPlotData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/timeline');
      const data = await response.json();

      const y_co = data.data.data01.map(point => point[1]);
      const x_labels = data.labels;

      // Prepare the processed data for Plotly
      const processedData = [
        {
          x: x_labels,
          y: y_co,
          type: 'scatter',
          mode: 'lines+markers', // 'lines+markers' shows both line and points
          line: { color: '#1F77B4', width: 2 },
          name: 'Messages',
          marker: {
            size: 10, // Adjust size of the points
            color: '#1F77B4', // Color of the points
            symbol: 'circle', // Shape of the points
          },
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
    title: 'Message Count Trend Till Now',
    xaxis: {
      title: 'Months',
      type: 'category',
    },
    yaxis: {
      title: 'No. of Messages',
      type: 'linear',
      dtick: 50,
      autorange: true,
    },
    showlegend: true,
    width: 1000, // Adjust width here
    height: 600, // Adjust height here
  };

  return <Plot data={plotData} layout={layout} />;
};

export default MessageTrendTillNow;
