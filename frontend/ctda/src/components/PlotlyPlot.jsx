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
        }));

        const updatedLayout = {
          ...data.layout,
          title: {
            text: data.layout.title?.text,
          },

          xaxis: {
            ...data.layout.xaxis,
            title: { ...data.layout.xaxis.title },
          },

          yaxis: {
            ...data.layout.yaxis,
            title: { ...data.layout.yaxis.title },
          },

          autosize: true, // Enables auto-resizing
          responsive: true, // Prevents data loss during resizing
        };

        setChartData({ data: updatedData, layout: updatedLayout });
      });
  }, [props.url]);

  return (
    <div className="w-full">
      {chartData ? (
        <Plot
          data={chartData.data}
          layout={chartData.layout}
          useResizeHandler
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <Plot />
      )}
    </div>
  );
};

export default PlotlyPlot;
