import { WeatherResponse } from '../types/weather';

const fetchWeatherData = async (): Promise<WeatherResponse> => {
  const latitude = process.env.LATITUDE;
  const longitude = process.env.LONGITUDE;
  const baseUrl = process.env.WEATHER_API_URL;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error('API key is not defined');
  }

  const url = `${baseUrl}?latitude=${latitude}&longitude=${longitude}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed with status ${response.status}`);
  }
  return (await response.json()) as WeatherResponse;
};

export default fetchWeatherData;
