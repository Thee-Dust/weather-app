import React, { useEffect } from 'react';
import { getWeather } from '../Api/ApiCall'
import './App.css';

export default function App() {
  
  useEffect(() => {
    const callWeather = async () => {
      try{
        const weatherReport = await getWeather('Orlando');
        console.log(weatherReport)
      } catch(e) {
        console.log(e.message)
      }
    }
    callWeather()
  },[])

  return (
    <main> 

    </main>
  );
}


