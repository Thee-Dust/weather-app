import React, { useEffect, useState } from 'react';
// import { getCurrentWeather } from '../Api/ApiCall'
import Navbar from '../Navbar/Navbar';
import CurrentForcast from '../CurrentForcast/CurrentForcast'
import FutureForcast from '../FutureForcast/FutureForcast'
// import { CurrentWeather } from '../../Utilities/Utilitiles';
import './App.css';


export default function App() {
  
  const [ searchedCity, setSearchedCity ] = useState<string>('orlando')
  

	const findCity = (city: string) => {
		setSearchedCity(city);
	}
  // useEffect(() => {
  //   const callWeather = async () => {
  //     setError('')
  //     try{
  //       const weatherReport = await getCurrentWeather('orlando');
  //       setCurrentWeather(weatherReport)
  //     } catch(e) {
  //       setError(e.message)
  //     }
  //   }
  //   callWeather()
  // },[])
	

	return (
		<main> 
			<Navbar findCity={findCity}/>
			<CurrentForcast searchedCity={searchedCity}/>
			<FutureForcast searchedCity={searchedCity}/>
		</main>
	);
}


