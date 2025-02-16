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
              fill: { color: '#f1f1f1' },
            },
            cells: {
              values: tableData.rows[0] && tableData.rows[0].map((_, colIndex) => tableData.rows.map(row => row[colIndex])),
              align: 'left',
              font: { family: 'Arial, sans-serif', size: 12, color: 'black' },
              height: 30,
              line: { color: 'black', width: 1 },
              fill: { color: '#ffffff' },
            },
          },
        ]}
        layout={{
          width: 700,
          height: 250,
          title: 'Top Stats',
          margin: { t: 50, b: 20, l: 10, r: 10 },
        }}
      />
    </div>
  );
};

export default TopStats;
