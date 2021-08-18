import React, { useState, useEffect, MouseEvent } from 'react'
import { Hourly } from '../../Utilities/Utilitiles';
import { getWeather } from '../Api/ApiCall'
import HourlyForcast from '../HourlyForecast/HourlyForcast';

export default function FutureForcast() {
	const [hourlyForcast, setHourlyForcast ] = useState<boolean>(true)
	const [futureForcast, setFurtureForast ] = useState<Hourly[]>([]);
	const [ error, setError ] = useState<string>('');

	useEffect(() => {
		const callForcast = async () => {
			setError('')
			try {
				const forcast = await getWeather('orlando');
				setFurtureForast(forcast.hourly)
			} catch(e) {
				setError(e.message)
			}
		}
		callForcast()
	},[])

	const switchForcast = (e: MouseEvent) => {
		e.preventDefault();
		setHourlyForcast(prevState => !prevState);
	}

	if(!!futureForcast.length) {
		return (
			<div>
				<div>
					<button onClick={switchForcast} disabled={!hourlyForcast}>Hourly</button>
					<button onClick={switchForcast} disabled={hourlyForcast}>Daily</button>
				</div>
				<div>
					<HourlyForcast hourlyReport={futureForcast}/>
				</div>
			</div>
		);
	}
	return null
}
