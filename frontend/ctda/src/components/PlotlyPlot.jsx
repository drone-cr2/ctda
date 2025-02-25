import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const PlotlyPlot = (props) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch(props.url)
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.data.map((trace) => ({
          ...trace,
          type: "bar",
          marker: { color: "#F3B340" }, // Bar color
        }));

        const updatedLayout = {
          ...data.layout,
          paper_bgcolor: "black", // Outer background
          plot_bgcolor: "black",  // Inner plot background
          font: { color: "white" }, // Global text color

          title: { 
            text: data.layout.title?.text, 
            font: { color: "white" } // Removed size property
          },

          xaxis: {
            ...data.layout.xaxis,
            title: { ...data.layout.xaxis.title, font: { color: "white" } },
            tickfont: { color: "white" },
            gridcolor: "#444", // Light gridlines for visibility
          },

          yaxis: {
            ...data.layout.yaxis,
            title: { ...data.layout.yaxis.title, font: { color: "white" } },
            tickfont: { color: "white" },
            gridcolor: "#444",
          },

          legend: { font: { color: "white" } },

          coloraxis: { colorbar: { tickfont: { color: "white" } } },

          hoverlabel: { font: { color: "black" }, bgcolor: "#F3B340" },
        };

        setChartData({ data: updatedData, layout: updatedLayout });
      });
  }, [props.url]);

  return (
    <div className="plot-container">
      {chartData ? (
        <Plot data={chartData.data} layout={chartData.layout} />
      ) : (
        <Plot />
      )}
    </div>
  );
};

export default PlotlyPlot;
