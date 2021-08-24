import React, { useState, useEffect, MouseEvent, ReactElement } from 'react'
import { Daily, Hourly } from '../../Utilities/Utilitiles';
import { getWeather } from '../Api/ApiCall'
import DailyForecast from '../DailyForecast/DailyForecast';
import HourlyForecast from '../HourlyForecast/HourlyForecast';

export default function FutureForecast({ searchedCity }: { searchedCity: string }): ReactElement| null {
	const [ hourly, setHourly ] = useState<boolean>(true)
	const [ hourlyForecast, setHourlyForecast ] = useState<Hourly[]>([]);
	const [ dailyForecast, setDailyForecast ] = useState<Daily[]>([])
	const [ error, setError ] = useState<string>('');

	useEffect(() => {
		const callForcast = async (searchedCity: string) => {
			setError('')
			try {
				const forecast = await getWeather(searchedCity);
				setHourlyForecast(forecast.hourly)
				setDailyForecast(forecast.daily)
			} catch (e) {
				setError(e.message)
			}
		}
		callForcast(searchedCity)
		}, [searchedCity]);

	const switchForecast = (e: MouseEvent) => {
		e.preventDefault();
		setHourly(prevState => !prevState);
	}

	if(!!hourlyForecast.length) {
		return (
			<div>
				<div>
					<button onClick={switchForecast} disabled={hourly}>Hourly</button>
					<button onClick={switchForecast} disabled={!hourly}>Daily</button>
				</div>
				<div>
					{hourly ? 
					<HourlyForecast hourlyReport={hourlyForecast}/> :
					<DailyForecast dailyForcast={dailyForecast}/> }
				</div>
			</div>
		);
	}
	return null
}
