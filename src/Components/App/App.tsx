import React, { useEffect, useState } from 'react';
import { getCurrentWeather, getWeather } from '../Api/ApiCall'
import Navbar from '../Navbar/Navbar';
import CurrentForcast from '../CurrentForcast/CurrentForcast'
import { CurrentWeather } from '../../Utilities/Utilitiles';
import './App.css';

export default function App() {
  const [ currentWeather, setCurrentWeather ] = useState<CurrentWeather>();
	const [ hourlyWeather, setHourlyWeather ] = useState({})
  const [ error, setError ] = useState('');
  
  useEffect(() => {
    const callWeather = async () => {
      setError('')
      try{
        const weatherReport = await getCurrentWeather('orlando');
				const hourlyReport = await getWeather('orlando')
        setCurrentWeather(weatherReport)
				setHourlyWeather(hourlyReport.hourly)
				console.log(hourlyReport)
      } catch(e) {
        setError(e.message)
      }
    }
    callWeather()
  },[])
	
	if(!!currentWeather?.id) {
		return (
			<main> 
				<Navbar/>
				<CurrentForcast currentWeather={currentWeather}/>
			</main>
		);
	}
	return null
}


