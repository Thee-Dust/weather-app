import { Cords } from '../../Utilities/Utilitiles'
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export async function getWeather(location: string, tempScale: string) {
  try {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
    const cords = await response.json();
		console.log(cords)
    const weatherReport = await fetchWeather(cords, tempScale);
    return weatherReport
  } catch(e) {
    throw Error(e.message);
  }
};

const fetchWeather = async(cords: Cords[], tempScale: string) => {
  try{
		const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cords[0].lat}&lon=${cords[0].lon}&appid=${apiKey}&units=${tempScale}`);
    const weather = await response.json();
    return weather
  } catch(e) {
    throw Error(e.message);
  }
};

export async function getCurrentWeather(city: string, tempScale: string) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${tempScale}`);
    return response.json()
  } catch(e) {
    throw Error(e.message);
  }
} 



