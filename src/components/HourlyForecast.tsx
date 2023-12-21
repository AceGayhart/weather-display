import React from 'react';
import WeatherIcons from './WeatherIcon';
import { HourlyForecast } from '../types/weather';
import {
  kelvinToFahrenheit,
  kelvinToCelsius,
  convertUnixToDate,
} from '../utils/weather';

import styles from './HourlyForecast.module.css';
import generateGradient from '../utils/generateGradient';
import useCurrentTime from '../hooks/useCurrentTime';

interface HourlyForecastProps {
  hourlyData: HourlyForecast[];
  limit?: number;
}

const getCurrentHour = (date: Date) => {
  return new Date(date.setMinutes(0, 0, 0));
};

const HourDisplay: React.FC<{ date: Date; isCurrentHour: boolean }> = ({
  date,
  isCurrentHour,
}) => {
  if (isCurrentHour) {
    return <div>Now</div>;
  }

  const formattedHour = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });

  return <div>{formattedHour}</div>;
};

const HourlyForecastComponent: React.FC<HourlyForecastProps> = ({
  hourlyData,
  limit = 50,
}) => {
  const { currentDateTime } = useCurrentTime();

  const currentHour = getCurrentHour(currentDateTime);

  const displayedHours = hourlyData
    .filter((hour) => new Date(hour.dt * 1000) >= currentHour)
    .slice(0, limit);

  return (
    <div className={styles.container}>
      {displayedHours.map((hour, index) => {
        const hourDate = new Date(hour.dt * 1000);
        const isCurrentHour = hourDate.getTime() === currentHour.getTime();

        const hourStyle = {
          background: generateGradient(convertUnixToDate(hour.dt)),
        };

        const rainAmount = hour.rain ? hour.rain['1h'].toFixed(2) : null;
        const snowAmount = hour.snow ? hour.snow['1h'].toFixed(2) : null;

        return (
          <div key={index} className={styles.hourForecast} style={hourStyle}>
            <HourDisplay
              date={convertUnixToDate(hour.dt)}
              isCurrentHour={isCurrentHour}
            />
            <WeatherIcons conditions={hour.weather} pop={hour.pop} size='2x' />
            <div className={styles.temperature}>
              {`${kelvinToFahrenheit(hour.temp).toFixed(1)}`}&deg;F
              <br />
              {`${kelvinToCelsius(hour.temp).toFixed(1)}`}&deg;C
            </div>
            {rainAmount && <div>{rainAmount} mm/h Rain</div>}
            {snowAmount && <div>{snowAmount} mm/h Snow</div>}
          </div>
        );
      })}
    </div>
  );
};

export default HourlyForecastComponent;
