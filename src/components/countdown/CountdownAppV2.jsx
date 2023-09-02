import { useState, useEffect } from 'react';
import styles from './CountdownApp.module.css';
import { FiSettings, FiPlayCircle, FiPauseCircle } from 'react-icons/fi';
import { LuTimerReset } from 'react-icons/lu';

// VERSION 2:
// --- using a Reset button (instead of Rerun)
// --- Has a second effect to setTimerOn to false when countdown reaches 0.
// --> Reset button shows to reset to stored 'startTime' value
// --> When 'startTime' value resets, Start button shows to start countdown
// === 2-step process to re-start timer with same 'startTime' value

const CountdownApp = () => {
  useEffect(() => {
    document.title = 'Countdown';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  // STATE
  const [startTime, setStartTime] = useState(null); // only to re-use when click rerun button

  // remainingTime is the running countdown in seconds --> converted back in hours mins and secs for UI
  const [remainingTimeInSecs, setRemainingTimeInSecs] = useState(null);

  // keep track of countdown running or not, to display btns accordingly
  const [timerOn, setTimerOn] = useState(false);

  // show / hide settings form
  const [showSettings, setShowSettings] = useState(false);

  const handleSetStartTime = userInputTime => {
    setRemainingTimeInSecs(userInputTime); // startTimeInSecs used in interval as initial value for countdown
    setStartTime(userInputTime); // startTimeInSecs stored in state to reset timer to last user input
  };

  // EFFECTS
  useEffect(() => {
    // console.log('timerOn', timerOn); // how do I set this to false when remainingTime === 0 ?
    let id = null;
    if (timerOn) {
      id = setInterval(() => {
        if (remainingTimeInSecs === 0)
          // setTimerOn(false); // this can't happen here -- useRef()?? another useEffect hook?
          return; // countdown stops when reaches zero
        setRemainingTimeInSecs(currTime => currTime - 1); // startTimeInSec minus 1 second every second
      }, 1000);
    } else {
      clearInterval(id);
    }
    // cleanup
    return () => clearInterval(id);
  }, [timerOn, remainingTimeInSecs]);

  // effect to setTimerOn to false when timer stops
  useEffect(() => {
    if (remainingTimeInSecs === 0) setTimerOn(false);
  }, [remainingTimeInSecs, timerOn]);

  return (
    <main className={styles.app}>
      <div className={styles.container}>
        <Header
          timerOn={timerOn}
          remainingTimeInSecs={remainingTimeInSecs}
        />
        <Timer
          startTime={startTime}
          timerOn={timerOn}
          setTimerOn={setTimerOn}
          remainingTimeInSecs={remainingTimeInSecs}
          setRemainingTimeInSecs={setRemainingTimeInSecs}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
        {showSettings ? (
          <SettingsForm
            setShowSettings={setShowSettings}
            onSetStartTime={handleSetStartTime}
            // setTimerOn={setTimerOn}
          />
        ) : (
          !timerOn && <SettingsButton onClick={() => setShowSettings(!showSettings)} />
        )}
      </div>
    </main>
  );
};

const Header = ({ timerOn, remainingTimeInSecs }) => {
  return (
    <header>
      {timerOn && remainingTimeInSecs !== 0 && (
        <h1
          className={styles.title}
          aria-label='hourglass'>
          {' '}
          ⏳{' '}
        </h1>
      )}{' '}
      {remainingTimeInSecs === null && <h1>Countdown v2.0</h1>}
    </header>
  );
};

const Timer = ({ startTime, timerOn, setTimerOn, remainingTimeInSecs, setRemainingTimeInSecs, showSettings, setShowSettings }) => {
  // convert remainingTimeInSecs in hours, mins and secs for UI {hours}:{mins}:{secs}
  const hours = Math.floor(remainingTimeInSecs / 3600);
  const mins = Math.floor((remainingTimeInSecs % 3600) / 60);
  const secs = remainingTimeInSecs % 60;

  return (
    <section className={styles.timer}>
      <div className={styles.counter}>
        <span>
          {hours < 10 && '0'}
          {hours}
        </span>
        :
        <span>
          {mins < 10 && '0'}
          {mins}
        </span>
        :
        <span>
          {secs < 10 && '0'}
          {secs}
        </span>
      </div>
      <div className={styles.btns}>
        {!timerOn && <SettingsButton onClick={() => setShowSettings(true)} />}
        {!timerOn && remainingTimeInSecs !== null && remainingTimeInSecs !== 0 && !showSettings && <StartButton onClick={() => setTimerOn(true)} />}
        {timerOn && remainingTimeInSecs !== 0 && <PauseButton onClick={() => setTimerOn(false)} />}
        {/* {timerOn && remainingTimeInSecs === 0 && <RerunButton onClick={() => setRemainingTimeInSecs(startTime)} />} */}
        {/* {timerOn && remainingTimeInSecs === 0 && !showSettings && <RerunButton onClick={() => setRemainingTimeInSecs(startTime)} />} */}
        {!timerOn && remainingTimeInSecs === 0 && startTime !== 0 && !showSettings && <ResetButton onClick={() => setRemainingTimeInSecs(startTime)} />}
      </div>
    </section>
  );
};

const SettingsForm = ({ onSetStartTime, setShowSettings }) => {
  const [startTimeObject, setStartTimeObject] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const handleChange = e => {
    setStartTimeObject({
      ...startTimeObject,
      [e.target.name]: Number(e.target.value), // best way to handle multiple inputs
      // });
      // this also works but we don't need the prev state
      //  setStartTime(prev => ({
      //    ...prev,
      //     [e.target.name]: e.target.value,
      //  }));
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // derived state:
    // convert startTime object in total seconds to use in interval AND store it to use when click Rerun button (Reset button in V1)
    const startTimeInSecs = startTimeObject.hours * 60 ** 2 + startTimeObject.minutes * 60 + startTimeObject.seconds;
    console.log('startTimeInSecs ', startTimeInSecs);
    // 'lift up' this new state to parent using 'onDoSomething' function we passed down as prop
    onSetStartTime(startTimeInSecs);
    // setTimerOn(false);// not with 2nd useEffect setting to false when remainingTime === 0
    setShowSettings(false);
  };

  return (
    <form className={styles.settings}>
      <h2>Set countdown:</h2>
      <div>
        <div>
          <input
            type='text'
            name='hours'
            value={startTimeObject.hours}
            onChange={handleChange}
          />{' '}
          <label htmlFor='minutes'>hours</label>
        </div>{' '}
        <div>
          <input
            type='text'
            name='minutes'
            value={startTimeObject.minutes}
            onChange={handleChange}
          />{' '}
          <label htmlFor='minutes'>minutes</label>
        </div>{' '}
        <div>
          {' '}
          <input
            type='text'
            name='seconds'
            value={startTimeObject.seconds}
            onChange={handleChange}
          />{' '}
          <label htmlFor='seconds'>seconds</label>
        </div>
      </div>

      <div>
        <SubmitButton onClick={handleSubmit} />
      </div>
    </form>
  );
};

const StartButton = props => {
  return (
    <button
      {...props}
      className={`${styles.btn} ${styles.btnStart}`}>
      <FiPlayCircle className={styles.btnIcons} /> Start
    </button>
  );
};

const PauseButton = props => {
  return (
    <button
      {...props}
      className={`${styles.btn} ${styles.btnPause}`}>
      <FiPauseCircle className={styles.btnIcons} /> Pause
    </button>
  );
};

// FOR V1
// const RerunButton = props => {
//   return (
//     <button
//       {...props}
//       className={`${styles.btn} ${styles.btnRerun}`}>
//       <LuTimerReset className={styles.btnIcons} />
//       run again
//       <FiPlayCircle className={styles.btnIcons} />
//     </button>
//   );
// };

const ResetButton = props => {
  return (
    <button
      {...props}
      className={`${styles.btn} ${styles.btnReset}`}>
      <LuTimerReset className={styles.btnIcons} />
      Reset
    </button>
  );
};

const SettingsButton = props => {
  return (
    <button
      {...props}
      className={`${styles.btn} ${styles.btnSettings}`}>
      <FiSettings />
      <div> Settings</div>
    </button>
  );
};

const SubmitButton = props => {
  return (
    <button
      {...props}
      className={`${styles.btn} ${styles.btnSubmit}`}>
      Enter
    </button>
  );
};

export default CountdownApp;
