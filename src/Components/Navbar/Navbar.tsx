import React, { FormEvent, useRef, ReactElement, useState, useEffect } from 'react'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import './NavBar.scss'
import { whileStatement } from '@babel/types';

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
				<button onClick={() => favoriteCity(city)}><CloseIcon/></button>
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
		console.log(cityRef.current?.value)
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


	const searchCityStyle = makeStyles({
		root: {
			'& label': {
				color: 'white',
			},
			'& .MuiInput-underline:before': {
				borderBottomColor: 'white',
			},
			'& label.Mui-focused': {
				color: 'white',
			},
			'& .MuiInput-underline:after': {
				borderBottomColor: 'white',
			},
			'& .MuiOutlinedInput-root': {
				borderColor: 'white'
			},
		},
	})(TextField);

	return (
		<header>
			<div className="app-controls">
				<h1>The DustStorm</h1>
				<form onSubmit={searchCity} className="search-city">
					<TextField id='custom-css-standard-input' inputRef={cityRef} label='Search by City' className={searchCityStyle.root} />
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
