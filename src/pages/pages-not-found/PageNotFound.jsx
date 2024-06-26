import styles from './PageNotFound.module.css';
// import searchingDuddel from '../../assets/detective.png';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useEffect } from 'react';

const PageNotFound = () => {
  useEffect(() => {
    document.title = '404 Page not found';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className={styles.pageNotFound}>
      <div className={styles.pageNotFoundContainer}>
        <img
          // className='intro-img'
          src={'../../../duddel/searchingDuddel.png'}
          alt='sherlock holmes duddel looking for requested page'
        />

        <h1>404 : page not found</h1>
        <p className={styles.message}>
          Sorry! Bob can&#39;t find the page you are looking for.
        </p>

        <div className={styles.backHome}>
          <p>Let&#39;s get you back to base camp safe</p>
          <HiArrowNarrowRight />
          <Link to='/'>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
