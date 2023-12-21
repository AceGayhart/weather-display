import React from 'react';
import useCurrentTime from '../hooks/useCurrentTime';
import styles from './WorldClock.module.css';

function formatTimes(
  timeZones: string[],
  currentTime: Date
): { [key: string]: { time: string; dateOffset: string; timeZone: string } } {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZoneName: 'shortGeneric',
  };

  const times: {
    [key: string]: { time: string; dateOffset: string; timeZone: string };
  } = {};

  for (const timeZone of timeZones) {
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      ...timeOptions,
      timeZone,
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      ...dateOptions,
      timeZone,
    });

    const timeZoneFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      timeZoneName: 'long',
    });

    const localDateTime = new Date(
      currentTime.toLocaleString('en-US', { timeZone })
    );
    const dayDifference = localDateTime.getDate() - currentTime.getDate();
    let dateLabel = '';
    let hourDifference = localDateTime.getHours() - currentTime.getHours();

    switch (dayDifference) {
      case 0:
        dateLabel = 'Today';
        break;
      case 1:
        dateLabel = 'Tomorrow';
        hourDifference = 24 - currentTime.getHours() + localDateTime.getHours();
        break;
      case -1:
        dateLabel = 'Yesterday';
        hourDifference = -(
          currentTime.getHours() +
          (24 - localDateTime.getHours())
        );
        break;
      default:
        dateLabel = dateFormatter.format(localDateTime);
    }

    const timeZoneName = (timeZoneFormatter.format(currentTime) + ', ').split(
      ', '
    )[1];

    times[timeZone] = {
      time: timeFormatter.format(currentTime),
      dateOffset: `${dateLabel}, +${hourDifference} hrs`,
      timeZone: timeZoneName,
    };
  }

  return times;
}

const timeZoneLabels: { [key: string]: string } = {
  'America/New_York': 'Cleveland, OH, USA', // EST/EDT
  'America/Montevideo': 'Montevideo, Uruguay', // UYT
  UTC: 'UTC',
  'Europe/Kiev': 'Kyiv, Ukraine', // EET/EEST
};

const WorldClock = () => {
  const { currentDateTime } = useCurrentTime();
  const times = formatTimes(Object.keys(timeZoneLabels), currentDateTime);

  return (
    <div className={styles.container}>
      {Object.entries(timeZoneLabels).map(([timeZone, label]) => (
        <div key={timeZone} className={styles.timeZoneBlock}>
          <div className={styles.locationLabel}>{label}</div>
          <div className={styles.timeDisplay}>{times[timeZone].time}</div>
          <div className={styles.dateOffset}>{times[timeZone].dateOffset}</div>
          <div className={styles.timeZone}>{times[timeZone].timeZone}</div>
        </div>
      ))}
    </div>
  );
};

export default WorldClock;
