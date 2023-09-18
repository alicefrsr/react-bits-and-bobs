import { useState, useEffect } from 'react';
import { FiPlayCircle, FiPauseCircle } from 'react-icons/fi';
import { LuTimerReset } from 'react-icons/lu';
import styles from './stopwatch.module.css';
import BackLink from '../BackLink';

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
        setTimer((currTime) => currTime + 10);
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
        <BackLink />
        <h1 className={styles.title} aria-label='stopwatch'>
          {' '}
          ⏱{' '}
        </h1>
        <div className={styles.counter}>
          <span>{('0' + Math.floor((timer / 60000) % 60)).slice(-2)}:</span>
          <span>{('0' + Math.floor((timer / 1000) % 60)).slice(-2)}:</span>
          <span>{('0' + ((timer / 10) % 100)).slice(-2)}</span>
        </div>
        <div className={styles.btns}>
          {!timerOn && timer === 0 && (
            <StartButton
              className={`${styles.btn} ${styles.btnStart}`}
              onClick={() => setTimerOn(true)}
            />
          )}
          {timerOn && (
            <PauseButton
              className={`${styles.btn} ${styles.btnStop}`}
              onClick={() => setTimerOn(false)}
            />
          )}

          {!timerOn && timer !== 0 && (
            <ResumeButton
              className={`${styles.btn} ${styles.btnResume}`}
              onClick={() => setTimerOn(true)}
            />
          )}
          {!timerOn && timer !== 0 && (
            <ResetButton
              className={`${styles.btn} ${styles.btnReset}`}
              onClick={() => setTimer(0)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const StartButton = (props) => {
  return (
    <button {...props} className={`${styles.btn} ${styles.btnStart}`}>
      <FiPlayCircle /> Start
    </button>
  );
};

const PauseButton = (props) => {
  return (
    <button {...props} className={`${styles.btn} ${styles.btnPause}`}>
      <FiPauseCircle /> Pause
    </button>
  );
};

const ResumeButton = (props) => {
  return (
    <button {...props} className={`${styles.btn} ${styles.btnResume}`}>
      <FiPlayCircle /> Resume
    </button>
  );
};

const ResetButton = (props) => {
  return (
    <button {...props} className={`${styles.btn} ${styles.btnReset}`}>
      <LuTimerReset /> Reset
    </button>
  );
};

export default Stopwatch;
