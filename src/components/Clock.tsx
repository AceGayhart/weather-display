import React from 'react';
import useCurrentTime from '../hooks/useCurrentTime';
import styles from './Clock.module.css';

const Clock = () => {
  const currentDateTime = useCurrentTime();

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
      <div className={styles.time}>{formattedTime}</div>
      <div className={styles.date}>{formattedDate}</div>
    </div>
  );
};

export default Clock;
