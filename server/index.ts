import express, { Request, Response } from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import cors from 'cors';


const allowedOrigin = 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

import getCoordinates from './api/CoordinatesApi';
import getWeatherData from './api/WeatherApi';


app.use(express.json()); 

app.get('/api/coordinates', async (req: Request, res: Response) => {
  const { address } = req.query;
  try {
    const { latitude, longitude } = await getCoordinates(address as string);
    res.json({ latitude, longitude });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching coordinates' });
  }
});

app.get('/api/weather', async (req: Request, res: Response) => {
  const { latitude, longitude } = req.query;
  try {
    const weatherData = await getWeatherData(parseFloat(latitude as string), parseFloat(longitude as string));
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});