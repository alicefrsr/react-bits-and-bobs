// import styles from './PageNotFound.module.css';
// import searchingDuddel from '../../assets/detective.png';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useEffect } from 'react';

const PageNotFound = () => {
  useEffect(() => {
    document.title = 'Page not found';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className='page-not-found'>
      <div className='page-not-found-container'>
        <img
          // className='intro-img'
          src={'../../../duddel/searchingDuddel.png'}
          alt='sherlock holmes duddel looking for requested page'
        />

        <h2>404 : page not found</h2>
        <p className='message'>
          Sorry! Bob can&#39;t find the page you are looking for.
        </p>

        <div className='backHome'>
          <p>Let&#39;s get you back home safe</p>
          <HiArrowNarrowRight />
          <Link to='/'>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
