import React from 'react';
import WeatherIcons from './WeatherIcon'; // Import the WeatherIcons component
import { DailyForecast } from '../types/weather'; // Import the type definitions
import { kelvinToFahrenheit, kelvinToCelsius, convertUnixToDate } from '../utils/weather';

import styles from './DailyForecast.module.css';
import useCurrentTime from '../hooks/useCurrentTime';

interface DailyForecastProps {
  dailyData: DailyForecast[]; // Adjust this type based on your actual data structure
  limit?: number; // Optionally set a limit to the number of days to display
}

const getCurrentDate = (date: Date) => {
  return new Date(date.setHours(0,0,0,0));
};

const DayDisplay: React.FC<{ date: Date }> = ({ date }) => {

  const { currentDateTime } = useCurrentTime();

  const today = getCurrentDate(currentDateTime);
  const givenDate = getCurrentDate(date);
  
  // Compare the dates
  const isToday = givenDate.getTime() === today.getTime();

  if (isToday) {
    return <span>Today</span>;
  } else {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    return <span>{dayOfWeek}</span>;
  }
};

const DailyForecastComponent: React.FC<DailyForecastProps> = ({
  dailyData,
  limit = 50,
}) => {
  // Slice the array to the limit
  const displayedDays = dailyData.slice(0, limit);

  return (
    <div className={styles.container}>
      {displayedDays.map((day, index) => (
        <div key={index} className={styles.dayForecast}>
          <div>
            <DayDisplay date={convertUnixToDate(day.dt)} />
          </div>
          <WeatherIcons conditions={day.weather} pop={day.pop} size='2x'/>
          <div>
            {day.summary}
            </div>
          <div>
            {`${kelvinToFahrenheit(day.temp.min).toFixed(0)}`}&deg;F<br />
            {`${kelvinToCelsius(day.temp.min).toFixed(0)}`}&deg;C
          </div>
          <div>
            {`${kelvinToFahrenheit(day.temp.max).toFixed(0)}`}&deg;F<br />
            {`${kelvinToCelsius(day.temp.max).toFixed(0)}`}&deg;C
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyForecastComponent;
