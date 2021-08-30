import React, { useEffect, useState, ReactElement } from 'react';
import Navbar from '../Navbar/Navbar';
import CurrentForecast from '../CurrentForecast/CurrentForecast'
import FutureForecast from '../FutureForecast/FutureForecast'
import './App.scss';


export default function App(): ReactElement {
	const [ appTheme, setAppTheme ] = useState<string>()
	const [ searchedCity, setSearchedCity ] = useState<string>(() => {
		const searchCity = localStorage.getItem('searchedCity');
		return searchCity !== null
			? JSON.parse(searchCity)
			: 'Orlando'
	});
	
	const [ tempScale, setTempScale ] = useState<string>(() => {
		const savedTempScale = localStorage.getItem('tempScale');
		return savedTempScale !== null
			? JSON.parse(savedTempScale)
			: 'imperial'
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

	const changeTemp = (scale: string) => {
		setTempScale(scale)
	}
	
	useEffect(() => {
		const saveTempToStorage = () => {
			localStorage.setItem('tempScale', JSON.stringify(tempScale))
		};
		saveTempToStorage()
	},[tempScale])

	const setTheme = (weather: string) => {
		setAppTheme(weather)
	}

	return (
		<main className={appTheme}> 
			<Navbar findCity={findCity} tempScale={tempScale} changeTemp={changeTemp}/>
			<CurrentForecast searchedCity={searchedCity} tempScale={tempScale} setTheme={setTheme}/>
			<FutureForecast searchedCity={searchedCity} tempScale={tempScale}/>
		</main>
	);
}


