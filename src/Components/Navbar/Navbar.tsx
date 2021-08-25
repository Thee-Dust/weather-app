import React, { FormEvent, useRef, ReactElement } from 'react'
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar({ findCity, favoriteCities, favoriteCity, tempScale, changeTemp }: { findCity: (city: string) => void, favoriteCities: string[], favoriteCity: (city: string) => void, tempScale: string, changeTemp: ((scale: string) => void) }): ReactElement {
	const cityRef = useRef<HTMLInputElement>(null);

	const cityCards = favoriteCities.map((city, index) => {
		return (
			<div key={index}>
				<button onClick={() => findCity(city)}>{city}</button>
				<button onClick={() => favoriteCity(city)}>Remove</button>
			</div>
		)
	});

	const searchCity = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(cityRef.current) {
			findCity(cityRef.current.value);
			favoriteCity(cityRef.current.value)
			cityRef.current.value = '';
		}
	}
	
	const changeTempScale = (scale: string) => {
		changeTemp(scale);
	}
	return (
		<header>
			<div>
				<h1>Weather App</h1>
				<form onSubmit={searchCity}>
					<input type='text' ref={cityRef} placeholder='Search by City' />
					<button type='submit'><SearchIcon/></button>
				</form>
				<div>
					{tempScale === 'imperial' ? '°F' : '°C'}
					<button onClick={() => changeTempScale('imperial')}>°F</button>
					<button onClick={() => changeTempScale('metric')}>°C</button>
				</div>
			</div>
			<div>
				{cityCards}
			</div>
		</header>
	)
}
