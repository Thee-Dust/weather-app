import React, { useEffect, useState, ReactElement } from 'react';
import Home from '../Home/Home';
import Weather from '../Weather/Weather';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.scss';


export default function App(): ReactElement {
	const history = useHistory()
	const [ searchedCity, setSearchedCity ] = useState<string>(() => {
		const searchCity = localStorage.getItem('searchedCity');
		return searchCity !== null
			? JSON.parse(searchCity)
			: ''
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

	useEffect(() => {
		searchedCity && history.push(`/${searchedCity}`) 
	},[searchedCity, history])
	
	return (
		<main> 
			<Switch>
				<Route exact path='/'>
					<Home findCity={findCity}/>
				</Route>
				<Route path='/:city'
				render={({ match }) => {
					const city = match.params.city;
					return <Weather
					findCity={findCity}
					tempScale={tempScale}
					changeTemp={changeTemp}
					searchedCity={city} />
				}}/>
			</Switch>
		</main>
	);
}


