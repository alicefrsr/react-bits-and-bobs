import { useEffect, useState } from 'react';
import styles from './GetAdviceApp.module.css';
import ClipLoader from 'react-spinners/ClipLoader';

const BASE_URL = 'https://api.adviceslip.com';

export default function GetAdviceApp() {
  useEffect(() => {
    document.title = 'Advice API';
    // clean up
    return () => (document.title = 'bits&bobs');
  }, []);

  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState(0);

  const getAdvice = async () => {
    try {
      setIsLoading(true);
      setError('');
      const res = await fetch(`${BASE_URL}/advice`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('...something went wrong...');
      }
      const data = await res.json();
      setCount(c => c + 1); // not setCount(count + 1): when the new state depends on a previous state it's best practice to pass in the previous state then update it.
      setAdvice(data.slip.advice);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // // basic promise handling:
    // fetch(`https://api.adviceslip.com/advice)
    //   .then(res => res.json())
    //   .then(data => setAdvice(data.slip.advice));
    getAdvice();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <CountMessage count={count} />
        <CardBg
          advice={advice}
          isLoading={isLoading}>
          {isLoading ? <Loading /> : error ? <ErrorMessage errorMessage={error} /> : <h1 className={styles.advice}>{advice}</h1>}
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

function CountMessage({ count }) {
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

function ErrorMessage({ errorMessage }) {
  return (
    <CardBg>
      <p>Something went wrong: {errorMessage}</p>
    </CardBg>
  );
}
