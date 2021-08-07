import React from 'react'
import dayjs from 'dayjs'
import { CurrentWeather } from '../../Utilities/Utilitiles'
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function CurrentForcast({ currentWeather }: { currentWeather: CurrentWeather }) {

		console.log(currentWeather)
		const today = new Date(currentWeather.dt * 1000)
		const currentDate = dayjs(today).format('ddd, MMMM D, h:mm A')
		const location = `${currentWeather.name}, ${currentWeather.sys?.country}`
		return (
			<div>
				<div>
					<p>{currentDate} in {location}</p>
					<h3>{currentWeather.main.temp}°</h3>
					<p>{currentWeather.weather[0].main}</p>
				</div>
				<div>
					<StarBorderIcon/>
					<img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}/>
				</div>
			</div>
		)
}
