import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import mpld3 from 'mpld3'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import ScatterPlot from './components/ScatterPlot'
import LineChart from './components/LineChart'
import BubbleChart from './components/BubbleChart'
import BarChartDays from './components/BarChartDays'

function App() {

  const [data,setData] = useState([])

  // dummy useeffect just to check
  useEffect(()=>{
    
    fetch('http://127.0.0.1:8080')
    .then(response => response.json())
    .then(data => {
      // console.log(data)   
      // console.log(data.data)   
      setData(data.data)
    })
    .catch(error => console.error(error));

  },[])



  const [plotData, setplotData] = useState('');

  useEffect(() => {
    // Fetch the plot data from the backend
    // fetch('http://localhost:8080/plot-json')
    // .then(response => setplotData(response.data))
    // .catch(err => console.log(err))


    // data fetching
    // fetch('http://localhost:8080/timelines ')
    // .then(response => setplotData(response.data))
    // .catch(err => console.log(err))


  // Load mpld3.js dynamically
    const script = document.createElement('script');
    script.src = 'http://localhost:8080/mpld3.js'; // Serve mpld3.js from Flask
    script.onload = () => {
      // Render the plot after mpld3.js is loaded
      window.mpld3.draw_figure('plot-div', plotData);
    };
    document.body.appendChild(script);

  }, []);

  // console.log(plotData)

    // const [plotData, setPlotData] = useState(null);
    // fetch(()=>{

    //   fetch('http://localhost:8080/plot-json')
    //    .then(response => setPlotData(response.data))
    //    .catch(err => console.log(err))

    // },[])

  return (
    <>
      {/* <div className="card">
        {data.map((ele,index)=> 
        <span key={index}>
          {ele}
          <br></br>
        </span>  )}
      </div> */}
 

      <BarChart/>
      <BarChartDays/>
      <PieChart/>
      <LineChart/>
      {/* <ScatterPlot/>
      <BubbleChart/> */}

      {/* 
      {plotData ? (
        <Plot
          data={plotData.data} // The "data" part of the Plotly JSON
          layout={plotData.layout} // The "layout" part of the Plotly JSON
        />
      ) : (
        <p>Loading...</p>
      )}
      */}
    </>
  )
}

export default App
