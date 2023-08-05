import { useEffect, useState } from 'react';
import styles from './GetAdvice.module.css';
import ClipLoader from 'react-spinners/ClipLoader';

export default function App() {
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);

  async function getAdvice() {
    try {
      setIsLoading(true);
      const res = await fetch('https://api.adviceslip.com/advice', {
        cache: 'no-store',
      });
      const data = await res.json();
      setIsLoading(false);
      setAdvice(data.slip.advice);
      setCount(c => c + 1); // not setCount(count + 1): when the new state depends on a previous state it's best practice to pass in the previous state then update it.
    } catch (error) {
      console.log('Something went wrong:', error.message);
    }
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Message count={count} />
        <CardBg
          advice={advice}
          isLoading={isLoading}>
          {isLoading ? <Loading /> : <h1 className={styles.advice}>{advice}</h1>}
        </CardBg>
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
  return <p className={styles.count}> {count > 0 && `Advice number ${count}:`}</p>;
}

function CardBg({ children }) {
  return <main className={styles.cardBg}>{children}</main>;
}

function Loading() {
  return (
    <CardBg>
      <section>
        <ClipLoader
          color={'#3d3d3d'}
          size={40}
          aria-label={'Loading spinner'}
        />
      </section>
    </CardBg>
  );
}
