import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const PieChart = () => {
  const [plotData, setPlotData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/timelines');
      const data = await response.json();

      // Extract X and Y values
      const rawData = data.data.data01;
      const rawX = rawData.map(pair => pair[0]);
      const rawValues = rawData.map(pair => pair[1]);

      // Debug raw data
      // console.log('Raw X:', rawX);
      // console.log('Raw Values:', rawValues);

      // Define months
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      // Initialize totals for each month
      const monthTotals = Array(12).fill(0);

      // Aggregate values for each month
      rawX.forEach((x, index) => {
        const monthIndex = Math.floor(x) % 12; // Ensure January = 0, December = 11
        monthTotals[monthIndex] += rawValues[index];
      });

      // Debug aggregated totals
      // console.log('Month Totals:', monthTotals);

      // Prepare data for Plotly
      const processedData = [
        {
          labels: months,
          values: monthTotals,
          type: 'pie',
          marker: {
            colors: [
              '#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD',
              '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF',
              '#9EDAE5', '#7F7F7F'
            ],
          },
          name: 'Monthly Distribution',
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
    title: 'Pie Chart of Monthly Messages',
  };

  return <Plot data={plotData} layout={layout} />;
};

export default PieChart;
