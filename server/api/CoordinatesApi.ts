import axios from 'axios';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const getCoordinates = async (address: string): Promise<Coordinates> => {
  const apiUrl = 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress';
  const params = {
    address: address,
    benchmark: 'Public_AR_Current',
    format: 'json'
  };

  try {
    const response = await axios.get(apiUrl, { params });
    const { x, y } = response.data.result.addressMatches[0].coordinates;
    return { latitude: y, longitude: x };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

export default getCoordinates;