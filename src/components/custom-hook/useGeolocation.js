import { useState } from 'react';

export const useGeolocation = () => {
  // =================================== returning object
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation) return setError('Your browser does not support geolocation');

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      error => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, getPosition, position, error };

  // =================================== returning array
  // --> works exactly the same, only diff is that when destructuring hook, order matters!

  // const [isLoading, setIsLoading] = useState(false);
  // const [position, setPosition] = useState('');
  // const [error, setError] = useState(null);

  // function getPosition() {
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
  // return [error, getPosition, position, isLoading];
};
