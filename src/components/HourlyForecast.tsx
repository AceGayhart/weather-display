import React from 'react';
import WeatherIcons from './WeatherIcon'; // Import the WeatherIcons component
import { HourlyForecast } from '../types/weather'; // Import the type definitions
import {
  kelvinToFahrenheit,
  kelvinToCelsius,
  convertUnixToDate,
} from '../utils/weather';

import styles from './HourlyForecast.module.css';
import generateGradient from '../utils/generateGradient';


interface HourlyForecastProps {
  hourlyData: HourlyForecast[]; // Adjust this type based on your actual data structure
  limit?: number; // Optionally set a limit to the number of hours to display
}

const HourDisplay: React.FC<{ date: Date }> = ({ date }) => {
  const formattedHour = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });

  return <span>{formattedHour}</span>;
};

const HourlyForecastComponent: React.FC<HourlyForecastProps> = ({
  hourlyData,
  limit = 50,
}) => {
  // Slice the array to the limit
  const displayedHours = hourlyData.slice(0, limit);

  


  return (
    <div className={styles.container}>
      {displayedHours.map((hour, index) => {
        const hourStyle = {
          background: generateGradient(convertUnixToDate(hour.dt)),
        };

        return (
          <div key={index} className={styles.hourForecast} style={hourStyle}>
            <HourDisplay date={convertUnixToDate(hour.dt)} />
            <WeatherIcons conditions={hour.weather} pop={hour.pop} size='2x' />
            <div>
              {`${kelvinToFahrenheit(hour.temp).toFixed(0)}`}&deg;F
              <br />
              {`${kelvinToCelsius(hour.temp).toFixed(0)}`}&deg;C
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyForecastComponent;
