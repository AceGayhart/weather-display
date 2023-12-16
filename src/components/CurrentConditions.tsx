import React from 'react';
import {
  convertUnixToDate,
  kelvinToCelsius,
  kelvinToFahrenheit,
} from '../utils/weather';
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
  const date = convertUnixToDate(currentConditions.dt);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.primaryTemperature} ${styles[temperatureColor]}`}
      >
        {temperatureF.toFixed(2)}&deg;F
        <br />
        {temperatureC.toFixed(2)}&deg;C
      </div>
      <WeatherIcons conditions={currentConditions.weather} size='8x' />
      <div className={styles.updateDate}>As of {date.toString()}</div>
    </div>
  );
};

export default CurrentConditions;
