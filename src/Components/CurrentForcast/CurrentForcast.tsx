import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { CurrentWeather } from '../../Utilities/Utilitiles'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { getCurrentWeather } from '../Api/ApiCall';

export default function CurrentForcast({searchedCity}: {searchedCity: string}) {
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
			const currentDate = dayjs(today).format('ddd, MMMM D, h:mm A');
			const location = `${currentWeather.name}, ${currentWeather.sys?.country}`;
			
			return (
				<div>
				<div>
					<p>{currentDate} in {location}</p>
					<h3>{currentWeather.main.temp.toFixed(0)}°</h3>
					<p>{currentWeather.weather[0].main}</p>
				</div>
				<div>
					<StarBorderIcon/>
						<img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt={currentWeather.weather[0].description}/>
				</div>
			</div>
		)
	}
	return null
	}
	