import React, { useEffect, useState, ReactElement } from 'react';
// import { getCurrentWeather } from '../Api/ApiCall'
import Navbar from '../Navbar/Navbar';
import CurrentForecast from '../CurrentForecast/CurrentForecast'
import FutureForecast from '../FutureForecast/FutureForecast'
// import { CurrentWeather } from '../../Utilities/Utilitiles';
import './App.scss';


export default function App(): ReactElement {
	const [ searchedCity, setSearchedCity ] = useState<string>(() => {
		const searchCity = localStorage.getItem('searchedCity');
		return searchCity !== null
			? JSON.parse(searchCity)
			: 'Orlando'
	});
	

	
	const [ isFahrenheit, setIsFahrenheit ] = useState<boolean>(() => {
		const savedTempScale = localStorage.getItem('tempScale');
		const parsedTemp = savedTempScale !== null
			? JSON.parse(savedTempScale)
			: "imperial";
		return parsedTemp ? true : false
	})
  
	const findCity = (city: string) => {
		setSearchedCity(city);
	};
	
	useEffect(() => {
		const saveSearchedCity = () => {
			localStorage.setItem('searchedCity', JSON.stringify(searchedCity));
		};
		saveSearchedCity()
	},[searchedCity])

	const changeTemp = () => {
		setIsFahrenheit(prevState => !prevState)
	}
	
	useEffect(() => {
		const saveTempToStorage = () => {
			if(isFahrenheit === true) {
				localStorage.setItem('tempScale', JSON.stringify("imperial"))
			} else {
				localStorage.setItem('tempScale', JSON.stringify("metric"))
			}
		};
		saveTempToStorage()
	},[isFahrenheit])

	const setTheme = () => {

	}

	return (
		<main> 
			<Navbar findCity={findCity} tempScale={isFahrenheit} changeTemp={changeTemp}/>
			<CurrentForecast searchedCity={searchedCity} tempScale={isFahrenheit}/>
			<FutureForecast searchedCity={searchedCity} tempScale={isFahrenheit}/>
		</main>
	);
}


