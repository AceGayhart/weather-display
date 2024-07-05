import { useState, useEffect } from 'react';
import generateGradient from '../utils/generateGradient';
import { Temporal } from '@js-temporal/polyfill';


const useCurrentTime = () => {
  const [currentDateTime, setCurrentTime] = useState(new Date());
  const [currentZonedDateTime, setCurrentZonedDateTime] = useState(
    Temporal.Now.zonedDateTimeISO(Temporal.Now.timeZoneId())
  );


  const updateGradient = (time: Date) => {
    const combinedGradient = generateGradient(time);
    document.body.style.backgroundImage = combinedGradient;
  };

  useEffect(() => {
    const initialTime = new Date();
    setCurrentTime(initialTime);
    updateGradient(initialTime);
    setCurrentZonedDateTime(Temporal.Now.zonedDateTimeISO(Temporal.Now.timeZoneId()));

    const timerId = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
      updateGradient(newTime);
      setCurrentZonedDateTime(Temporal.Now.zonedDateTimeISO(Temporal.Now.timeZoneId()));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return { currentDateTime, currentZonedDateTime };
};

export default useCurrentTime;
