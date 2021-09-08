import React, { useEffect, useState, ReactElement } from 'react';
import dayjs from 'dayjs';
import { CurrentWeather } from '../../Utilities/Utilitiles';
import { getCurrentWeather } from '../Api/ApiCall';
import './CurrentForecast.scss'

import moment from 'moment';
import { Today } from '@material-ui/icons';

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
		const timeOfDataCalc = new Date((currentWeather.dt + currentWeather.timezone)* 1000);
		const today = moment.parseZone(timeOfDataCalc).utc().format('h:mm A')
		const location = `${currentWeather.name}, ${currentWeather.sys?.country}`;

		return (
			<div className="current-container">
				<div className="current-forecast">
					<p>As of {today} in {location}</p>
					<h3>{currentWeather.main.temp.toFixed()}°</h3>
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