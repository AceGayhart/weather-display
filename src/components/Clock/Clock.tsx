import React from 'react';
import useCurrentTime from '../../hooks/useCurrentTime';
import styles from './Clock.module.css';
import Weekday from './Weekday';

const Clock = () => {
  const { currentDateTime, currentZonedDateTime } = useCurrentTime();

  const hour = currentZonedDateTime.hour;

  const formattedHour = (hour % 12 === 0 ? 12 : hour % 12)
    .toString()
    .padStart(2, ' ');
  const minute = currentZonedDateTime.minute.toString().padStart(2, '0');
  const second = currentZonedDateTime.second.toString().padStart(2, '0');
  const amPm = hour < 12 ? 'AM' : 'PM';

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={styles.container}>
      {/* <Weekday currentDayOfWeek={currentZonedDateTime.dayOfWeek} /> */}

      <div className={styles.time}>
        <span className={styles.numbers}>{formattedHour}</span>
        <span className={styles.timeSeparator}>:</span>
        <span className={styles.numbers}>{minute}</span>
        <span className={styles.timeSeparator}>:</span>
        <span className={styles.numbers}>{second}</span>

        <div className={styles.timeAmpmContainer}>
          <div
            className={`${styles.timeAmpm} ${
              amPm === 'AM' ? styles.active : styles.inactive
            }`}
          >
            AM
          </div>
          <div
            className={`${styles.timeAmpm} ${
              amPm === 'PM' ? styles.active : styles.inactive
            }`}
          >
            PM
          </div>
        </div>
      </div>
      {/* <div className={styles.date}>{formattedDate}</div> */}
    </div>
  );
};

export default Clock;
