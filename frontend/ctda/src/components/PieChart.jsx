import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const PieChart = () => {
  const [plotData, setPlotData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/plot-json');
      const data = await response.json();

      // Use data.data02 for pie chart 
      const labels = data.data.data02 ? data.data.data02[0] : ['Category A', 'Category B', 'Category C'];
      const values = data.data.data02 ? data.data.data02[1] : [30, 50, 20];

      // Prepare the processed data for Plotly
      const processedData = [
        {
          labels: labels,
          values: values,
          type: 'pie',
          marker: {
            colors: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD'],
          },
          name: 'Pie Data'
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
    title: 'Pie Chart',
  };

  return <Plot data={plotData} layout={layout} />;
};

export default PieChart;
