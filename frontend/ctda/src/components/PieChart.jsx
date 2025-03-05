import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const PieChart = (props) => {
  const [plotData, setPlotData] = useState([]);
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(props.url);
      const data = await response.json();

      const pieColors = [
        "#E74C3C",
        "#2980B9",
        "#F4C542",
        "#8E44AD",
        "#1ABC9C",
        "#D35400",
        "#27AE60",
        "#C0392B",
        "#F39C12",
        "#7D3C98",
        "#2ECC71",
        "#A93226",
        "#3498DB",
        "#E67E22",
        "#16A085",
      ];

      const processedData = [
        {
          labels: data.data[0].labels,
          values: data.data[0].values,
          type: "pie",
          hovertemplate: data.data[0].hovertemplate,
          name: data.data[0].name,
          showlegend: data.data[0].showlegend,
          marker: { colors: pieColors },
        },
      ];

      const structure = {
        title: {
          text: data.layout.title?.text || "Pie Chart",
          font: { color: "black" }, // Changed to black
        },
        paper_bgcolor: "white", // Changed to white
        plot_bgcolor: "white", // Changed to white
        font: { color: "black" }, // Changed to black
        legend: {
          font: { color: "black" }, // Changed to black
          bgcolor: "rgba(255,255,255,0)",
        },
        autosize: true,
        responsive: true, // Enables dynamic resizing
      };

      setPlotData(processedData);
      setLayout(structure);
    } catch (err) {
      console.error("Error fetching temporal stats:", err);
      setError(err.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.url]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full h-auto md:h-[500px]">
      <Plot
        data={plotData}
        layout={layout}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default PieChart;
