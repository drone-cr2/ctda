import React, { useEffect, useState, useRef } from "react";
import Plotly from "plotly.js-dist-min";
import Plot from "react-plotly.js";

const PlotlyPLot = (props) => {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null); // Reference to the Plotly chart
    const plotInstance = useRef(null); // Holds the initialized Plotly figure

    useEffect(() => {
        fetch(props.url)  // Fetch JSON from Flask
            .then((res) => res.json())
            .then((data) => setChartData(data));
    }, []);


    // ✅ Export function 
    const handleInitialized = (figure, graphDiv) => {
        plotInstance.current = graphDiv; //  Store reference to the actual chart div
    };
    const exportChart = async (format) => {
        if (plotInstance.current) {
            try {
                const imageData = await Plotly.toImage(plotInstance.current, {
                    format: format, // "png", "jpeg", "pdf", "svg"
                    filename: "chart_export",
                    width: 800,
                    height: 600,
                });

                // ✅ Create a download link for the image
                const link = document.createElement("a");
                link.href = imageData;
                link.download = `chart_export.${format}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("Error exporting chart:", error);
            }
        } else {
            console.warn("Plotly chart instance not found!");
        }
    };

    return (
        <div className="plot-container"
        ref={chartRef} // Attach ref to Plotly chart
        >
            {chartData ? (
                <Plot 
                    data={chartData.data} 
                    layout={chartData.layout}
                    onInitialized={handleInitialized} // Capture the initialized chart
                 />
            ) : (
                <Plot/>
            )}
            {/* <button onClick={() => exportChart("svg")}>🎨 Download SVG</button> */}
        </div>
    );
};

export default PlotlyPLot;
