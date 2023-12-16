import React from 'react';
import { MinutelyForecast } from '../types/weather'; // Import the type definitions
import { convertUnixToDate } from '../utils/weather';
import useCurrentTime from '../hooks/useCurrentTime';

import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

import styles from './MinutelyForecast.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  annotationPlugin
);

interface MinutelyForecastProps {
  minutelyData: MinutelyForecast[];
  limit?: number; // Optionally set a limit to the number of hours to display
}

const MinutelyForecastComponent: React.FC<MinutelyForecastProps> = ({
  minutelyData,
  limit = 60,
}) => {
  const formatTime = (unixTimestamp: number) => {
    const date = convertUnixToDate(unixTimestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
      minute: '2-digit',
    });
  };

  const currentTime = useCurrentTime();
  const currentTimeFormatted = currentTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  if (!minutelyData) { return null;}

  const limitedData = minutelyData.slice(0, limit);

  const allZeroPrecipitation = limitedData.every(
    (forecast) => forecast.precipitation === 0
  );
  if (allZeroPrecipitation) {
    // return null;
    // TODO: Conditionally hide precipitation graph.
  }

  const chartData = {
    labels: limitedData.map((data) => formatTime(data.dt)), // Convert Unix timestamp to readable time
    datasets: [
      {
        label: 'Precipitation (mm/h)',
        data: limitedData.map((data) => data.precipitation),
        fill: true,
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        borderColor: 'aqua',
        borderWidth: 2,
      },
    ],
  };

; // Adjust formatting as needed

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line' as const,
            xMin: currentTimeFormatted,
            xMax: currentTimeFormatted,
            borderColor: 'red',
            borderWidth: 3,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'grey',
        },
        ticks: { color: 'grey' },
      },
      y: {
        grid: {
          color: 'grey',
        },
        ticks: { color: 'grey' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.container}>
      <div>Precipitation (mm/h)</div>
      <div className={styles.chart}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MinutelyForecastComponent;
