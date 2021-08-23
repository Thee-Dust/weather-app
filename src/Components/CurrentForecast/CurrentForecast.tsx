import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { CurrentWeather } from '../../Utilities/Utilitiles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { getCurrentWeather } from '../Api/ApiCall';

export default function CurrentForecast({searchedCity, favoriteCity, favoriteCities}: {searchedCity: string, favoriteCity: (city: string) => void, favoriteCities: string[] }) {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
	const [error, setError] = useState('');

	useEffect(() => {
		const callWeather = async (searchedCity: string) => {
			setError('')
			try {
				const weatherReport = await getCurrentWeather(searchedCity);
				setCurrentWeather(weatherReport)
			} catch (e) {
				setError(e.message)
			}
		}
		callWeather(searchedCity)
	}, [searchedCity])

		if(currentWeather?.id){
			const today = new Date(currentWeather.dt * 1000);
			const currentDate = dayjs(today).format('h:mm A');
			const location = `${currentWeather.name}, ${currentWeather.sys?.country}`;
			
			return (
				<div>
				<div>
					<p>As of {currentDate} in {location}</p>
					<h3>{currentWeather.main.temp.toFixed(0)}°</h3>
					<p>{currentWeather.weather[0].main}</p>
				</div>
				<div>
					{ !favoriteCities.includes(currentWeather.name) ?
						<StarBorderIcon onClick={() => favoriteCity(currentWeather.name)} /> :
						<StarIcon onClick={() => favoriteCity(currentWeather.name)} />
					}
					<img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt={currentWeather.weather[0].description}/>
				</div>
			</div>
		)
	}
	return null
	}