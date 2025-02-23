import React, { useEffect, useState, useRef } from "react";
import Plotly from "plotly.js-dist-min";
import Plot from "react-plotly.js";

const PlotlyPLot = (props) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch(props.url)
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.data.map((trace) => ({
          ...trace,
          type:"bar",
        }));

        setChartData({ ...data, data: updatedData });
      });
  }, []);

  return (
    <div className="plot-container">
      {chartData ? (
        <Plot data={chartData.data} layout={chartData.layout} />
      ) : (
        <Plot />
      )}
      {/* <button onClick={() => exportChart("svg")}>🎨 Download SVG</button> */}
    </div>
  );
};

export default PlotlyPLot;
