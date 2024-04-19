import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Stack, TextField, Typography } from '@mui/material';
import getCoordinates from './api/coordinates';
import getWeatherData, { WeatherData } from './api/weather';

function App() {
  const [address, setAddress] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { latitude, longitude } = await getCoordinates(address);
      const weatherData = await getWeatherData(latitude, longitude);
      setWeatherData(weatherData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Add a location
      </Typography>
      <Stack alignItems="center" my={5}>
        <Box component="form" onSubmit={handleSubmit} sx={{width: '60%'}}>
          <TextField
            label="Address"
            variant="outlined"
            value={address}
            onChange={handleAddressChange}
            fullWidth
            margin="normal"
            placeholder="n° address, City, State, zipCode"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Get Weather
          </Button>
        </Box>
      </Stack>

      {loading && (
        <Stack m={4} gap={2} direction="row" alignItems="center">
          <CircularProgress color="inherit" />
          <span>Searching...</span>
        </Stack>
      )}
      {weatherData && !loading && (
      <Stack direction="row" gap={2} justifyContent="center">
          {weatherData.periods.map((day, index) => {
            if (index % 2 == 0) {
              return (
              <Card sx={{ maxWidth: '10%' }}>
                <CardMedia
                  sx={{ height: 100, backgroundSize: 'cover' }}
                  image={day.icon}
                  title={day.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {day.name}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="text">
                    Temperatures
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${index == 0 ? 'Now' : 'Day'}:`} {`${day.temperature}° ${day.temperatureUnit}`} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Night: {`${weatherData.periods[index+1].temperature}° ${weatherData.periods[index+1].temperatureUnit}`}
                  </Typography>
                  <Typography variant="body1" mt={2}>
                    Short Forecast:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {day.shortForecast}
                  </Typography>
                </CardContent>
              </Card>
              )
            }
        })}
          
      </Stack>
        
      )}
    </Container>
  );
}

export default App;