import React from 'react';
import { WeatherAlert } from '../types/weather';
import styles from './Alerts.module.css';
import { convertUnixToDate } from '../utils/weather';

interface AlertsProps {
  alerts: WeatherAlert[];
}

const Alerts: React.FC<AlertsProps> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return null; // Render nothing if there are no alerts
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat('en-US', {
    ...options,
  });

  const formatDescription = (description: string, compositeKey: string) => {
    // Split the description into segments based on '*' characters
    const segments = description.split('*').map((segment) => segment.trim());

    return segments.map((segment, index) => {
      const key = `${compositeKey}-${index}`;

      if (index === 0) {
        return (
          <p className={styles.descriptionHeading} key={key}>
            {segment}
          </p>
        );
      } else {
        const [subheading, ...rest] = segment.split('...');
        return (
          <React.Fragment key={key}>
            <h2 className={styles.descriptionSubheading}>{subheading}</h2>
            <p key={key}>{rest.join('...')}</p>
          </React.Fragment>
        );
      }
    });
  };

  return (
    <div className={styles.container}>
      {alerts.map((alert, index) => {
        const compositeKey = `${alert.start}-${alert.end}-${alert.event}-${index}`;

        return (
          <div key={compositeKey} className={styles.alert}>
            <h1 className={styles.event}>{alert.event}</h1>
            {formatDescription(alert.description, compositeKey)}

            <h2>DATE</h2>
            <p>
              {formatter.format(convertUnixToDate(alert.start))}
              &mdash;
              {formatter.format(convertUnixToDate(alert.end))}
            </p>

            {alert.tags && alert.tags.length > 0 && (
              <>
                <h2>TAGS</h2>
                <p>{alert.tags.join(', ')} </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Alerts;
