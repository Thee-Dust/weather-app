import React, { useState, useEffect, MouseEvent } from 'react'
import { Daily, Hourly } from '../../Utilities/Utilitiles';
import { getWeather } from '../Api/ApiCall'
import DailyForcast from '../DailyForcast/DailyForcast';
import HourlyForcast from '../HourlyForecast/HourlyForcast';

export default function FutureForcast({ searchedCity }: { searchedCity: string }) {
	const [ hourly, setHourly ] = useState<boolean>(true)
	const [ hourlyForcast, setHourlyForcast ] = useState<Hourly[]>([]);
	const [ dailyForcast, setDailyForcast ] = useState<Daily[]>([])
	const [ error, setError ] = useState<string>('');

	useEffect(() => {
		const callForcast = async (searchedCity: string) => {
			setError('')
			try {
				const forcast = await getWeather(searchedCity);
				setHourlyForcast(forcast.hourly)
				setDailyForcast(forcast.daily)
			} catch (e) {
				setError(e.message)
			}
		}
		callForcast(searchedCity)
		}, [searchedCity]);

	const switchForcast = (e: MouseEvent) => {
		e.preventDefault();
		setHourly(prevState => !prevState);
	}

	if(!!hourlyForcast.length) {
		return (
			<div>
				<div>
					<button onClick={switchForcast} disabled={hourly}>Hourly</button>
					<button onClick={switchForcast} disabled={!hourly}>Daily</button>
				</div>
				<div>
					{hourly ? 
					<HourlyForcast hourlyReport={hourlyForcast}/> :
					<DailyForcast dailyForcast={dailyForcast}/> }
				</div>
			</div>
		);
	}
	return null
}
