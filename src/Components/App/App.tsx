import React, { useEffect, useState, ReactElement } from 'react';
import Home from '../Home/Home';
import Weather from '../Weather/Weather';
import { Route, Switch } from 'react-router-dom';
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

	const setTheme = (weather: string, time: string) => {
		const timeOfDay = time.slice(-1);
		const theme = `${weather}-${timeOfDay}`;
		setAppTheme(theme)
	}

	return (
		<main className={appTheme}> 
			<Switch>
				<Route exact path='/'>
					<Home findCity={findCity} />
				</Route>
				<Route path='/:city'>
					<Weather
						findCity={findCity}
						tempScale={tempScale}
						changeTemp={changeTemp}
						searchedCity={searchedCity}
						setTheme={setTheme} />
				</Route>
			</Switch>
		</main>
	);
}


