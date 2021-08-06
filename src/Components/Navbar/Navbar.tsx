import React, { FormEvent, useRef } from 'react'
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar() {
	const cityRef = useRef(null);

	const searchCity = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<header>
			<h1>Weather App</h1>
			<form onSubmit={searchCity}>
				<input type='text' ref={cityRef} placeholder='Search by City' />
				<button type='submit'><SearchIcon/></button>
			</form>
		</header>
	)
}
