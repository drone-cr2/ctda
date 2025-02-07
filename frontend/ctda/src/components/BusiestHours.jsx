import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const BusiestHours = () => {
  const [data, setData] = useState({ x: [], y: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusyHours = async () => {
      try {
        const response = await fetch("http://localhost:8080/buzy-hours");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();

        // Convert numbers to time format (01:00, 02:00, ..., 24:00)
        const xValues = jsonData.labels.map((val) => {
          const hour = val + 1; // Shift from 0–23 to 1–24
          return `${hour.toString().padStart(2, "0")}:00`; // Format as HH:00
        });

        // Extract y values using the reference logic
        const yValues = jsonData.labels.map((_, index) => {
            const key = index + 1 < 10 ? `data0${index + 1}` : `data${index + 1}`;
            const subArray = jsonData.data[key]?.[2] || [];
            return subArray.length > 0 ? subArray[subArray.length - 1] : 0; 
          });
          

        setData({ x: xValues, y: yValues });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusyHours();
  }, []);

  return (
    <Plot
      data={[
        {
          type: "bar",
          x: loading || error ? [] : data.x,
          y: loading || error ? [] : data.y,
          marker: { color: "#1F77B4" },
        },
      ]}
      layout={{
        title: "Busy Hours Chart",
        xaxis: { title: "Hour of the Day", tickmode: "array", tickvals: data.x },
        yaxis: { title: "Amount of Activity" },
        width: 1000,
        height: 600,
      }}
    />
  );
};

export default BusiestHours;
