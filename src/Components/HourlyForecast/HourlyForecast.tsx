import React, { ReactElement } from 'react'
import { Hourly } from '../../Utilities/Utilitiles'
import './HourlyForecast.scss'
import moment from 'moment'

export default function HourlyForcast({ hourlyReport, timezoneOffset }: { hourlyReport: Hourly[], timezoneOffset: number }): ReactElement {
	const hourCards = hourlyReport.map((hour, index) => {
		const secondsToMilliseconds = 1000;
		const date = new Date((hour.dt + timezoneOffset) * secondsToMilliseconds);
		const futureHour = moment.parseZone(date).utc().format('h A');;
		return (
			<div key={index} className='hourly-card'>
				<span>{ index === 0 ? 'Now' : futureHour}</span>
				<img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt={hour.weather[0].description}/>
				<span>{hour.temp.toFixed()}°</span>
			</div>
			)
	})

	return (
		<div className='hourly-forecast-container'>
			{hourCards}
		</div>
	)
}
