import React, { FormEvent, useRef } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import './Home.scss'

export default function Home({ findCity }: { findCity: (city: string) => void }) {
	const homeCityRef = useRef<HTMLInputElement>(null);
	const history = useHistory();

	const searchCity = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (homeCityRef.current) {
			findCity(homeCityRef.current.value);
			history.push(`/${homeCityRef.current.value}`)
			homeCityRef.current.value = '';
		}
	}

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
		<div className='home'>
			<h1>The Duststorm</h1>
			<form onSubmit={searchCity} className="search-city">
				<h2>Search for a city to get the weather</h2>
				<TextField id='custom-css-standard-input' inputRef={homeCityRef} label='Search by City' className={searchCityStyle.root} />
			</form>
		</div>
	)
}
