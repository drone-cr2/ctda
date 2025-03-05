import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
const WordCloud = lazy(() => import("./components/WordCloud"));
const TablePlot = lazy(() => import("./components/TablePlot"));
const TemporalStats = lazy(() => import("./components/TemporalStats"));
const PieChart = lazy(() => import("./components/PieChart"));
const LinePlot = lazy(() => import("./components/LinePlot"));
const UserActivityHeatmap = lazy(() =>import("./components/UserActivityHeatmap"));
const MostFrequentEmojis = lazy(() =>import("./components/MostFrequentEmojis"));
const TopStats = lazy(() => import("./components/TopStats"));
const FileUploader = lazy(() => import("./components/FileUploader"));
const PlotlyBarChart = lazy(() => import("./components/PlotlyPlot"));

function App() {
  const [flag, setFlag] = useState(false);

  const handleUpload = () => {
    setFlag(true);
  };

  return (
    <div className="w-full h-full text-[#F4F3EF] bg-black font-mono flex flex-col min-h-screen justify-center">
      <div className="p-4 md:p-10 py-16 rounded">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          {flag ? (
            <>
              <div className="w-full space-y-16 md:space-y-36">
                {/* Message Overview */}
                <div className="space-y-4 md:space-y-8">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    Chat Overview
                  </h1>
                  <TopStats /> {/* Stats */}
                </div>

                {/* Temporal Overview */}
                <div className="space-y-4 md:space-y-8">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    Temporal Statistics
                  </h1>
                  <TemporalStats /> {/* Temporal Stats */}
                </div>

                {/* Chat Timeline */}
                <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    Chat Timeline
                  </h1>

                  <div className="flex justify-center w-full max-w-screen-xl mx-auto overflow-hidden">
                    <div className="w-full p-2 md:p-4">
                      <PlotlyBarChart url="http://127.0.0.1:8080/timeline" />
                    </div>
                  </div>
                  <div className="flex justify-center w-full max-w-screen-xl mx-auto overflow-hidden">
                    <div className="w-full p-2 md:p-4">
                      <LinePlot url="http://127.0.0.1:8080/timeline" />
                    </div>
                  </div>
                </div>


                {/* Contributors */}
                <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    Contributors
                  </h1>

                  <div className="flex flex-col md:flex-row justify-evenly md:space-x-6 w-full max-w-screen-xl mx-auto overflow-hidden">
                    {/* Top Users BarPlot */}
                    <div className="w-full md:w-1/2 p-2 md:p-4">
                      <PlotlyBarChart url="http://127.0.0.1:8080/top-users" />
                    </div>

                    {/* Contribution Table (Highest) */}
                    <div className="w-full md:w-1/2 p-2 md:p-4">
                      <TablePlot
                        url="http://127.0.0.1:8080/contributions"
                        sen="Highest"
                      />
                    </div>
                  </div>
                </div>

                {/* Busiest Months */}
                <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    Busiest Months
                  </h1>

                  <div className="flex flex-col md:flex-row justify-evenly md:space-x-6 w-full max-w-screen-xl mx-auto overflow-hidden">
                    {/* Wrapper for equal sizing */}
                    <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center my-2">
                      <PlotlyBarChart url="http://127.0.0.1:8080/buzy-months/bar" />
                    </div>

                    <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                      <PieChart url="http://127.0.0.1:8080/buzy-months/pie" />
                    </div>
                  </div>
                </div>

                {/* Busiest Days (by word count) */}
                <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    Busiest Days (by word count)
                  </h1>

                  <div className="flex flex-col md:flex-row justify-evenly md:space-x-6 w-full max-w-screen-xl mx-auto overflow-hidden">
                    {/* Wrapper for equal sizing */}
                    <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center my-2">
                      <PlotlyBarChart url="http://127.0.0.1:8080/daily-wordcount/bar" />
                    </div>

                    <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                      <PieChart url="http://127.0.0.1:8080/daily-wordcount/pie" />
                    </div>
                  </div>
                </div>

                {/* Busiest Days (by message count) */}
                <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    Busiest Days (by message count)
                  </h1>

                  <div className="flex flex-col md:flex-row md:space-x-6 w-full max-w-screen-xl mx-auto overflow-hidden">
                    {/* Weekly MessageCount BarChart */}
                    <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center my-2">
                      <PlotlyBarChart url="http://127.0.0.1:8080/buzy-days/bar" />
                    </div>

                    {/* Weekly MessageCount PieChart */}
                    <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                      <PieChart url="http://127.0.0.1:8080/buzy-days/pie" />
                    </div>
                  </div>
                </div>

                {/* Activity HeatMap */}
                <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    Activity HeatMap
                  </h1>

                  <div className="flex justify-center w-full max-w-screen-xl mx-auto overflow-hidden">
                    <div className="w-full p-2 md:p-4">
                      <UserActivityHeatmap /> {/* Users Activity Heatmap */}
                    </div>
                  </div>
                </div>

                {/* Most Commons */}
                <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    Most Commons
                  </h1>

                  <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-10 my-4">
                    <div className="w-full md:w-1/2 p-2 md:p-4">
                      <PlotlyBarChart url="http://127.0.0.1:8080/top-words" />
                      {/* Top Words BarPlot */}
                    </div>
                    <div className="w-full md:w-1/2 p-2 md:p-4">
                      <MostFrequentEmojis /> {/* Frequent Emoji Table */}
                    </div>
                  </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="space-y-8 md:space-y-12 px-3 md:px-6">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    Sentiment Analysis
                  </h1>

                  {/* Weekly Activity */}
                  <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                    <h1 className="text-left text-xl md:text-2xl">
                      Weekly Activity
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-10 my-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-full md:w-1/3 p-2 md:p-4">
                          <PlotlyBarChart
                            url={`http://127.0.0.1:8080/sen-activity-map/${i}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Words */}
                  <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                    <h1 className="text-left text-xl md:text-2xl">
                      Common Words
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-10 my-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-full md:w-1/3 p-2 md:p-4">
                          <PlotlyBarChart
                            url={`http://127.0.0.1:8080/sen-common-words/${i}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Bar Charts */}
                  <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                    <h1 className="text-left text-xl md:text-2xl">
                      Activity Overview
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-10 my-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-full md:w-1/3 p-2 md:p-4">
                          <PlotlyBarChart
                            url={`http://127.0.0.1:8080/sen-timeline/${i}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Line Charts */}
                  <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                    <h1 className="text-left text-xl md:text-2xl">
                      Activity Timeline
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-10 my-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-full md:w-1/3 p-2 md:p-4">
                          <LinePlot
                            url={`http://127.0.0.1:8080/sen-timeline/${i}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contributors Table */}
                  <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                    <h1 className="text-left text-xl md:text-2xl">
                      Contributors
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-10 my-4">
                      {["Negative", "Neutral", "Positive"].map((sen, i) => (
                        <div key={i} className="w-full md:w-1/3 p-2 md:p-4">
                          <TablePlot
                            url={`http://127.0.0.1:8080/sen-contribution/${i}`}
                            sen={sen}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Busiest Hours */}
                <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    Busiest Hours
                  </h1>

                  <div className="flex justify-center w-full max-w-screen-xl mx-auto overflow-hidden">
                    <div className="w-full p-2 md:p-4">
                      <PlotlyBarChart url="http://127.0.0.1:8080/buzy-hours" />
                    </div>
                  </div>
                </div>

                {/* WordCloud */}
                <div className="space-y-4 md:space-y-8">
                  <h1 className="text-left text-2xl md:text-3xl font-bold">
                    WordCloud
                  </h1>
                  <div className="flex justify-center">
                    <WordCloud /> {/* WordCloud */}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-md">
              <div className="flex justify-center">
                <FileUploader />
              </div>
              <button
                onClick={handleUpload}
                className="mt-4 bg-white text-black px-5 py-2 rounded-lg shadow-md hover:bg-slate-500 cursor-pointer transition duration-200 w-[80%] md:w-[40%] lg:w-[20%] mx-auto block my-12"
              >
                Analyze
              </button>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
