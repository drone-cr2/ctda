import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const LineChart = () => {
  const [plotData, setPlotData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/timelines');
      const data = await response.json();

      // Extract x and y coordinates
      const x_co = data.data.data01.map(point => point[0]);
      const y_co = data.data.data01.map(point => point[1]);

      // Map X values to corresponding month names
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const x_labels = x_co.map(value => {
        const cycle = Math.floor(value / 12); // Calculate the cycle
        const month = months[value % 12]; // Use modulo to map to month
        return `${month} (${cycle + 1})`; // Append cycle number
      });

      // Prepare the processed data for Plotly
      const processedData = [
        {
          x: x_labels,
          y: y_co,
          type: 'scatter',
          mode: 'lines',
          line: { color: '#1F77B4', width: 2 },
          name: 'Messages',
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
    title: 'Timeline Monthly Figure',
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
  };

  return <Plot data={plotData} layout={layout} />;
};

export default LineChart;
