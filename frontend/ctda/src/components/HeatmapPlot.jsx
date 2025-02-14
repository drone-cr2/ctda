import React, { useEffect, useState, useRef } from "react";
import Plotly from "plotly.js-dist-min";
import Plot from "react-plotly.js";

const HeatmapPlot = ({ url }) => {
    const [heatmapData, setHeatmapData] = useState(null);
    const plotInstance = useRef(null);

    useEffect(() => {
        fetch(url) // Fetch JSON data
            .then((res) => res.json())
            .then((data) => {
                if (data.x && data.y && data.z) {
                    setHeatmapData({
                        x: data.x, // 1D array of X values
                        y: data.y, // 1D array of Y values
                        z: data.z, // 2D array (must match x*y dimensions)
                    });
                }
            })
            .catch((error) => console.error("Error fetching heatmap data:", error));
    }, [url]);

    const handleInitialized = (figure, graphDiv) => {
        plotInstance.current = graphDiv;
    };

    const exportChart = async (format) => {
        if (plotInstance.current) {
            try {
                const imageData = await Plotly.toImage(plotInstance.current, {
                    format: format,
                    filename: "heatmap_export",
                    width: 800,
                    height: 600,
                });

                const link = document.createElement("a");
                link.href = imageData;
                link.download = `heatmap_export.${format}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("Error exporting heatmap:", error);
            }
        } else {
            console.warn("Plotly heatmap instance not found!");
        }
    };

    return (
        <div className="heatmap-container">
            {heatmapData ? (
                <Plot
                    data={[
                        {
                            x: heatmapData.x,
                            y: heatmapData.y,
                            z: heatmapData.z,
                            type: "heatmap",
                            colorscale: "Viridis", // Adjust color theme if needed
                        },
                    ]}
                    layout={{
                        title: "Heatmap Visualization",
                        xaxis: { title: "X Axis" },
                        yaxis: { title: "Y Axis" },
                    }}
                    onInitialized={handleInitialized}
                />
            ) : (
                <p>Loading heatmap...</p>
            )}
            <button onClick={() => exportChart("svg")}>🎨 Download SVG</button>
        </div>
    );
};

export default HeatmapPlot;
