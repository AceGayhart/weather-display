import React from 'react';
import useCurrentTime from '../hooks/useCurrentTime';
import styles from './WorldClock.module.css';

function formatTimes(
  timeZones: string[],
  currentDateTime: Date
): { [key: string]: { time: string; dateOffset: string; timeZone: string } } {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const times: {
    [key: string]: { time: string; dateOffset: string; timeZone: string };
  } = {};

  for (const timeZone of timeZones) {
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      ...timeOptions,
      timeZone,
    });

    const timeZoneFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      timeZoneName: 'long',
    });

    const localDateTime = new Date(
      currentDateTime.toLocaleString('en-US', { timeZone })
    );

    const localDate = new Date(
      localDateTime.getFullYear(),
      localDateTime.getMonth(),
      localDateTime.getDate()
    );

    const currentDate = new Date(
      currentDateTime.getFullYear(),
      currentDateTime.getMonth(),
      currentDateTime.getDate()
    );

    // Calculate the difference in milliseconds and convert to days
    const dayDifference =
      (localDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

    let hourDifference = localDateTime.getHours() - currentDateTime.getHours();

    let dateLabel = '';
    switch (dayDifference) {
      case 0:
        dateLabel = 'Today';
        break;
      case 1:
        dateLabel = 'Tomorrow';
        hourDifference =
          24 - currentDateTime.getHours() + localDateTime.getHours();
        break;
      case -1:
        dateLabel = 'Yesterday';
        hourDifference = -(
          currentDateTime.getHours() +
          (24 - localDateTime.getHours())
        );
        break;
      default:
        dateLabel =
          dayDifference > 0
            ? `${dayDifference} days ahead`
            : `${Math.abs(dayDifference)} days behind`;
        break;
    }

    const timeZoneName = (
      timeZoneFormatter.format(currentDateTime) + ', '
    ).split(', ')[1];

    times[timeZone] = {
      time: timeFormatter.format(currentDateTime),
      dateOffset: `${dateLabel}, ${hourDifference} hrs`,
      timeZone: timeZoneName,
    };
  }

  return times;
}

const timeZoneLabels: { [key: string]: string } = {
  'America/New_York': 'Cleveland, OH, USA', // EST/EDT
  'America/Montevideo': 'Montevideo, Uruguay', // UYT
  UTC: 'UTC',
  //'America/Los_Angeles': 'San Francisco, CA, USA',
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
