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
				<p>{index === 0 ? 'Today' : futureDate}</p>
				<img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description}/>
				<p>Low of <span className='day-temp'>{day.temp.min.toFixed(0)}°</span></p>
				<p>High of <span className='day-temp'>{day.temp.max.toFixed(0)}°</span></p>
			</div>
		)
	})

	return (
		<div className='daily-forecast-container'>
			{dailyCards}
		</div>
	)
}
