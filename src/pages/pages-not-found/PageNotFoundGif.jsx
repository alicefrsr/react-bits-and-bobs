import styles from './PageNotFound.module.css';
// import styles from './PageNotFoundGif.module.css';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useEffect } from 'react';

const PageNotFound = () => {
  useEffect(() => {
    document.title = '404 Page not found GIF';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className={styles.pageNotFound}>
      <div className={styles.pageNotFoundContainer}>
        <div aria-hidden='true'>
          <div>
            <iframe
              className={styles.giphyEmbed}
              src='https://giphy.com/embed/GFE5dagX3tKTqkRZg8'
            ></iframe>
          </div>
        </div>

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
