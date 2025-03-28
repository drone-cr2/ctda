import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const MostFrequentEmojis = () => {
  const [emojis, setEmojis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("http://127.0.0.1:8080/top-emojis")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const emojisList = Object.values(data[0]);
        const countsList = Object.values(data[1]);

        const emojisData = emojisList.map((emoji, index) => ({
          emoji,
          count: countsList[index],
        }));

        const sortedEmojis = emojisData.sort((a, b) => b.count - a.count);
        setEmojis(sortedEmojis);
      })
      .catch((err) => {
        console.error("Error fetching emojis:", err);
        setError(err.message || "Failed to fetch data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        Error: Not Enough Data for plot
      </div>
    );
  }

  const tableData = [
    {
      type: "table",
      columnwidth: [50, 150, 100], // Adjust column widths
      header: {
        values: ["<b>#</b>", "<b>Emoji</b>", "<b>Count</b>"],
        align: "center",
        font: { family: "Arial", size: 16, color: "white" },
        fill: { color: "#4f39f6" }, // Darker header
        height: 35,
        line: { width: 1, color: "black" },
      },
      cells: {
        values: [
          emojis.map((_, index) => `<b>${index + 1}</b>`), // Sr No
          emojis.map((emoji) => emoji.emoji), // Emoji
          emojis.map((emoji) => emoji.count), // Count
        ],
        align: "center",
        font: { family: "Arial", size: 14, color: "black" },
        fill: {
          color: [
            emojis.map((_, index) =>
              index % 2 === 0 ? "#F8F9FA" : "#ECF0F1"
            ),
          ],
        }, // Alternating row colors
        height: 30,
        line: { width: 1, color: "gray" }, // Table borders
      },
    },
  ];

  const layout = {
    title: {
      text: "Most Frequent Emojis",
      font: { color: "black", size: 20, family: "Arial" },
      x: 0.5, // Center title
    },
    autosize: true,
    responsive: true,
    paper_bgcolor: "white",
    plot_bgcolor: "white",
    margin: {
      l: 10,
      r: 10,
      b: 20,
      t: 50,
    },
    height:415,
  };

  return (
    <div className="w-full p-4 border border-gray-300 shadow-md bg-white">
      <Plot
        data={tableData}
        layout={layout}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default MostFrequentEmojis;
