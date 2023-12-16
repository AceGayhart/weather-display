import React from 'react';
import { WeatherCondition } from '../types/weather';
import styles from './WeatherIcon.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
  library,
  SizeProp,
} from '@fortawesome/fontawesome-svg-core';

import {
  faSun,
  faMoonStars,
  faSunCloud,
  faMoonCloud,
  faCloudSun,
  faCloudMoon,
  faCloudsSun,
  faCloudsMoon,
  faCloudDrizzle,
  faCloudSunRain,
  faCloudMoonRain,
  faCloudBoltSun,
  faCloudBoltMoon,
  faSnowflake,
  faCloudFog,
} from '@fortawesome/pro-duotone-svg-icons';

library.add(
  faSun,
  faMoonStars,
  faSunCloud,
  faMoonCloud,
  faCloudSun,
  faCloudMoon,
  faCloudsSun,
  faCloudsMoon,
  faCloudDrizzle,
  faCloudSunRain,
  faCloudMoonRain,
  faCloudBoltSun,
  faCloudBoltMoon,
  faSnowflake,
  faCloudFog
);

interface WeatherIconProps {
  conditions: WeatherCondition[];
  size?: SizeProp;
  pop?: number; // Probability of precipitation
}

const weatherIconMap: Record<string, IconLookup> = {
  '01d': { prefix: 'fad', iconName: 'sun' },
  '01n': { prefix: 'fad', iconName: 'moon-stars' },
  '02d': { prefix: 'fad', iconName: 'sun-cloud' },
  '02n': { prefix: 'fad', iconName: 'moon-cloud' },
  '03d': { prefix: 'fad', iconName: 'cloud-sun' },
  '03n': { prefix: 'fad', iconName: 'cloud-moon' },
  '04d': { prefix: 'fad', iconName: 'clouds-sun' },
  '04n': { prefix: 'fad', iconName: 'clouds-moon' },
  '09d': { prefix: 'fad', iconName: 'cloud-drizzle' },
  '09n': { prefix: 'fad', iconName: 'cloud-drizzle' },
  '10d': { prefix: 'fad', iconName: 'cloud-sun-rain' },
  '10n': { prefix: 'fad', iconName: 'cloud-moon-rain' },
  '11d': { prefix: 'fad', iconName: 'cloud-bolt-sun' },
  '11n': { prefix: 'fad', iconName: 'cloud-bolt-moon' },
  '13d': { prefix: 'fad', iconName: 'snowflake' },
  '13n': { prefix: 'fad', iconName: 'snowflake' },
  '50d': { prefix: 'fad', iconName: 'cloud-fog' },
  '50n': { prefix: 'fad', iconName: 'cloud-fog' },
};

type WeatherIconCode = keyof typeof weatherIconMap;

const WeatherIcon: React.FC<WeatherIconProps> = ({
  conditions,
  size = '1x',
  pop,
}) => {
  if (!conditions || conditions.length === 0) return null;

  const primaryCondition = conditions[0]; // Use only the first condition

  const getFontAwesomeIcon = (
    iconCode: WeatherIconCode,
    size: SizeProp = '1x',
    className = '',
    ariaLabel = '',
    fixedWidth = false
  ) => {
    const iconLookup = weatherIconMap[iconCode];
    if (!iconLookup) {
      console.error('Icon code not found in map:', iconCode);
      return null;
    }

    const iconDefinition: IconDefinition = findIconDefinition(iconLookup);

    if (!iconDefinition) {
      console.error('Icon definition not found for lookup:', iconLookup);
      return null;
    }

    return (
      <FontAwesomeIcon
        icon={iconDefinition}
        size={size}
        className={className}
        aria-label={ariaLabel}
        fixedWidth={fixedWidth}
      />
    );
  };

  const style = 'fa-' + weatherIconMap[primaryCondition.icon].iconName;

  const icon = getFontAwesomeIcon(
    primaryCondition.icon as WeatherIconCode,
    size,
    `${styles.icon} ${styles[style]}`,
    primaryCondition.main,
    true
  );
  return (
    <div className={styles.container}>
      {icon}

      {pop !== undefined && pop > 0 && (
        <div className={styles.popInfo}>{`${Math.round(pop * 100)}%`}</div>
      )}
      {conditions.length>1} {
        // TODO: Show secondary conditions.
      }
    </div>
  );
};

export default WeatherIcon;
