import { useState } from 'react'
import React from 'react'
import './App.css'
import { useEffect } from 'react'
import mpld3 from 'mpld3'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import LineChart from './components/LineChart'
import BarChartDays from './components/BarChartDays'
import Heatmap from './components/Heatmap'
import BusyUsers from './components/BusyUsers'
import TopContributors from './components/TopContributors'
import BottomContributors from './components/BottomContributors'
import CommonWords from './components/CommonWords'

function App() {

  const [data,setData] = useState([])

  useEffect(()=>{
    
    fetch('http://127.0.0.1:8080')
    .then(response => response.json())
    .then(data => {
      setData(data.data)
    })
    .catch(error => console.error(error));

  },[])



  const [plotData, setplotData] = useState('');

  useEffect(() => {



  // Load mpld3.js dynamically
    const script = document.createElement('script');
    script.src = 'http://localhost:8080/mpld3.js'; // Serve mpld3.js from Flask
    script.onload = () => {
      // Render the plot after mpld3.js is loaded
      window.mpld3.draw_figure('plot-div', plotData);
    };
    document.body.appendChild(script);

  }, []);



  return (
    <>
      
 

      <BarChart/>
      <BarChartDays/>
      <PieChart/>
      <LineChart/>
      <Heatmap/>
      <BusyUsers/>
      <TopContributors/>
      <BottomContributors/>
      <CommonWords/>
      
    </>
  )
}

export default App
