import React, { useEffect, useState, ReactElement } from 'react';
import dayjs from 'dayjs';
import { CurrentWeather } from '../../Utilities/Utilitiles';
import { getCurrentWeather } from '../Api/ApiCall';
import './CurrentForecast.scss'

export default function CurrentForecast({ searchedCity, tempScale }: { searchedCity: string, tempScale: string }): ReactElement | null {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const callWeather = async (searchedCity: string, tempScale: string) => {
			setError('')
			try {
				const weatherReport = await getCurrentWeather(searchedCity, tempScale);
				setCurrentWeather(weatherReport)
			} catch (e) {
				setError(e.message)
			}
		}
		callWeather(searchedCity, tempScale)
	}, [searchedCity, tempScale])
	
	if(error) {
		return (
			<h1>{error}</h1>
		)
	}

	if(currentWeather?.id) {
		const today = new Date(currentWeather.dt * 1000);
		const currentDate = dayjs(today).format('h:mm A');
		const location = `${currentWeather.name}, ${currentWeather.sys?.country}`;
		
		return (
			<div className="current-container">
				<div className="current-forecast">
					<p className='current-location'>As of {currentDate} in {location}</p>
					<h3>{currentWeather.main.temp.toFixed(0)}°</h3>
					<p>{currentWeather.weather[0].main}</p>
					<p>Feels like {currentWeather.main.feels_like.toFixed(0)}°</p>
				</div>
				<div className="current-icon">
					<img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt={currentWeather.weather[0].description}/>
				</div>
			</div>
		)
	}
	return null
}