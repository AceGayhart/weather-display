import { useState, useEffect } from 'react';
import generateGradient from '../utils/generateGradient';

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to update the gradient
  const updateGradient = (time: Date) => {
    const combinedGradient = generateGradient(time);
    document.body.style.backgroundImage = combinedGradient;
  };

  useEffect(() => {
    // Set the gradient immediately on component mount
    const initialTime = new Date();
    updateGradient(initialTime);
  
    const timerId = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
  
      // Update the gradient every second
      updateGradient(newTime);
    }, 1000);
  
    return () => clearInterval(timerId);
  }, []);

  return currentTime;
};

export default useCurrentTime;
