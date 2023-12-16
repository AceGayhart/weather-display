// TODO: Compare interfaces to reference.

// Reference: https://openweathermap.org/api/one-call-3

export interface WeatherResponse {
  lat: number;                  // Latitude
  lon: number;                  // Longitude
  timezone: string;             // Timezone string (e.g., "America/New_York")
  timezone_offset: number;      // Shift in seconds from UTC
  current: CurrentWeather;      // Current weather data
  minutely: MinutelyForecast[]; // Minute-by-minute forecast for 1 hour
  hourly: HourlyForecast[];     // Hourly forecast for 48 hours
  daily: DailyForecast[];       // Daily forecast for 7 days
  alerts?: WeatherAlert[];      // Weather alerts
}

export interface CurrentWeather {
  dt: number;                   // Current time, Unix, UTC
  sunrise: number;              // Sunrise time, Unix, UTC
  sunset: number;               // Sunset time, Unix, UTC
  temp: number;                 // Temperature (units: default: kelvin, metric: Celsius, imperial: Fahrenheit)
  feels_like: number;           // Human perception of weather temperature (similar units as temp)
  pressure: number;             // Atmospheric pressure on the sea level, hPa
  humidity: number;             // Humidity, %
  dew_point: number;            // Atmospheric temperature below which water droplets begin to condense, °C
  uvi: number;                  // UV index
  clouds: number;               // Cloudiness, %
  visibility: number;           // Average visibility, metres
  wind_speed: number;           // Wind speed (units: default: meter/sec, metric: meter/sec, imperial: miles/hour)
  wind_deg: number;             // Wind direction, degrees (meteorological)
  rain?: {
    '1h': number;               // Rain volume for the last hour, mm
  };
  snow?: {
    '1h': number;               // Snow volume for the last hour, mm
  };
  weather: WeatherCondition[];  // Weather conditions array
}

export interface MinutelyForecast {
  dt: number;                   // Time of the forecasted data, Unix, UTC
  precipitation: number;        // Precipitation volume, mm
}

export interface HourlyForecast {
  dt: number;                   // Time of the forecasted data, Unix, UTC
  temp: number;                 // Temperature (units: default: kelvin, metric: Celsius, imperial: Fahrenheit)
  feels_like: number;           // Human perception of temperature (similar units as temp)
  pressure: number;             // Atmospheric pressure on the sea level, hPa
  humidity: number;             // Humidity, %
  dew_point: number;            // Dew point, °C
  uvi: number;                  // UV index
  clouds: number;               // Cloudiness, %
  visibility: number;           // Average visibility, metres
  wind_speed: number;           // Wind speed (units: default: meter/sec, metric: meter/sec, imperial: miles/hour)
  wind_deg: number;             // Wind direction, degrees (meteorological)
  weather: WeatherCondition[];  // Weather conditions array
  pop: number;                  // Probability of precipitation
  rain?: {
    '1h': number;               // Rain volume for the hour, mm
  };
  snow?: {
    '1h': number;               // Snow volume for the hour, mm
  };
}

// Daily weather forecast
export interface DailyForecast {
  dt: number;                    // Time of the forecasted data, Unix, UTC
  sunrise: number;               // Sunrise time, Unix, UTC
  sunset: number;                // Sunset time, Unix, UTC
  moonrise: number;              // Moonrise time, Unix, UTC
  moonset: number;               // Moonset time, Unix, UTC
  moon_phase: number;            // Moon phase
  summary: string;              // Human-readable description of the weather conditions for the day
  temp: {                        // Temperature details
    day: number;                 // Day temperature
    min: number;                 // Min daily temperature
    max: number;                 // Max daily temperature
    night: number;               // Night temperature
    eve: number;                 // Evening temperature
    morn: number;                // Morning temperature
  };
  feels_like: {                  // Human perception of temperature
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;              // Atmospheric pressure on the sea level, hPa
  humidity: number;              // Humidity, %
  dew_point: number;             // Dew point, °C
  wind_speed: number;            // Wind speed (units: default: meter/sec, metric: meter/sec, imperial: miles/hour)
  wind_deg: number;              // Wind direction, degrees (meteorological)
  weather: WeatherCondition[];   // Weather conditions array
  clouds: number;                // Cloudiness, %
  pop: number;                   // Probability of precipitation
  rain?: number;                 // Rain volume for the day, mm
  snow?: number;                 // Snow volume for the day, mm
  uvi: number;                   // UV index
};

// Weather condition data
export interface WeatherCondition {
  id: number;                    // Weather condition id
  main: string;                  // Group of weather parameters (Rain, Snow, Extreme, etc.)
  description: string;           // Weather condition within the group
  icon: string;                  // Weather icon id
};

// Weather alerts data
export interface WeatherAlert {
  sender_name: string;           // Name of the alert source
  event: string;                 // Alert event name
  start: number;                 // Start time of the alert, Unix, UTC
  end: number;                   // End time of the alert, Unix, UTC
  description: string;           // Description of the alert
  tags: string[];                // Tags of the alert (e.g., "Rain", "Flood", etc.)
};
