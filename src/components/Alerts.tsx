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
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  };

  const formatter = new Intl.DateTimeFormat('en-US', {
    ...options,
  
  });
  

  console.log(alerts[0]);
  const formatDescription = (description: string) => {
    // Split the description into segments based on '*' characters
    const segments = description.split('*').map(segment => segment.trim());

    return segments.map((segment, index) => {
      if (index === 0) {
        // Treat the first segment as a header
        return <p className={styles.descriptionHeading} key={index}>{segment}</p>;
      } else {
        // Wrap subsequent segments in divs with a span for the subheading
        const [subheading, ...rest] = segment.split('...');
        return (
          <p key={index}>
            <span className={styles.descriptionSubheading}>{subheading}...</span>
            {rest.join('...')}
          </p>
        );
      }
    });
  };

  return (
    <div className={styles.container}>
      {alerts.map((alert, index) => (
        <div key={index} className={styles.alert}>
          <div className={styles.event}>{alert.event}</div>
          <div className={styles.description}>{formatDescription(alert.description)}</div>
          <div><span className={styles.descriptionSubheading}>Start:</span> {formatter.format( convertUnixToDate(alert.start))}</div>
          <div><span className={styles.descriptionSubheading}>End:</span> {formatter.format(convertUnixToDate(alert.end))}</div>
          {/* Optionally display tags */}
          {alert.tags && alert.tags.length > 0 && (
            <div><span className={styles.descriptionSubheading}>Tags:</span> {alert.tags.join(', ')}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Alerts;