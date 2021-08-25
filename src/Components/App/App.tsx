import React, { useEffect, useState, ReactElement } from 'react';
// import { getCurrentWeather } from '../Api/ApiCall'
import Navbar from '../Navbar/Navbar';
import CurrentForecast from '../CurrentForecast/CurrentForecast'
import FutureForecast from '../FutureForecast/FutureForecast'
// import { CurrentWeather } from '../../Utilities/Utilitiles';
import './App.css';


export default function App(): ReactElement {
  const [ searchedCity, setSearchedCity ] = useState<string>(() => {
		const searchCity = localStorage.getItem('searchedCity');
		return searchCity !== null
			? JSON.parse(searchCity)
			: 'Orlando'
	});
	
	const [ favoriteCities, setFavoriteCities ] = useState<string[]>(() => {
		const favCities = localStorage.getItem('favoriteCities');
		return favCities !== null 
			? JSON.parse(favCities)
			: []
	});

	const [ tempScale, setTempScale ] = useState<string>('imperial')
  
	const findCity = (city: string) => {
		setSearchedCity(city);
	};

	useEffect(() => {
		const saveSearchedCity = () => {
			localStorage.setItem('searchedCity', JSON.stringify(searchedCity));
		};
		saveSearchedCity()
	},[searchedCity])

	const favoriteCity =  (city: string) => {
		if(favoriteCities.includes(city)){
			setFavoriteCities(prevState => prevState.filter(favCity => city !== favCity))
		} else {
			setFavoriteCities(prevState => [...prevState, city])
		}
	};

  useEffect(() => {
		const saveCitiesToStorage = () => {
			localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
		};
		saveCitiesToStorage()
  },[favoriteCities]);

	
	return (
		<main> 
			<Navbar findCity={findCity} favoriteCities={favoriteCities} favoriteCity={favoriteCity}/>
			<CurrentForecast searchedCity={searchedCity} tempScale={tempScale}/>
			<FutureForecast searchedCity={searchedCity} tempScale={tempScale}/>
		</main>
	);
}


