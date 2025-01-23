import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import mpld3 from 'mpld3'

function App() {
  const [count, setCount] = useState(0)

  const [data,setData] = useState([])

  // dummy useeffect just to check
  useEffect(()=>{
    
    fetch('http://127.0.0.1:8080')
    .then(response => response.json())
    .then(data => {
      console.log(data)   
      console.log(data.data)   
      setData(data.data)
    })
    .catch(error => console.error(error));

  },[])



  const [plotData, setplotData] = useState('');

  useEffect(() => {
    // Fetch the plot data from the backend
    fetch('http://localhost:8080/plot-json')
    .then(response => setplotData(response.data))
    .catch(err => console.log(err))


  // Load mpld3.js dynamically
    const script = document.createElement('script');
    script.src = 'http://localhost:8080/mpld3.js'; // Serve mpld3.js from Flask
    script.onload = () => {
      // Render the plot after mpld3.js is loaded
      window.mpld3.draw_figure('plot-div', plotData);
    };
    document.body.appendChild(script);

  }, []);

    // const [plotData, setPlotData] = useState(null);
    // fetch(()=>{

    //   fetch('http://localhost:8080/plot-json')
    //    .then(response => setPlotData(response.data))
    //    .catch(err => console.log(err))

    // },[])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        {data.map((ele,index)=> 
        <span key={index}>
          {ele}
          <br></br>
        </span>  )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div id="plot-div"></div>

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
