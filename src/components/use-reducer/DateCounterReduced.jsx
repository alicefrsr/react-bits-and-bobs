import { useReducer, useState, useEffect } from 'react';
import styles from './DateCounterReduced.module.css';
import BackLink from '../BackLink';

const initialState = { count: 0, step: 1 };
const dateCounterReducer = (state, action) => {
  // console.log(state, action);
  // single state: count
  // if (action.type === 'inc') return state + action.payload;
  // if (action.type === 'inc') return state + 1; // simplified so as not to have to dispatch payload
  // if (action.type === 'dec') return state - action.payload;
  // if (action.type === 'dec') return state - 1; // simplified so as not to have to dispatch payload
  // if (action.type === 'setCount') return action.payload;

  // // multiples states, now an object: count, step
  // if (action.type === 'inc')
  //   return { ...state, count: state.count + state.step };
  // if (action.type === 'dec')
  //   return { ...state, count: state.count - state.step };
  // if (action.type === 'setCount') return { ...state, count: action.payload };
  // if (action.type === 'setStep') return { ...state, step: action.payload };
  // if (action.type === 'reset') return initialState;

  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Action unknown');
  }
};

function DateCounter() {
  useEffect(() => {
    document.title = 'Date Counter';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(dateCounterReducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    // dispatch({ type: 'dec', payload: 1 });
    dispatch({ type: 'dec' });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    // dispatch({ type: 'inc', payload: 1 });
    dispatch({ type: 'inc' });
  };

  const inputCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    // these 2 actions can be dispatched in one: whole point of using useReducer
    dispatch({ type: 'reset' });
  };

  return (
    <main className={styles.app}>
      <BackLink />
      <div className={styles.counter}>
        <h1>useReducer Date Counter</h1>
        <div className='range'>
          <input
            type='range'
            min='0'
            max='10'
            value={step}
            onChange={defineStep}
          />
          <p className={styles.step}>
            {' '}
            Step: {step}
            {step > 1 ? ' days' : ' day'}
          </p>
        </div>

        <div className={styles.inputs}>
          <button className={styles.btn} onClick={dec}>
            -
          </button>
          <input value={count} onChange={inputCount} />
          <button className={styles.btn} onClick={inc}>
            +
          </button>
        </div>

        <p>Date: {date.toDateString()}</p>

        <div>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </main>
  );
}
export default DateCounter;
