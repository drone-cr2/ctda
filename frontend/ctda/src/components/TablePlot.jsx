import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const TablePlot = (props) => {
  const [contributors, setContributors] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(props.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); 
        }
        return response.json();
      })
      .then((data) => {
        const names = Object.values(data.percent);
        const contributions = Object.values(data.count);

        const contributorsList = names.map((name, index) => ({
          name,
          contribution: contributions[index],
        }));

        const sortedContributors = contributorsList.sort(
          (a, b) => b.contribution - a.contribution
        );

        const topContributors = sortedContributors.slice(0, 10); // Top 10 only

        setContributors(topContributors);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.url]);

  if (loading) {
    return (
      <div className="flex justify-center items-center"> 
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-red-500">
        Error: Not Enough Data for plot
      </div>
    );
  }

  const tableData = [
    {
      type: "table",
      columnwidth: [50, 150, 100], // Adjust column widths
      header: {
        values: ["<b>#</b>", "<b>Name</b>", "<b>Contributions</b>"],
        align: "center",
        font: { family: "Arial", size: 16, color: "white" },
        fill: { color: "#4f39f6" }, // Darker header
        height: 35,
        line: { width: 1, color: "black" },
      },
      cells: {
        values: [
          contributors.map((_, index) => `<b>${index + 1}</b>`),
          contributors.map((contributor) => contributor.name),
          contributors.map((contributor) => contributor.contribution),
        ],
        align: "center",
        font: { family: "Arial", size: 14, color: "black" },
        fill: {
          color: [
            contributors.map((_, index) =>
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
      text: `${props.sen} Contributors`,
      font: { color: "black", size: 20, family: "Arial" },
    },
    autosize: true,
    responsive: true,
    paper_bgcolor: "white",
    plot_bgcolor: "white",
    margin: {
      l: 10,
      r: 10,
      b: 0,
      t: 40,
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

export default TablePlot;
