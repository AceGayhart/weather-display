import { useState, useEffect } from 'react';
import fetchWeatherData from '../services/weatherService';
import { WeatherResponse } from '../types/weather';

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const cachedData = localStorage.getItem('weatherData');
    const cacheTime = localStorage.getItem('weatherDataTimestamp');
    const cacheExpireTime = Date.now() - 300_000; // 300,00 ms = 5 minutes.

    if (cachedData && cacheTime && parseInt(cacheTime, 10) > cacheExpireTime) {
      setWeatherData(JSON.parse(cachedData));
      setLoading(false);
    } else {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchWeatherData();
        localStorage.setItem('weatherData', JSON.stringify(data));
        localStorage.setItem('weatherDataTimestamp', Date.now().toString());
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setLoading(false);
        setWeatherData(null);
      }
    }
  };

  useEffect(() => {
    fetchData(); 
    const interval = setInterval(fetchData, 120_000); // 120,000 ms = 2 minutes.
    return () => clearInterval(interval); 
  }, []);

  return { weatherData, loading, error };
};

export default useWeatherData;
