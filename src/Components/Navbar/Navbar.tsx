import React, { FormEvent, useRef } from 'react'
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar({ findCity, favoriteCities }: { findCity: (city: string) => void, favoriteCities: string[] }) {
	const cityRef = useRef<HTMLInputElement>(null);

	const searchCity = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(cityRef.current) {
			console.log(cityRef.current.value)
			findCity(cityRef.current.value)
		}
	}

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
				{favoriteCities}
			</div>
		</header>
	)
}
