import React from 'react';
import useCurrentTime from '../hooks/useCurrentTime';
import styles from './WorldClock.module.css'

function formatTimes(
  timeZones: string[],
  currentTime: Date
): { [key: string]: { time: string, dateOffset: string } } {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZoneName: 'short',
  };

  const times: { [key: string]: { time: string, dateOffset: string } } = {};

  for (const timeZone of timeZones) {
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      ...timeOptions,
      timeZone,
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      ...dateOptions,
      timeZone,
    });

    const localDateTime = new Date(currentTime.toLocaleString('en-US', { timeZone }));
    const dayDifference = localDateTime.getDate() - currentTime.getDate();
    let dateLabel = '';
    let hourDifference = localDateTime.getHours() - currentTime.getHours();
    
    switch (dayDifference) {
      case 0:
        dateLabel = 'Today';
        break;
      case 1:
        dateLabel = 'Tomorrow';
        hourDifference = (24 - currentTime.getHours()) + localDateTime.getHours();
        break;
      case -1:
        dateLabel = 'Yesterday';
        hourDifference = -(currentTime.getHours() + (24 - localDateTime.getHours()));
        break;
      default:
        dateLabel = dateFormatter.format(localDateTime);
    }
    
    times[timeZone] = {
      time: timeFormatter.format(currentTime),
      dateOffset: `${dateLabel}, +${hourDifference} hrs`,
    };
  }

  return times;
}


const timeZoneLabels: { [key: string]: string } = {
  'America/New_York': 'Cleveland, Ohio, USA', // EST/EDT
  'America/Montevideo': 'Montevideo, Uraguay', // UYT
  UTC: 'UTC',
  'Europe/Kiev': 'Kyiv, Ukraine', // EET/EEST
};

const WorldClock = () => {
  const currentTime = useCurrentTime();
  const times = formatTimes(Object.keys(timeZoneLabels), currentTime);

  return (
    <div className={styles.container}>
      {Object.entries(timeZoneLabels).map(([timeZone, label]) => (
        <div key={timeZone} className={styles.timeZoneBlock}>
          <div className={styles.dateOffset}>{times[timeZone].dateOffset}</div>
          <div className={styles.timeDisplay}>{times[timeZone].time}</div>
          <div className={styles.locationLabel}>{label}</div>
        </div>
      ))}
    </div>
  );
};


export default WorldClock;
