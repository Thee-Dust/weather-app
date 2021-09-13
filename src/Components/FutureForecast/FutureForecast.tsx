import React, { useState, useEffect, MouseEvent, ReactElement } from 'react'
import { Daily, Hourly } from '../../Utilities/Utilitiles';
import { getWeather } from '../Api/ApiCall'
import DailyForecast from '../DailyForecast/DailyForecast';
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import './FutureForecast.scss'

export default function FutureForecast({ searchedCity, tempScale }: { searchedCity: string, tempScale: string }): ReactElement| null {
	const [ hourly, setHourly ] = useState<boolean>(true)
	const [ timezoneOffset, setTimezoneOffset ] = useState<number>(0)
	const [ hourlyForecast, setHourlyForecast ] = useState<Hourly[]>([]);
	const [ dailyForecast, setDailyForecast ] = useState<Daily[]>([])
	const [ error, setError ] = useState<string>('');
	
	useEffect(() => {
		const callForcast = async (searchedCity: string, tempScale: string) => {
			setError('')
			try {
				const forecast = await getWeather(searchedCity, tempScale);
				setHourlyForecast(forecast.hourly)
				setDailyForecast(forecast.daily)
				setTimezoneOffset(forecast.timezone_offset)
			} catch (e) {
				setError(e.message)
			}
		}
		callForcast(searchedCity, tempScale)
		}, [searchedCity, tempScale]);

	const switchForecast = (e: MouseEvent) => {
		e.preventDefault();
		setHourly(prevState => !prevState);
	}

	if(!error && !hourlyForecast.length) {
		return (
			<div className='future-forecast-container'>
				<div className='future-controls'>
					<div className='skeleton skeleton-time'></div>
					<div className='skeleton skeleton-time'></div>
				</div>
				<div className='future-forecast'>
					<div className='hourly-forecast-container'>
						<div className='hourly-card'>
							<div className='skeleton skeleton-time'></div>
							<div className='hour-img skeleton'></div>
							<div className='skeleton skeleton-temp'></div>
						</div>
						<div className='hourly-card'>
							<div className='skeleton skeleton-time'></div>
							<div className='hour-img skeleton'></div>
							<div className='skeleton skeleton-temp'></div>
						</div>
						<div className='hourly-card'>
							<div className='skeleton skeleton-time'></div>
							<div className='hour-img skeleton'></div>
							<div className='skeleton skeleton-temp'></div>
						</div>
						<div className='hourly-card'>
							<div className='skeleton skeleton-time'></div>
							<div className='hour-img skeleton'></div>
							<div className='skeleton skeleton-temp'></div>
						</div>
						<div className='hourly-card'>
							<div className='skeleton skeleton-time'></div>
							<div className='hour-img skeleton'></div>
							<div className='skeleton skeleton-temp'></div>
						</div>
					</div>
				</div>
			</div>	
		)
	}

	if(error) {
		return (
			<h1>{error}</h1>
		)
	}

	if(!!hourlyForecast.length) {
		return (
			<div className='future-forecast-container'>
				<div className='future-controls'>
					<button onClick={switchForecast} disabled={hourly}>Hourly</button>
					<button onClick={switchForecast} disabled={!hourly}>Daily</button>
				</div>
				<div className='future-forecast'>
					{hourly ? 
					<HourlyForecast hourlyReport={hourlyForecast} timezoneOffset={timezoneOffset}/> :
					<DailyForecast dailyForcast={dailyForecast} timezoneOffset={timezoneOffset}/> }
				</div>
			</div>
		);
	}
	return null
}
