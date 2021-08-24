import React, { useEffect, useState, ReactElement } from 'react';
// import { getCurrentWeather } from '../Api/ApiCall'
import Navbar from '../Navbar/Navbar';
import CurrentForecast from '../CurrentForecast/CurrentForecast'
import FutureForecast from '../FutureForecast/FutureForecast'
// import { CurrentWeather } from '../../Utilities/Utilitiles';
import './App.css';


export default function App(): ReactElement {
  const [ searchedCity, setSearchedCity ] = useState<string>('orlando');
	const [ favoriteCities, setFavoriteCities ] = useState<string[]>([]);
  
	const findCity = (city: string) => {
		setSearchedCity(city);
	}

	const favoriteCity = (city: string) => {
		if(favoriteCities.includes(city)){
			setFavoriteCities(prevState => prevState.filter(favCity => city !== favCity))
		} else {
			setFavoriteCities(prevState => [...prevState, city])
		}
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
			<Navbar findCity={findCity} favoriteCities={favoriteCities}/>
			<CurrentForecast searchedCity={searchedCity} favoriteCity={favoriteCity} favoriteCities={favoriteCities}/>
			<FutureForecast searchedCity={searchedCity}/>
		</main>
	);
}


