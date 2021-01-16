import './App.css';
import {useEffect,React,useState} from "react"
import axios from "axios";
import { FiRefreshCcw } from "react-icons/fi";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
function App() {
  const [data,setData] = useState({})
  const [refresh,setRefresh] = useState(false)

  const clear = () =>{
    setData({})
    setRefresh(false);
  }
   useEffect(()=>{
     if(!refresh){
      axios.get('https://api.nasa.gov/planetary/apod?api_key=ozSpCX7pheJqLT0Z4SCq9mBU5ef2PmfoRkPPhNhx&count=10').then((resp)=>{
        console.log("Llegue con",resp.data)
        const data = resp.data;
        const actual = data[Math.floor(Math.random() * (9 - 0))]
        setRefresh(true)
        setData(actual)
        
      })
     }
   },[data,refresh])
  return (
    <div className="App">
      <header className="App-header">
        {data.url?( <> 
        <img src={data.url} className="App-logo" alt="logo" /> 
        <h6>Date: {data.date}</h6>
        <h2>{data.title}</h2>
        <div className="containerDescription">
          <h4>{data.explanation}</h4>
        </div>
        
        <a
          className="App-link"
          href={data.hdurl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Photo HD
        </a>
        </>):(<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />)}
      
        <FiRefreshCcw className="icon" onClick={()=>{clear()}}/>
      </header>
   
    </div>
  );
}

export default App;
