import React, { ReactElement } from 'react'
import CurrentForecast from '../CurrentForecast/CurrentForecast'
import FutureForecast from '../FutureForecast/FutureForecast'
import Navbar from '../Navbar/Navbar'
import './Weather.scss'

export default function Weather({ findCity, tempScale, changeTemp, searchedCity, setTheme }: { findCity: (city: string) => void, tempScale: string, changeTemp: ((scale: string) => void), searchedCity: string, setTheme: (weather: string, time: string) => void }): ReactElement | null{
	return (
		<div className='weather'>
			<Navbar findCity={findCity} tempScale={tempScale} changeTemp={changeTemp} />
			<CurrentForecast searchedCity={searchedCity} tempScale={tempScale} setTheme={setTheme} />
			<FutureForecast searchedCity={searchedCity} tempScale={tempScale} />
		</div>
	)
}
