import React, { FormEvent, useRef, ReactElement, useState, useEffect } from 'react'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import './NavBar.scss'

export default function Navbar({ findCity, tempScale, changeTemp }: { findCity: (city: string) => void, tempScale: string, changeTemp: ((scale: string) => void) }): ReactElement {
	const cityRef = useRef<HTMLInputElement>(null);

	const [favoriteCities, setFavoriteCities] = useState<string[]>(() => {
		const favCities = localStorage.getItem('favoriteCities');
		return favCities !== null
			? JSON.parse(favCities)
			: []
	});

	const cityCards = favoriteCities.map((city, index) => {
		return (
			<div key={index} className="favorite-city">
				<button onClick={() => findCity(city)}>{city}</button>
				<button onClick={() => favoriteCity(city)}>Remove</button>
			</div>
		)
	});

	const favoriteCity = (city: string) => {
		if (favoriteCities.includes(city)) {
			setFavoriteCities(prevState => prevState.filter(favCity => city !== favCity))
		} else {
			setFavoriteCities(prevState => [...prevState, city])
		}
	};

	const searchCity = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(cityRef.current) {
			findCity(cityRef.current.value);
			if (!favoriteCities.includes(cityRef.current.value)) {
				setFavoriteCities([...favoriteCities, cityRef.current.value])
			}
			cityRef.current.value = '';
		}
	}
	
	const changeTempScale = () => {
		if(tempScale === 'metric') {
			changeTemp('imperial')
		} else {
			changeTemp('metric')
		}
	}

	useEffect(() => {
		const saveCitiesToStorage = () => {
			localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
		};
		saveCitiesToStorage()
	}, [favoriteCities]);

	return (
		<header>
			<div className="app-controls">
				<h1>The DustStorm</h1>
				<form onSubmit={searchCity} className="search-city">
					<input type='text' ref={cityRef} placeholder='Search by City' />
				</form>
				<form className="temp-switch-form">
					<FormControlLabel
						className='temp-switch-label'
						control={
							<Switch
								onChange={changeTempScale}
								checked={tempScale === 'imperial' ? true : false}
								className='temp-switch'
								
								/>
						}
						labelPlacement="start"
						label={tempScale === 'imperial' ? "°F" : "°C"}
						/>
				</form>
			</div>
			<div className='saved-cities'>
				{cityCards}
			</div>
		</header>
	)
}
