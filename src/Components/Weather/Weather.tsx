import React, { ReactElement, useState } from 'react'
import CurrentForecast from '../CurrentForecast/CurrentForecast'
import FutureForecast from '../FutureForecast/FutureForecast'
import Navbar from '../Navbar/Navbar'
import './Weather.scss'

export default function Weather({ findCity, tempScale, changeTemp, searchedCity }: { findCity: (city: string) => void, tempScale: string, changeTemp: ((scale: string) => void), searchedCity: string }): ReactElement | null{
	const [appTheme, setAppTheme] = useState<string>()

	const setTheme = (weather: string, time: string) => {
		const timeOfDay = time.slice(-1);
		const theme = `${weather}-${timeOfDay}`;
		setAppTheme(theme)
	}
	
	return (
		<div className={`weather ${appTheme}`}>
			<Navbar findCity={findCity} tempScale={tempScale} changeTemp={changeTemp} />
			<CurrentForecast searchedCity={searchedCity} tempScale={tempScale} setTheme={setTheme} />
			<FutureForecast searchedCity={searchedCity} tempScale={tempScale} />
		</div>
	)
}
