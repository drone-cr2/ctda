import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import WordCloud from "./components/WordCloud";

const MonthlyMessageCount = lazy(() =>
  import("./components/MonthlyMessageCount")
);
const MonthlyContributions = lazy(() =>
  import("./components/MonthlyContributions")
);
const LinePlot = lazy(() =>
  import("./components/LinePlot")
);
const WeeklyMessageCount = lazy(() =>
  import("./components/WeeklyMessageCount")
);
const UserActivityHeatmap = lazy(() =>
  import("./components/UserActivityHeatmap")
);
const BusiestUsers = lazy(() => import("./components/BusiestUsers"));
const HighestContributors = lazy(() =>
  import("./components/HighestContributors")
);
const LowestContributors = lazy(() =>
  import("./components/LowestContributors")
);
const MostFrequentWords = lazy(() => import("./components/MostFrequentWords"));
const MostFrequentEmojis = lazy(() =>
  import("./components/MostFrequentEmojis")
);
const WeeklyWordCount = lazy(() => import("./components/WeeklyWordCount"));
const TopStats = lazy(() => import("./components/TopStats"));
const FileUploader = lazy(() => import("./components/FileUploader"));
const PlotlyBarChart = lazy(() => import("./components/PlotlyPlot"));
const HeatmapPlot = lazy(() => import("./components/HeatMapPlot"));
const BusiestHours = lazy(() => import("./components/BusiestHours"));

function App() {
  const [plotData, setPlotData] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://localhost:8080/mpld3.js";
    script.onload = () => {
      window.mpld3.draw_figure("plot-div", plotData);
    };
    document.body.appendChild(script);
  }, []);

  const [flag, setFlag] = useState(false);

  const handleUpload = () => {
    setFlag(true);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FileUploader />
      <button
        onClick={handleUpload}
        className="mt-4 bg-[#3B82F6] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#2563EB] transition duration-200 w-full"
      >
        Analyze
      </button>
      {flag ? (
        <>
          <WordCloud />
          <PlotlyBarChart url="http://127.0.0.1:8080/sen-timeline/0" />
          <LinePlot url="http://127.0.0.1:8080/sen-timeline/0"/>
          <PlotlyBarChart url="http://127.0.0.1:8080/sen-timeline/1" />
          <LinePlot url="http://127.0.0.1:8080/sen-timeline/1"/>
          <PlotlyBarChart url="http://127.0.0.1:8080/sen-timeline/2" />
          <LinePlot url="http://127.0.0.1:8080/sen-timeline/2"/>
          <PlotlyBarChart url="http://127.0.0.1:8080/buzy-hours" />
          <PlotlyBarChart url="http://127.0.0.1:8080/top-users" />
          <MostFrequentEmojis />
          <PlotlyBarChart url="http://127.0.0.1:8080/top-words" />
          <LowestContributors />
          <PlotlyBarChart url="http://127.0.0.1:8080/daily-wordcount" />
          <PlotlyBarChart url="http://127.0.0.1:8080/buzy-days" />
          <PlotlyBarChart url="http://127.0.0.1:8080/timeline" />
          <PlotlyBarChart url="http://127.0.0.1:8080/buzy-month" />
          <LinePlot url="http://127.0.0.1:8080/timeline" />
          <UserActivityHeatmap />
          <HighestContributors />
          <TopStats />\
          W
          {/* <HeatmapPlot url="http://127.0.0.1:8080/heatmap"/> */}
          {/* <MonthlyMessageCount /> ------- unclear
        <WeeklyMessageCount /> ----- done (buzy-days)
        <WeeklyWordCount /> ----- done (buzy-days)
        {/* <BusiestHours/> ----- done (daily-wordcount)
        <MonthlyContributions /> ----- unclear
        
        <BusiestUsers /> -------- done (top-users)
        <MostFrequentWords /> -------- done (top-words)
        */}
        </>
      ) : (
        <></>
      )}
    </Suspense>
  );
}

export default App;
