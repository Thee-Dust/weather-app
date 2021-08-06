import React, { useEffect, useState } from 'react';
import { getCurrentWeather } from '../Api/ApiCall'
import Navbar from '../Navbar/Navbar';
import './App.css';

export default function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [ error, setError ] = useState('');
  
  useEffect(() => {
    const callWeather = async () => {
      setError('')
      try{
        const weatherReport = await getCurrentWeather('orlando');
        console.log(weatherReport)
        setCurrentWeather(weatherReport)
      } catch(e) {
        setError(e.message)
      }
    }
    callWeather()
  },[])

  return (
    <main> 
      <Navbar/>
    </main>
  );
}


