import React from 'react';
import useCurrentTime from '../hooks/useCurrentTime';
import styles from './Clock.module.css';

const Clock = () => {
  const { currentDateTime, currentZonedDateTime } = useCurrentTime();

  const hour = currentZonedDateTime.hour;
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const minute = currentZonedDateTime.minute.toString().padStart(2, '0');
  const second = currentZonedDateTime.second.toString().padStart(2, '0');
  const amPm = hour < 12 ? 'AM' : 'PM';

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <span className={styles.timeHour}>{formattedHour}</span>
        <span className={styles.timeSeparator}>:</span>
        <span className={styles.timeMinute}>{minute}</span>
        <span className={styles.timeSeparator}>:</span>
        <span className={styles.timeSecond}>{second}</span>
        <span className={styles.timeSeparator}>{' '}</span>
        <span className={styles.timeAmpm}>{amPm}</span>
      </div>
      <div className={styles.date}>{formattedDate}</div>
    </div>
  );
};

export default Clock;
