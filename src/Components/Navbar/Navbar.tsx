import React, { FormEvent, useRef, ReactElement } from 'react'
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar({ findCity, favoriteCities, favoriteCity }: { findCity: (city: string) => void, favoriteCities: string[], favoriteCity: (city: string) => void }): ReactElement {
	const cityRef = useRef<HTMLInputElement>(null);

	const searchCity = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(cityRef.current) {
			findCity(cityRef.current.value);
			favoriteCity(cityRef.current.value)
			cityRef.current.value = '';
		}
	}

	const cityCards = favoriteCities.map((city, index) => {
		return (
			<button key={index} onClick={() => findCity(city)}>{city}</button>
		)
	});
	
	return (
		<header>
			<div>
				<h1>Weather App</h1>
				<form onSubmit={searchCity}>
					<input type='text' ref={cityRef} placeholder='Search by City' />
					<button type='submit'><SearchIcon/></button>
				</form>

			</div>
			<div>
				{cityCards}
			</div>
		</header>
	)
}
