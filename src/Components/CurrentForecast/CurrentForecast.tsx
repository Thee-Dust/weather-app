import React, { useEffect, useState, ReactElement } from 'react';
import { CurrentWeather } from '../../Utilities/Utilitiles';
import { getCurrentWeather } from '../Api/ApiCall';
import moment from 'moment';
import './CurrentForecast.scss'


export default function CurrentForecast({ searchedCity, tempScale, setTheme }: { searchedCity: string, tempScale: string, setTheme: (weather: string, time: string) => void }): ReactElement | null {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const callWeather = async (searchedCity: string, tempScale: string) => {
			setError('')
			try {
				const weatherReport = await getCurrentWeather(searchedCity, tempScale);
				setCurrentWeather(weatherReport)
				setTheme(weatherReport.weather[0].main, weatherReport.weather[0].icon)
			} catch (e) {
				setError(e.message)
			}
		}
		callWeather(searchedCity, tempScale)
	}, [searchedCity, tempScale, setTheme])
	
	if(error) {
		return (
			<h1>{error}</h1>
		)
	}

	if(currentWeather?.id) {
		const secondsToMilliseconds = 1000;
		const timeOfDataCalc = new Date((currentWeather.dt + currentWeather.timezone) * secondsToMilliseconds);
		console.log(currentWeather)
		const today = moment.parseZone(timeOfDataCalc).utc().format('h:mm A');
		console.log(today)
		const location = `${currentWeather.name}, ${currentWeather.sys?.country}`;

		return (
			<div className="current-container">
				<div className="current-forecast">
					<p>As of {today} in {location}</p>
					<h1>{currentWeather.main.temp.toFixed()}°</h1>
					<p>{currentWeather.weather[0].description}</p>
					<p>Feels like {currentWeather.main.feels_like.toFixed()}°</p>
				</div>
				<div className="current-icon">
					<img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt={currentWeather.weather[0].description}/>
				</div>
			</div>
		)
	}
	return null
}