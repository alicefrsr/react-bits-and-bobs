import { useState, useEffect } from 'react';
import styles from './stopwatch.module.css';

const Stopwatch = () => {
  useEffect(() => {
    document.title = 'Stopwatch';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    // console.log('fx ran');
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTimer(currTime => currTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    // cleanup
    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1
          className={styles.title}
          aria-label='stopwatch'>
          {' '}
          ⏱{' '}
        </h1>
        <div className={styles.counter}>
          <span>{('0' + Math.floor((timer / 60000) % 60)).slice(-2)}:</span>
          <span>{('0' + Math.floor((timer / 1000) % 60)).slice(-2)}:</span>
          <span>{('0' + ((timer / 10) % 100)).slice(-2)}</span>
        </div>
        <div>
          {!timerOn && timer === 0 && (
            <button
              className={`${styles.btn} ${styles.btnStart}`}
              onClick={() => setTimerOn(true)}>
              Start
            </button>
          )}
          {timerOn && (
            <button
              className={`${styles.btn} ${styles.btnStop}`}
              onClick={() => setTimerOn(false)}>
              Stop
            </button>
          )}

          {!timerOn && timer !== 0 && (
            <button
              className={`${styles.btn} ${styles.btnResume}`}
              onClick={() => setTimerOn(true)}>
              Resume
            </button>
          )}
          {!timerOn && timer !== 0 && (
            <button
              className={`${styles.btn} ${styles.btnReset}`}
              onClick={() => setTimer(0)}>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
