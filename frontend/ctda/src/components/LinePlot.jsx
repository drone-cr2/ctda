import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const LinePlot = (props) => {
  const [plotData, setPlotData] = useState([]);
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(props.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const processedData = [
        {
          x: data.data[0].x,
          y: data.data[0].y,
          type: "scatter",
          mode: "lines+markers",
          line: { color: "#4f39f6", width: 2 },
          name: data.data[0].name,
          marker: {
            size: 8,
            color: "#4f39f6",
            symbol: "circle",
          },
        },
      ];

      const structure = {
        title: {
          text: data.layout.title.text,
          x: 0.05,
          xanchor: "left",
          font: { color: "black" },
        },
        margin: {
          l: 50,
        },
        paper_bgcolor: "white",
        plot_bgcolor: "white",
        font: { color: "black" },
        xaxis: {
          ...data.layout.xaxis,
          title: { ...data.layout.xaxis.title, font: { color: "black" } },
          tickfont: { color: "black" },
          gridcolor: "#ddd",
        },
        yaxis: {
          ...data.layout.yaxis,
          title: { ...data.layout.yaxis.title, font: { color: "black" } },
          tickfont: { color: "black" },
          gridcolor: "#ddd",
        },
        autosize: true,
        responsive: true,
      };

      setPlotData(processedData);
      setLayout(structure);
    } catch (err) {
      console.error("Error fetching data:", err);
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

  return (
    <div className="w-full">
      {plotData.length > 0 ? (
        <Plot
          data={plotData}
          layout={layout}
          useResizeHandler
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div>No plot data available.</div>
      )}
    </div>
  );
};

export default LinePlot;