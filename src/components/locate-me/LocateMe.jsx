import { useState } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import styles from './LocateMe.module.css';

import BackLink from '../BackLink';
import { useGeolocation } from './useGeolocation';

const LocateMe = () => {
  const { isLoading, position, error, getPosition } = useGeolocation();
  // const [error, getPosition, position, isLoading] = useGeolocation();
  const { lat, lng } = position;

  const [countClicks, setCountClicks] = useState(0);
  // const { lat, lng } = position;

  const handleClick = () => {
    setCountClicks((count) => count + 1);
    getPosition();
  };

  // // extracted into useGeolocation hook
  // const [isLoading, setIsLoading] = useState(false);
  // const [position, setPosition] = useState({});
  // const [error, setError] = useState(null);
  // function getPosition() {
  //   setCountClicks(count => count + 1);
  //   if (!navigator.geolocation) return setError('Your browser does not support geolocation');

  //   setIsLoading(true);
  //   navigator.geolocation.getCurrentPosition(
  //     pos => {
  //       setPosition({
  //         lat: pos.coords.latitude,
  //         lng: pos.coords.longitude,
  //       });
  //       setIsLoading(false);
  //     },
  //     error => {
  //       setError(error.message);
  //       setIsLoading(false);
  //     }
  //   );
  // }

  return (
    <main className={styles.app}>
      <BackLink />
      <button className={styles.btn} onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && (
        <BounceLoader
          color={'#3d3d3d'}
          size={40}
          aria-label={'Loading spinner'}
        />
      )}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{' '}
          <a
            target='_blank'
            rel='noreferrer'
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p className={styles.count}>
        You requested position {countClicks}
        {countClicks <= 1 ? ' time' : ' times'}
      </p>
    </main>
  );
};

export default LocateMe;
