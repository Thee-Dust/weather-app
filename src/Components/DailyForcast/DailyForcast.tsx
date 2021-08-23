import dayjs from 'dayjs';
import React from 'react'
import { Daily } from '../../Utilities/Utilitiles'
import advanceFormat from 'dayjs/plugin/advancedFormat'

export default function DailyForcast({ dailyForcast }: { dailyForcast: Daily[] }) {
	dayjs.extend(advanceFormat);
	const dailyCards = dailyForcast.map((day, index) => {
		const date = new Date(day.dt * 1000);
		const futureDate = dayjs(date).format('ddd Do');
		return (
			<div key={index}>
				<span>{index === 0 ? 'Today' : futureDate}</span>
				<img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description}/>
				<span>Low of {day.temp.min.toFixed(0)}°</span>
				<span>High of {day.temp.max.toFixed(0)}°</span>
			</div>
		)
	})

	return (
		<div>
			{dailyCards}
		</div>
	)
}
