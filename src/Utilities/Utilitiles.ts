

export interface Cords 
{
	country: string,
	lat: number,
	local_names: object,
	lon: number,
	name: string,
	state: string
}


export interface CurrentWeather 
{
	base: string,
	clouds: {
		all: number,
	},
	cod: number,
	coord: {
		lon: number,
		lat: number
	},
	dt: number,
	id: number,
	main: {
		feels_like: number,
		humidity: number,
		pressure: number,
		temp: number,
		temp_max: number,
		temp_min: number,
	},
	name: string,
	sys: {
		country: string,
		id: number,
		sunrise: number,
		sunset: number,
		type: number
	},
	timezone: number,
	visability: number,
	weather: Weather[],
	wind: {
		speed: number,
		deg: number
	}
}
export interface Forecast
{
	current: CurrentWeatherAllInOne,
	daily: Daily[],
	hourly: Hourly[],
	lat: number,
	lon: number,
	minutely: Minutely[],
	timezone: string,
	timezone_offset: number
}

export interface CurrentWeatherAllInOne {
	clouds: number,
	dew_point: number,
	dt: number,
	feels_like: number,
	humidity: number,
	pressure: number,
	sunrise: number,
	sunset: number,
	id: number,
	temp: number,
	uvi: number,
	visability: number,
	weather: Weather[],
	wind_deg: number,
	wind_gust: number,
	wind_speed: number
}
  interface Weather 
{
	description: string,
	icon: string,
	id: number,
	main: string
}
export interface Daily 
{
	clouds: number,
	dew_point: number,
	dt: number,
	feels_like: {
		day: number,
		eve: number,
		morn: number,
		night: number
	},
	humidity: number,
	moon_phase: number,
	moonrise: number,
	moonset: number,
	pop: number,
	pressure: number,
	rain: number,
	sunrise: number,
	sunset: number,
	temp: {
		day: number,
		eve: number,
		max: number,
		min: number,
		morn: number,
		night: number
	},
	uvi: number,
	weather: Weather[],
	wind_deg: number,
	wind_gust: number,
	wind_speed: number
}

export interface Hourly
{
	clouds: number,
	dew_point: number,
	dt: number,
	feels_like: number,
	humidity: number,
	pop: number,
	pressure: number,
	temp: number,
	uvi: number,
	visability: number,
	weather: Weather[],
	wind_deg: number,
	wind_gust: number,
	wind_speed: number
}

interface Minutely 
{
	dt: number,
	precipitation: number
}

