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
      <div className="flex justify-center">
        <FileUploader />
      </div>
      <button
        onClick={handleUpload}
        className="mt-4 bg-[#3B82F6] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#2563EB] transition duration-200 w-full"
      >
        Analyze
      </button>
      {flag ? (
        <>
          <div className="flex justify-center">
            <WordCloud /> {/* WordCloud */}
          </div>
          <div> {/* Negative Sentiment Plots */}
            <PlotlyBarChart url="http://127.0.0.1:8080/sen-activity-map/0"/>
            <PlotlyBarChart url="http://127.0.0.1:8080/sen-common-words/0"/>
            <TablePlot url='http://127.0.0.1:8080/sen-contribution/0' sen="Negative"/>
            <PlotlyBarChart url="http://127.0.0.1:8080/sen-timeline/0" />
            <LinePlot url="http://127.0.0.1:8080/sen-timeline/0" />
          </div>
          
          <div>{/* Neutral Sentiment Plots */}
            <PlotlyBarChart url="http://127.0.0.1:8080/sen-activity-map/1"/>
            <PlotlyBarChart url="http://127.0.0.1:8080/sen-common-words/1"/>
            <TablePlot url='http://127.0.0.1:8080/sen-contribution/1' sen="Neutral"/>
            <PlotlyBarChart url="http://127.0.0.1:8080/sen-timeline/1" />
            <LinePlot url="http://127.0.0.1:8080/sen-timeline/1" />
          </div>

          <div>{/* Positive Sentiment Plots */}
            <PlotlyBarChart url="http://127.0.0.1:8080/sen-activity-map/2"/>
            <PlotlyBarChart url="http://127.0.0.1:8080/sen-common-words/2"/>
            <TablePlot url='http://127.0.0.1:8080/sen-contribution/2' sen="Positive"/>
            <PlotlyBarChart url="http://127.0.0.1:8080/sen-timeline/2" />
            <LinePlot url="http://127.0.0.1:8080/sen-timeline/2" />
          </div>

          <PlotlyBarChart url="http://127.0.0.1:8080/buzy-hours" />{/* Busiest Hours BarPlot*/}

          <PlotlyBarChart url="http://127.0.0.1:8080/top-users" />{/* Top Users BarPlot*/}
          
          <PlotlyBarChart url="http://127.0.0.1:8080/top-words" />{/* Top Words BarPlot*/}
          
          {/* <PlotlyBarChart url="http://127.0.0.1:8080/daily-wordcount" /> Busiest Month BarChart */}
          <PieChart url="http://127.0.0.1:8080/buzy-month"/> {/* Busiest Month PieChart*/}

          {/* <PlotlyBarChart url="http://127.0.0.1:8080/daily-wordcount" /> Weekly WordCount BarChart */}
          <PieChart url="http://127.0.0.1:8080/daily-wordcount" />{/* Weekly WordCount PieChart */}
          
          {/* <PlotlyBarChart url="http://127.0.0.1:8080/buzy-days" /> Weekly MessageCount BarChart */}
          <PieChart url="http://127.0.0.1:8080/buzy-days" />{/* Weekly MessageCount PieChart */}


          <PlotlyBarChart url="http://127.0.0.1:8080/timeline" />{/* Chat Timeline BarChart */}
          <LinePlot url="http://127.0.0.1:8080/timeline" />{/* Chart Timeline LineChart */}

          <UserActivityHeatmap /> {/* Users Activity Heatmap */}

          <TablePlot url="http://127.0.0.1:8080/contributions" sen="Highest" /> {/* Contribution Table Highest */}

          <MostFrequentEmojis /> {/* Frequent Emoji Table */}

          <TopStats /> {/* Stats Table */}

          {/* <LowestContributors /> Contribution Table Lowest */}
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
