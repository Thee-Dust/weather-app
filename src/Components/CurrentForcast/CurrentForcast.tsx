import React from 'react'
import { CurrentWeather } from '../../Utilities/Utilitiles'

export default function CurrentForcast({ currentWeather }: { currentWeather: Partial<CurrentWeather> }) {

	if(!!currentWeather.dt){
		const now = new Date(currentWeather.dt)
		console.log(now)
		return (
			<div>
			
			</div>
		)
	}
	return null
}
