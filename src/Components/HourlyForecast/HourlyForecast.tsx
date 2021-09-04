import React, { ReactElement } from 'react'
import dayjs from 'dayjs'
import { Hourly } from '../../Utilities/Utilitiles'
import './HourlyForecast.scss'

export default function HourlyForcast({ hourlyReport }: { hourlyReport: Hourly[] }): ReactElement {
	const hourCards = hourlyReport.map((hour, index) => {
		const date = new Date(hour.dt * 1000);
		const futureHour = dayjs(date).format('h A');
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
