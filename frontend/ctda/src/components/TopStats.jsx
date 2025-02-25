import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const TopStats = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8080/top-stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching top stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const tableData = stats
    ? {
        header: ['Sr No', 'Category', 'Stats'],
        rows: [
          [1, 'Number of Links', stats.num_links],
          [2, 'Number of Media Messages', stats.num_media_messages],
          [3, 'Number of Messages', stats.num_messages],
          [4, 'Number of Words', stats.num_words],
        ],
      }
    : {
        header: ['Sr No', 'Category', 'Stats'],
        rows: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      };

  return (
    <div>
      <Plot
        data={[
          {
            type: 'table',
            header: {
              values: tableData.header,
              align: 'left',
              font: { family: 'Arial, sans-serif', size: 12, color: 'black' },
              height: 30,
              fill: { color: '#F3B340' }, // Golden header
              line: { color: 'white', width: 0.5 }, // Thinner white border for header
            },
            cells: {
              values: tableData.rows[0] && tableData.rows[0].map((_, colIndex) => tableData.rows.map(row => row[colIndex])),
              align: 'left',
              font: { family: 'Arial, sans-serif', size: 12, color: 'white' },
              height: 30,
              line: { color: 'white', width: 0.5 }, // Thinner white border for cells
              fill: { color: '#222222' }, // Dark background for cells
            },
          },
        ]}
        layout={{
          width: 700,
          height: 250,
          title: 'Top Stats',
          paper_bgcolor: 'black', // Outer background
          plot_bgcolor: 'black', // Inner background
          font: { color: 'white' }, // Global text color
          margin: { t: 50, b: 20, l: 10, r: 10 },
        }}
      />
    </div>
  );
};

export default TopStats;
