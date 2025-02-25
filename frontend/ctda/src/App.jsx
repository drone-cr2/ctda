import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import WordCloud from "./components/WordCloud";
import TablePlot from "./components/TablePlot";

const MonthlyMessageCount = lazy(() =>
  import("./components/MonthlyMessageCount")
);
const PieChart = lazy(() => import("./components/PieChart"));
const MonthlyContributions = lazy(() =>
  import("./components/MonthlyContributions")
);
const LinePlot = lazy(() => import("./components/LinePlot"));
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
const BusiestHours = lazy(() => import("./components/BusiestHours"));

function App() {
  const [flag, setFlag] = useState(false);

  const handleUpload = () => {
    setFlag(true);
  };

  return (
    <div className="w-full h-full text-[#F4F3EF] font-mono">
      <div className="bg-[#364C63] p-10 py-16">
        <Suspense fallback={<div>Loading...</div>}>
          {flag ? (
            <>
              <div className="w-full space-y-48">
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">Message Overview</h1>
                  <TopStats /> {/* Stats Table */}
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">Chat Timeline</h1>
                  <div className="flex justify-center space-x-10">
                    <PlotlyBarChart url="http://127.0.0.1:8080/timeline" />
                    {/* Chat Timeline BarChart */}
                    <LinePlot url="http://127.0.0.1:8080/timeline" />
                    {/* Chat Timeline LineChart */}
                  </div>
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">Contributors</h1>
                  <div className="flex justify-center space-x-10">
                    <PlotlyBarChart url="http://127.0.0.1:8080/top-users" />
                    {/* Top Users BarPlot*/}
                    <TablePlot
                      url="http://127.0.0.1:8080/contributions"
                      sen="Highest"
                    />
                    {/* Contribution Table Highest */}
                  </div>
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">Busiest Months</h1>
                  <div className="flex justify-center space-x-10">
                    <PlotlyBarChart url="http://127.0.0.1:8080/buzy-months/bar" />
                    {/*Busiest Month BarChart*/}
                    <PieChart url="http://127.0.0.1:8080/buzy-months/pie" />
                    {/* Busiest Month PieChart*/}
                  </div>
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">
                    Busiest Days (by word count)
                  </h1>
                  <div className="flex justify-center space-x-10">
                    <PlotlyBarChart url="http://127.0.0.1:8080/daily-wordcount/bar" />
                    {/*Weekly WordCount BarChart*/}
                    <PieChart url="http://127.0.0.1:8080/daily-wordcount/pie" />
                    {/* Weekly WordCount PieChart */}
                  </div>
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">
                    Busiest Days (by message count)
                  </h1>
                  <div className="flex justify-center space-x-10">
                    <PlotlyBarChart url="http://127.0.0.1:8080/buzy-days/bar" />
                    {/* Weekly MessageCount BarChart*/}
                    <PieChart url="http://127.0.0.1:8080/buzy-days/pie" />
                    {/* Weekly MessageCount PieChart */}
                  </div>
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">Activity HeatMap</h1>
                  <div className="flex justify-center space-x-10">
                    <UserActivityHeatmap /> {/* Users Activity Heatmap */}
                  </div>
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">Most Commons</h1>
                  <div className="flex justify-center space-x-10 my-4">
                    <PlotlyBarChart url="http://127.0.0.1:8080/top-words" />
                    {/* Top Words BarPlot*/}
                    <MostFrequentEmojis /> {/* Frequent Emoji Table */}
                  </div>
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">
                    Negative Sentiment Analysis
                  </h1>
                  <div className="space-y-6">
                    {/* Negative Sentiment Plots */}
                    <div className="flex justify-center space-x-10">
                      <PlotlyBarChart url="http://127.0.0.1:8080/sen-activity-map/0" />
                      <PlotlyBarChart url="http://127.0.0.1:8080/sen-common-words/0" />
                    </div>

                    <div className="flex justify-center space-x-10">
                      <PlotlyBarChart url="http://127.0.0.1:8080/sen-timeline/0" />
                      <LinePlot url="http://127.0.0.1:8080/sen-timeline/0" />
                    </div>
                    <TablePlot
                      url="http://127.0.0.1:8080/sen-contribution/0"
                      sen="Negative"
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">
                    Neutral Sentiment Analysis
                  </h1>
                  <div className="space-y-6">
                    {/* Neutral Sentiment Plots */}
                    <div className="flex justify-center space-x-10">
                      <PlotlyBarChart url="http://127.0.0.1:8080/sen-activity-map/1" />
                      <PlotlyBarChart url="http://127.0.0.1:8080/sen-common-words/1" />
                    </div>

                    <div className="flex justify-center space-x-10">
                      <PlotlyBarChart url="http://127.0.0.1:8080/sen-timeline/1" />
                      <LinePlot url="http://127.0.0.1:8080/sen-timeline/1" />
                    </div>
                    <TablePlot
                      url="http://127.0.0.1:8080/sen-contribution/1"
                      sen="Neutral"
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">
                    Positive Sentiment Analysis
                  </h1>
                  <div className="space-y-6">
                    {/* Positive Sentiment Plots */}
                    <div className="flex justify-center space-x-10">
                      <PlotlyBarChart url="http://127.0.0.1:8080/sen-activity-map/2" />
                      <PlotlyBarChart url="http://127.0.0.1:8080/sen-common-words/2" />
                    </div>

                    <div className="flex justify-center space-x-10">
                      <PlotlyBarChart url="http://127.0.0.1:8080/sen-timeline/2" />
                      <LinePlot url="http://127.0.0.1:8080/sen-timeline/2" />
                    </div>
                    <TablePlot
                      url="http://127.0.0.1:8080/sen-contribution/2"
                      sen="Positive"
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">Busiest Hours</h1>
                  <PlotlyBarChart url="http://127.0.0.1:8080/buzy-hours" />
                </div>
                <div className="space-y-8">
                  <h1 className="text-left text-2xl">WordCloud</h1>
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
                className="mt-4 bg-[#F3B340] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#f39c40] transition duration-200 w-[20%] my-12"
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
