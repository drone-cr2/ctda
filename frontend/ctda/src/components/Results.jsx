import React, { lazy, Suspense } from "react";
const WordCloud = lazy(() => import("./WordCloud"));
const TablePlot = lazy(() => import("./TablePlot"));
const TemporalStats = lazy(() => import("./TemporalStats"));
const PieChart = lazy(() => import("./PieChart"));
const LinePlot = lazy(() => import("./LinePlot"));
const UserActivityHeatmap = lazy(() => import("./UserActivityHeatmap"));
const MostFrequentEmojis = lazy(() => import("./MostFrequentEmojis"));
const TopStats = lazy(() => import("./TopStats"));
const PlotlyBarChart = lazy(() => import("./PlotlyPlot"));

function Results() {
  return (
    <div className="w-full h-full text-[#364C63] bg-gradient-to-b from-[#F4F3EF] to-white font-mono flex flex-col min-h-screen justify-center">
      <div className="p-4 md:p-10 py-16 rounded">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-[#364C63] border-b-2 border-[#364C63]"></div>
            </div>
          }
        >
          <>
            <div className="w-full space-y-16 md:space-y-36">
              {/* Message Overview */}
              <div className="space-y-4 md:space-y-8">
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
                  Chat Overview
                </h1>
                <TopStats />
              </div>

              {/* Temporal Overview */}
              <div className="space-y-4 md:space-y-8">
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
                  Temporal Statistics
                </h1>
                <TemporalStats />
              </div>

              {/* Chat Timeline */}
              <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
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
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
                  Contributors
                </h1>

                <div className="flex flex-col md:flex-row justify-evenly md:space-x-6 w-full max-w-screen-xl mx-auto overflow-hidden">
                  <div className="w-full md:w-1/2 p-2 md:p-4">
                    <PlotlyBarChart url="http://127.0.0.1:8080/top-users" />
                  </div>
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
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
                  Busiest Months
                </h1>

                <div className="flex flex-col md:flex-row justify-evenly md:space-x-6 w-full max-w-screen-xl mx-auto overflow-hidden">
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
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
                  Busiest Days (by word count)
                </h1>

                <div className="flex flex-col md:flex-row justify-evenly md:space-x-6 w-full max-w-screen-xl mx-auto overflow-hidden">
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
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
                  Busiest Days (by message count)
                </h1>

                <div className="flex flex-col md:flex-row md:space-x-6 w-full max-w-screen-xl mx-auto overflow-hidden">
                  <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center my-2">
                    <PlotlyBarChart url="http://127.0.0.1:8080/buzy-days/bar" />
                  </div>

                  <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                    <PieChart url="http://127.0.0.1:8080/buzy-days/pie" />
                  </div>
                </div>
              </div>

              {/* Activity HeatMap */}
              <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
                  Activity HeatMap
                </h1>

                <div className="flex justify-center w-full max-w-screen-xl mx-auto overflow-hidden">
                  <div className="w-full p-2 md:p-4">
                    <UserActivityHeatmap />
                  </div>
                </div>
              </div>

              {/* Most Commons */}
              <div className="space-y-4 md:space-y-8 px-2 md:px4">
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
                  Most Commons
                </h1>

                <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-10 my-4">
                  <div className="w-full md:w-1/2 p-2 md:p-4">
                    <PlotlyBarChart url="http://127.0.0.1:8080/top-words" />
                  </div>
                  <div className="w-full md:w-1/2 p-2 md:p-4">
                    <MostFrequentEmojis />
                  </div>
                </div>
              </div>

              {/* Sentiment Analysis */}
              <div className="space-y-8 md:space-y-12 px-3 md:px-6">
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
                  Sentiment Analysis
                </h1>

                {/* Weekly Activity */}
                <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                  <h1 className="text-left text-xl md:text-2xl text-[#364C63]">
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
                  <h1 className="text-left text-xl md:text-2xl text-[#364C63]">
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
                  <h1 className="text-left text-xl md:text-2xl text-[#364C63]">
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
                  <h1 className="text-left text-xl md:text-2xl text-[#364C63]">
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
                  <h1 className="text-left text-xl md:text-2xl text-[#364C63]">
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
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
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
                <h1 className="text-left text-2xl md:text-3xl font-bold text-[#364C63]">
                  WordCloud
                </h1>
                <div className="flex justify-center">
                  <WordCloud />
                </div>
              </div>
            </div>
          </>
        </Suspense>
      </div>
    </div>
  );
}

export default Results;