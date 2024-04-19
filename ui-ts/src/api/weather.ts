import axios from 'axios';

export interface WeatherData {
  periods: {
    temperature: number;
    temperatureUnit: string;
    windSpeed: string;
    shortForecast: string;
    name: string;
    icon: string;
  }[];
}


const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const apiUrl = 'http://localhost:3000/api/weather';

  const params = {
    latitude,
    longitude
  };

  try {
    const response = await axios.get(apiUrl, {params});
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export default getWeatherData;