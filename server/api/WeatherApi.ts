import axios from 'axios';

interface WeatherData {
  periods: {
    temperature: number;
    temperatureUnit: string;
    windSpeed: string;
    shortForecast: string;
  }[];
}

const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const apiUrl = 'https://api.weather.gov/points';
  try {
    const response = await axios.get(`${apiUrl}/${latitude},${longitude}`);
    const forecastUrl = response.data.properties.forecast;
    const forecastResponse = await axios.get(forecastUrl);
    return forecastResponse.data.properties;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export default getWeatherData;