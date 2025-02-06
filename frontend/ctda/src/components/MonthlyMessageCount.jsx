import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const MonthlyMessageCount = () => {
  const [plotData, setPlotData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/timeline');
      const data = await response.json();

      // Extracting x and y coordinates from the fetched data
      const x_co = data.data.data01.map(point => point[0]);
      const y_co = data.data.data01.map(point => point[1]);

      // Define the month names
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      // Create an object to aggregate the total messages per month
      const monthAggregates = {};

      // Loop through the x_co and y_co arrays and aggregate the y values for each month
      x_co.forEach((value, index) => {
        const month = months[value % 12]; 
        if (!monthAggregates[month]) {
          monthAggregates[month] = 0; 
        }
        monthAggregates[month] += y_co[index]; 
      });

      // Prepare the x and y labels for the plot
      const x_labels = Object.keys(monthAggregates);
      const y_values = Object.values(monthAggregates);

      // Prepare the processed data for Plotly (bar chart)
      const processedData = [
        {
          x: x_labels, 
          y: y_values, 
          type: 'bar', 
          marker: {
            color: '#1F77B4', 
          },
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
    title: 'Monthly Message Count Chart',
    xaxis: {
      title: 'Months',
      type: 'category', 
    },
    yaxis: {
      title: 'Total Messages',
      type: 'linear',
      autorange: true,
    },
    barmode: 'group', 
    width: 1000, // Adjust width here
    height: 600, // Adjust height here
  };

  return <Plot data={plotData} layout={layout} />;
};

export default MonthlyMessageCount;
