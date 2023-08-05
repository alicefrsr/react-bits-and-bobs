import { useEffect, useState } from 'react';
import styles from './GetAdvice.module.css';
import BeatLoader from 'react-spinners/BeatLoader';

export default function App() {
  const [advice, setAdvice] = useState('');
  const [count, setCount] = useState(-1);

  async function getAdvice() {
    const res = await fetch('https://api.adviceslip.com/advice', {
      cache: 'no-store',
    });
    const data = await res.json();

    setAdvice(data.slip.advice);
    setCount(c => c + 1);
    // not setCount(count + 1): when the new state depends on a previous state it's best practice to pass in the previous state then update it.
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Message count={count} />
        <h1 className={styles.advice}>{advice}</h1>
        <button
          className={styles.btn}
          onClick={getAdvice}>
          Get Advice
        </button>
      </div>
    </div>
  );
}

function Message({ count }) {
  return <p className={styles.number}>Advice number {count}:</p>;
}

function CardBg({ children }) {
  return <main className={'bg-card'}>{children}</main>;
}

function Loading() {
  return (
    <CardBg>
      <section className='spinner'>
        <BeatLoader
          color={'#0079ff'}
          size={20}
          aria-label={'Loading spinner'}
        />
      </section>
    </CardBg>
  );
}
