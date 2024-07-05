import React from 'react';
import styles from './Weekday.module.css';

const Weekday: React.FC<{ currentDayOfWeek: number }> = ({
  currentDayOfWeek,
}) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Temporal's week starts on Monday (1) and ends on Sunday (7).
  const adjustedDayOfWeek = currentDayOfWeek % 7;

  return (
    <div className={styles.container}>
      {days.map((day, index) => (
        <div
          key={day}
          className={`${styles.dayOfWeek} ${
            index === adjustedDayOfWeek ? styles.active : styles.inactive
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default Weekday;
