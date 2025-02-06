import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const WeeklyWordCount = () => {
  const [plotData, setPlotData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/daily-wordcount');
      const data = await response.json();

      // Mapping data for days of the week with corresponding total word counts
      const dayMappings = {
        'Monday': data.data.data01[2][1] || 0,
        'Tuesday': data.data.data02[2][1] || 0,
        'Wednesday': data.data.data03[2][1] || 0,
        'Thursday': data.data.data04[2][1] || 0,
        'Friday': data.data.data05[2][1] || 0,
        'Saturday': data.data.data06[2][1] || 0,
        'Sunday': data.data.data07[2][1] || 0,
      };

      // Days of the week in correct order (no sorting)
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

      // Get the corresponding word counts for the days
      const wordCounts = daysOfWeek.map(day => dayMappings[day]);

      // Prepare the processed data for Plotly (bar chart)
      const processedData = [
        {
          x: daysOfWeek,           
          y: wordCounts,       
          type: 'bar',             
          marker: {
            color: '#1F77B4',      
          },
          name: 'Words',
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
    title: 'Weekly Word Count Chart',
    xaxis: {
      title: 'Days of the Week',
      type: 'category',   
    },
    yaxis: {
      title: 'Total Words',
      type: 'linear',
      tick0: 0,           
      dtick: 1000,         
      autorange: true,     
    },
    barmode: 'group', 
    width: 1000, // Adjust width here
    height: 600, // Adjust height here   
  };

  return <Plot data={plotData} layout={layout} />;
};

export default WeeklyWordCount;
