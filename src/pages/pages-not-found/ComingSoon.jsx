import styles from './ComingSoon.module.css';
// import styles from './PageNotFoundGif.module.css';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useEffect } from 'react';

const PageNotFound = () => {
  useEffect(() => {
    document.title = 'Coming soon!';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className={styles.comingSoon}>
      <div className={styles.comingSoonContainer}>
        <div aria-hidden='true'>
          <div>
            <iframe
              src='https://giphy.com/embed/8nZzYdFae5g2S9RVPG'
              className={styles.giphyEmbed}
              // allowFullScreen
            ></iframe>
          </div>
        </div>

        <h1>Coming soon !</h1>
        <p className={styles.message}>Still working on it...</p>

        <div className={styles.backHome}>
          <p></p>

          <Link to='/'>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
