import React from 'react';
import Clock from './components/Clock';
import WorldClock from './components/WorldClock';
import CurrentConditions from './components/CurrentConditions';
import HourlyForecastComponent from './components/HourlyForecast';
import useWeatherData from './hooks/useWeatherData';
import Alerts from './components/Alerts';
import DailyForecastComponent from './components/DailyForecast';
import MinutelyForecastComponent from './components/MinutelyForecast';
import HourlyTemperatureGraph from './components/HourlyTemperatureGraph';

const App = () => {
  const { weatherData, loading, error } = useWeatherData();

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error loading weather data: {error}</p>;

  // if (!weatherData) {
  //   return null; // or render a loading state, an error message, or nothing
  // }

  const testWeatherAlerts = [
    {
      sender_name: 'NWS Cleveland (Northern Ohio)',
      event: 'Winter Weather Advisory',
      start: 1701184140,
      end: 1701216000,
      description:
        '...WINTER WEATHER ADVISORY REMAINS IN EFFECT UNTIL 7 PM EST THIS\nEVENING...\n* WHAT...Lake effect snow occurring. Additional snow\naccumulations of up to two inches. Winds gusting as high as 30\nmph.\n* WHERE...Lorain, Summit, Portage and Trumbull counties.\n* WHEN...Until 7 PM EST this evening.\n* IMPACTS...Plan on slippery road conditions. The hazardous\nconditions could impact the evening commute.\n* ADDITIONAL DETAILS...Ongoing snow is largely reserve to the\nnorthern part of these counties. Snow should dissipate first for\nLorain County over the next couple hours, then the rest of the\ncounties by early this afternoon.',
      tags: ['Other dangers'],
    },
  ];

  return (
    <div className='grid-container'>
      <Clock />
      <WorldClock />
      {weatherData && (
        <>
          <CurrentConditions currentConditions={weatherData.current} />
          <HourlyForecastComponent hourlyData={weatherData.hourly} limit={30} />
          <HourlyTemperatureGraph hourlyData={weatherData.hourly} />
          <MinutelyForecastComponent minutelyData={weatherData.minutely} />
          <DailyForecastComponent dailyData={weatherData.daily} limit={4} />
          {/* <Alerts alerts={testWeatherAlerts} /> */}
          {weatherData.alerts && <Alerts alerts={weatherData.alerts} />}
        </>
      )}
      {loading && (
        <div style={{ color: 'yellow', gridColumn: 'span 4' }}>Loading...</div>
      )}
      {error && (
        <div style={{ color: 'red', gridColumn: 'span 4' }}>
          Error loading weather data: {error}
        </div>
      )}
    </div>
  );
};

export default App;
