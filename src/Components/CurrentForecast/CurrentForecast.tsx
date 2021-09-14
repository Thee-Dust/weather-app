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
				setError('Could not find city you were looking for please try again')
			}
		}
		callWeather(searchedCity, tempScale)
	}, [searchedCity, tempScale, setTheme])
	

	const capitalizeFirstLetter = (sentence : string) => {
		return sentence.charAt(0).toUpperCase() + sentence.slice(1);
	}

	if(!error && !currentWeather) {
		return (
			<div className="current-container">
				<div className="current-forecast">
					<div className='skeleton skeleton-text'></div>
					<div className='skeleton skeleton-text'></div>
					<div className='skeleton skeleton-text'></div>
					<div className='skeleton skeleton-text'></div>
				</div>
				<div className="current-icon-container">
					<div className='skeleton current-icon' />
				</div>
			</div>
		)
	}

	if(error) {
		return (
			<h1>{error}</h1>
		)
	}

	if(currentWeather?.id) {
		const secondsToMilliseconds = 1000;
		const timeOfDataCalc = new Date((currentWeather.dt + currentWeather.timezone) * secondsToMilliseconds);
		const today = moment.parseZone(timeOfDataCalc).utc().format('h:mm A');
		const location = `${currentWeather.name}, ${currentWeather.sys?.country}`;
		return (
			<div className="current-container">
				<div className="current-forecast">
					<p>As of {today} in {location}</p>
					<h1>{currentWeather.main.temp.toFixed()}°</h1>
					<p>{capitalizeFirstLetter(currentWeather.weather[0].description)}</p>
					<p>Feels like {currentWeather.main.feels_like.toFixed()}°</p>
				</div>
				<div className="current-icon-container">
					<img className='current-icon' src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt={currentWeather.weather[0].description}/>
				</div>
			</div>
		)
	}
	return null
}