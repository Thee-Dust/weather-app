import { Cords } from '../../Utilities/Utilitiles'
const apiKey = process.env.REACT_APP_WEATHER_API_KEY
export async function getWeather(location: string) {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
    const data = await response.json();
    const weatherReport = await fetchWeather(data);
    return weatherReport
  } catch(e) {
    throw Error(e.message);
  }
};

const fetchWeather = async(cords: Cords) => {
  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cords[0].lat}&lon=${cords[0].lon}&appid=${apiKey}`);
    const data = response.json();
    return data
  } catch(e) {
    throw Error(e.message);
  }
};

