import { useState } from "react";
import React from "react";
import "./App.css";
import { useEffect } from "react";
import MonthlyMessageCount from "./components/MonthlyMessageCount";
import MonthlyContributions from "./components/MonthlyContributions";
import MessageTrendTillNow from "./components/MessageTrendTillNow";
import WeeklyMessageCount from "./components/WeeklyMessageCount";
import UserActivityHeatmap from "./components/UserActivityHeatmap";
import BusiestUsers from "./components/BusiestUsers";
import HighestContributors from "./components/HighestContributors";
import LowestContributors from "./components/LowestContributors";
import MostFrequentWords from "./components/MostFrequentWords";
import MostFrequentEmojis from "./components/MostFrequentEmojis";
import WeeklyWordCount from "./components/WeeklyWordCount";
import TopStats from "./components/TopStats";
import FileUploader from "./components/FileUploader";
import FileUpload from "./components/FileUpload";
import PlotlyBarChart from "./components/PlotlyPlot";
import HeatmapPlot from "./components/HeatMapPlot";
import BusiestHours from "./components/BusiestHours";

function App() {
  const [data, setData] = useState([]);

  // useEffect(()=>{

  //   fetch('http://127.0.0.1:8080')
  //   .then(response => response.json())
  //   .then(data => {
  //     setData(data.data)
  //   })
  //   .catch(error => console.error(error));

  // },[])

  // useEffect(() => {
  //   const setUser = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/set-user", {
  //         method: "GET", // Explicitly setting method
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log("Response:", data);
  //     } catch (error) {
  //       console.error("Error setting user:", error);
  //     }
  //   };

  //   setUser();
  // }, []);

  const [plotData, setplotData] = useState("");

  useEffect(() => {
    // Load mpld3.js dynamically
    const script = document.createElement("script");
    script.src = "http://localhost:8080/mpld3.js"; // Serve mpld3.js from Flask
    script.onload = () => {
      // Render the plot after mpld3.js is loaded
      window.mpld3.draw_figure("plot-div", plotData);
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {/* <h1>heloo mf i fixed it</h1>
      <FileUpload />
      <h1>say thanks to daddy</h1>*/}

      <FileUploader />
      <PlotlyBarChart url="http://127.0.0.1:8080/buzy-hours" />
      <PlotlyBarChart url="http://127.0.0.1:8080/top-users" />
      <PlotlyBarChart url="http://127.0.0.1:8080/top-words" />
      <PlotlyBarChart url="http://127.0.0.1:8080/daily-wordcount" />
      <PlotlyBarChart url="http://127.0.0.1:8080/buzy-days" />
      {/* <HeatmapPlot url="http://127.0.0.1:8080/heatmap"/> */}
      {/* <MonthlyMessageCount /> ------- unclear
      <WeeklyMessageCount /> ----- done (buzy-days)
      <WeeklyWordCount /> ----- done (buzy-days)
      {/* <BusiestHours/> ----- done (daily-wordcount)
       <MonthlyContributions /> ----- unclear
      <MessageTrendTillNow /> --------- unclear
      <UserActivityHeatmap /> ------- semi-done
      <BusiestUsers /> -------- done (top-users)
      <HighestContributors /> ---------- not done
      <LowestContributors /> ------- not done
      <MostFrequentWords /> -------- done (top-words)
      <MostFrequentEmojis /> -------- not done
      */}
      <TopStats />  
    </>
  );
}

export default App;
