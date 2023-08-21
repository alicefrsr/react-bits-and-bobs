import styles from './PageNotFound.module.css';
import searchingDuddel from '../../assets/detective.png';
import { NavLink } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useEffect } from 'react';

const PageNotFound = () => {
  useEffect(() => {
    document.title = 'Page not found';
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <img
          className='intro-img'
          src={searchingDuddel}
          alt='sherlock holmes dude looking for requested page'
        />

        <h2>404 : page not found</h2>
        <p className={styles.message}>Sorry! Bob can&#39;t find the page you are looking for.</p>

        <div className={styles.backHome}>
          <p>Let&#39;s get you back home safe</p>
          <HiArrowNarrowRight />
          <NavLink to='/'>Home</NavLink>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
