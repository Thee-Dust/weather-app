import React, { useEffect, useState } from 'react';
import getWeather from '../Api/ApiCall'
import Navbar from '../Navbar/Navbar';
import CurrentForcast from '../CurrentForcast/CurrentForcast'
import { CurrentWeather } from '../../Utilities/Utilitiles';
import './App.css';

export default function App() {
  const [ currentWeather, setCurrentWeather ] = useState({});
	const [ hourlyWeather, setHourlyWeather ] = useState({})
  const [ error, setError ] = useState('');
  
  useEffect(() => {
    const callWeather = async () => {
      setError('')
      try{
        const weatherReport = await getWeather('orlando');
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
				{/* <CurrentForcast currentWeather={currentWeather}/> */}
			</main>
		);
}


