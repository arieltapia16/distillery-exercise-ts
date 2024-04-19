import axios from 'axios';

interface ApiResponse {
  latitude: number;
  longitude: number;
  status: number;
  statusText: string;
  headers: {
    [key: string]: string;
  };
}
interface Coordinates {
  latitude: number;
  longitude: number;
}

const getCoordinates = async (address: string): Promise<Coordinates> => {
  const apiUrl = 'http://localhost:3000/api/coordinates';
  const params = {
    address: address,
    benchmark: 'Public_AR_Current',
    format: 'json'
  };

  try {
    const response = await axios.get<ApiResponse>(apiUrl, { params });
    const { latitude, longitude } = response.data;
    return { latitude, longitude };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};


export default getCoordinates;