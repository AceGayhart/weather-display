import React from 'react';
import { HourlyForecast } from '../types/weather';
import {
  kelvinToFahrenheit,
  kelvinToCelsius,
  convertUnixToDate,
} from '../utils/weather';

import styles from './HourlyTemperatureGraph.module.css';
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
  ChartOptions,
} from 'chart.js';

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

interface HourlyForecastProps {
  hourlyData: HourlyForecast[];
  limit?: number;
}

const getCurrentHour = (date: Date) => {
  return new Date(date.setMinutes(0, 0, 0));
};

function createSegment(data: DataPoint[], color: string) {
  return {
    yAxisID: 'yFahrenheit',
    label: 'Fahrenheit',
    data: data,
    fill: false,
    borderColor: color,
    borderWidth: 1,
    pointRadius: 0,
  };
}

type DataPoint = {
  x: string;
  y: number;
};

const HourlyTemperatureGraph: React.FC<HourlyForecastProps> = ({
  hourlyData,
  limit = 50,
}) => {
  const { currentDateTime } = useCurrentTime();

  const currentHour = getCurrentHour(currentDateTime);

  const displayedHours = hourlyData
    .filter((hour) => new Date(hour.dt * 1000) >= currentHour)
    .slice(0, limit);

  const formatTime = (unixTimestamp: number) => {
    const date = convertUnixToDate(unixTimestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  // Process displayedHours to create segments
  const segments = [];
  let currentSegment: DataPoint[] = [];
  let currentColor = 'red'; // Default color

  displayedHours.forEach((hour, index) => {
    const tempFahrenheit = kelvinToFahrenheit(hour.temp);
    const isBelowFreezing = tempFahrenheit <= 32;
    const segmentColor = isBelowFreezing ? 'blue' : 'red';

    if (segmentColor !== currentColor || index === displayedHours.length - 1) {
      if (currentSegment.length > 0) {
        // End the current segment and start a new one
        segments.push(createSegment([...currentSegment], currentColor));
        currentSegment = []; // Reset current segment
      }
      currentColor = segmentColor; // Update current color
    }

    // Add the current point to the segment
    currentSegment.push({ x: formatTime(hour.dt), y: tempFahrenheit });
  });

  // Don't forget to add the last segment if it has data
  if (currentSegment.length > 0) {
    segments.push(createSegment(currentSegment, currentColor));
  }

  

  const fahrenheitData = displayedHours.map((data) =>
    kelvinToFahrenheit(data.temp)
  );
  const celsiusData = displayedHours.map((data) => kelvinToCelsius(data.temp));

  const chartData = {
    labels: displayedHours.map((data) => formatTime(data.dt)),
    datasets: [
      {
        yAxisID: 'yFahrenheit',
        label: 'Fahrenheit',
        data: fahrenheitData,
        borderColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        yAxisID: 'yCelsius',
        label: 'Celsius',
        data: celsiusData,
        borderWidth: 0,
        pointRadius: 0,
      },
    ],
  };

  const minFahrenheit = Math.min(...fahrenheitData);
  const maxFahrenheit = Math.max(...fahrenheitData);

  const minCelsius = Math.min(...celsiusData);
  const maxCelsius = Math.max(...celsiusData);

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      yFahrenheit: {
        position: 'left',
        title: {
          display: true,
          text: 'Fahrenheit (°F)',
          color: 'white',
        },
        ticks: {
          color: 'ghostwhite',
          autoSkip: false,
        },
        min: minFahrenheit,
        max: maxFahrenheit,
        grid: {
          color: 'ghostwhite',
        },
      },
      yCelsius: {
        position: 'right',
        title: {
          display: true,
          text: 'Celsius (°C)',
          color: 'white',
        },
        ticks: {
          color: 'ghostwhite',
        },
        min: minCelsius,
        max: maxCelsius,
        grid: {},
      },
      x: {
        grid: {
          color: 'ghostwhite',
        },
        ticks: { color: 'darkgrey' },
      },
    },
  };

  return (
    <div className={styles.container}>
      <div>Hourly Temperature</div>
      <div className={styles.chart}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default HourlyTemperatureGraph;
