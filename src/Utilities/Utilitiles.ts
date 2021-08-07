import { getWeather } from "../Components/Api/ApiCall"

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
    // rain: {
    //   1h: number
    // },
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
  

  interface Weather 
  {
    description: string,
    icon: string,
    id: number,
    main: string
  }
export interface Event 
  {

  }


