import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from './CurrencyConverter.module.css';
import BackLink from '../BackLink';

const CurrencyConverter = () => {
  useEffect(() => {
    document.title = 'Currency Converter';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);
  // URL: 'https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD';
  const BASE_URL = 'https://api.frankfurter.app/latest?';

  const [amount, setAmount] = useState('');
  const [converted, setConverted] = useState('');

  const [convertFrom, setConvertFrom] = useState('EUR');
  const [convertTo, setConvertTo] = useState('USD');
  const [date, setDate] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConversion = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${BASE_URL}amount=${amount}&from=${convertFrom}&to=${convertTo}`
        );
        const data = await res.json();

        setConverted(data.rates[convertTo]);
        setDate(data.date);
        console.log(data);
      } catch (error) {
        console.log(error.message);
        if (convertFrom === convertTo) {
          throw new Error(`Base and conversion currencies must be different`);
        } // prevent from calling the function in the first place
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // don't run the function if base and conversion currency the same
    if (convertFrom === convertTo) return setConverted(amount);

    fetchConversion();
  }, [amount, convertFrom, convertTo, date]);

  return (
    <main className={styles.app}>
      <BackLink />
      <h1>Currency converter</h1>
      <form className={styles.form}>
        Enter amount:
        <input
          type='text'
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          autoFocus
          //   disabled={isLoading}
        />
        from
        <select
          value={convertFrom}
          onChange={(e) => setConvertFrom(e.target.value)}
          disabled={isLoading}
        >
          <option value='USD'>USD (US Dollar)</option>
          <option value='NZD'>NZD (New Zealand Dollar)</option>
          <option value='AUD'>AUD (Australian Dollar)</option>
          <option value='EUR'>EUR (Euro)</option>
          <option value='GBP'>GBP (British Pound)</option>
          <option value='ZAR'>ZAR (South African Rand)</option>
          <option value='IND'>IDR (Indonesian Rupiah)</option>
          <option value='JPY'>JPY (Japanese Yen)</option>
        </select>
        to
        <select
          value={convertTo}
          onChange={(e) => setConvertTo(e.target.value)}
          disabled={isLoading}
        >
          <option value='USD'>USD (US Dollar)</option>
          <option value='NZD'>NZD (New Zealand Dollar)</option>
          <option value='AUD'>AUD (Australian Dollar)</option>
          <option value='EUR'>EUR (Euro)</option>
          <option value='GBP'>GBP (British Pound)</option>
          <option value='ZAR'>ZAR (South African Rand)</option>
          <option value='IND'>IDR (Indonesian Rupiah)</option>
          <option value='JPY'>JPY (Japanese Yen)</option>
        </select>
      </form>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage errorMessage={error} />
      ) : converted ? (
        <p className={styles.output}>
          <span> on </span>
          <span> {date} : </span>
          <span className={styles.amount}>{amount}</span>
          <span className={styles.amount}> {convertFrom} </span>
          <span> = </span>
          <span className={styles.converted}> {converted} </span>
          <span className={styles.converted}> {convertTo} </span>
        </p>
      ) : (
        ''
      )}
    </main>
  );
};

function Loading() {
  return (
    <ClipLoader color={'#3d3d3d'} size={40} aria-label={'Loading spinner'} />
  );
}

function ErrorMessage({ errorMessage }) {
  return <p>Something went wrong: {errorMessage}</p>;
}
export default CurrencyConverter;
