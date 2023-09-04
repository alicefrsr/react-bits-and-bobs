import { useState, useEffect } from 'react';

export const useCountdown = () => {
  // we need state to keep track of time left in seconds
  const [remainingTimeInSecs, setRemainingTimeInSecs] = useState(null);
  // and to keep track of whether the timer is running or not
  const [timerOn, setTimerOn] = useState(false);

  // effect to subtract 1 second every second
  useEffect(() => {
    console.log('timerOn', timerOn);
    let id = null;
    if (timerOn) {
      id = setTimeout(() => {
        if (remainingTimeInSecs === 0) return;
        console.count(`tick from useCountdown hook`);
        setRemainingTimeInSecs((currTime) => currTime - 1);
      }, 1000);
    } else {
      clearTimeout(id);
    }
    // cleanup
    return () => clearTimeout(id);
  }, [timerOn, remainingTimeInSecs]);

  // effect to setTimerOn to false when timer stops
  useEffect(() => {
    if (remainingTimeInSecs === 0) setTimerOn(false);
  }, [remainingTimeInSecs, timerOn]);

  // to toggle timer on/off (Start/Pause btn, hide/display Settings)
  function toggleTimer() {
    setTimerOn((timer) => !timer);
  }

  // to start the timer passing in the start value (userInput converted into seconds (in form))
  function startTimer(seconds) {
    setRemainingTimeInSecs(seconds);
  }
  // we return the 2 state and 2 functions
  return { remainingTimeInSecs, timerOn, startTimer, toggleTimer };
};
