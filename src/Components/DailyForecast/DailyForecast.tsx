import React, { ReactElement } from 'react'
import { Daily } from '../../Utilities/Utilitiles'
import './DailyForecast.scss'
import moment from 'moment';


export default function DailyForecast({ dailyForcast, timezoneOffset }: { dailyForcast: Daily[], timezoneOffset: number }): ReactElement {
	const dailyCards = dailyForcast.map((day, index) => {
		const secondsToMilliseconds = 1000;
		const date = new Date((day.dt + timezoneOffset) * secondsToMilliseconds);
		const futureDate = moment.parseZone(date).utc().format('ddd Do');
		return (
			<div key={index} className='daily-card'>
				<span>{index === 0 ? 'Today' : futureDate}</span>
				<img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description}/>
				<span>Low of {day.temp.min.toFixed(0)}°</span>
				<span>High of {day.temp.max.toFixed(0)}°</span>
			</div>
		)
	})

	return (
		<div className='daily-forecast-container'>
			{dailyCards}
		</div>
	)
}
