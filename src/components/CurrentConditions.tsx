import React from 'react';
import { kelvinToCelsius, kelvinToFahrenheit } from '../utils/weather';
import WeatherIcons from './WeatherIcon';
import { CurrentWeather } from '../types/weather';
import styles from './CurrentConditions.module.css';

interface CurrentConditionsProps {
  currentConditions: CurrentWeather;
}

function getTemperatureColor(temperatureF: number) {
  if (temperatureF >= 85) {
    return 'hot';
  } else if (temperatureF >= 60) {
    return 'warm';
  } else {
    return 'cold';
  }
}

const CurrentConditions: React.FC<CurrentConditionsProps> = ({
  currentConditions,
}) => {
  const temperatureF = kelvinToFahrenheit(currentConditions.temp);
  const temperatureColor = getTemperatureColor(temperatureF);
  const temperatureC = kelvinToCelsius(currentConditions.temp);

  return (
    <div className={styles.container}>
      <div className={`${styles.temperature} ${styles[temperatureColor]}`}>
        {temperatureF.toFixed(2)}&deg;F
        <br />
        {temperatureC.toFixed(2)}&deg;C
      </div>
      <WeatherIcons conditions={currentConditions.weather} size='8x' />
    </div>
  );
};

export default CurrentConditions;
