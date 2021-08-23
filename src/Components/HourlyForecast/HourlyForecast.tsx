import React from 'react'
import dayjs from 'dayjs'
import { Hourly } from '../../Utilities/Utilitiles'

export default function HourlyForcast({ hourlyReport }: { hourlyReport: Hourly[] }) {
	const hourCards = hourlyReport.map((hour, index) => {
		const date = new Date(hour.dt * 1000);
		const futureHour = dayjs(date).format('h A');
		return (
			<div key={index}>
				<span>{futureHour}</span>
				<img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt={hour.weather[0].description}/>
				<span>{hour.temp.toFixed(0)}°</span>
			</div>
			)
	})

	return (
		<div>
			{hourCards}
		</div>
	)
}