import styles from './PageNotFoundGif.module.css';
import { NavLink } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
const PageNotFound = () => {
  return (
    <div className={styles.PageNotFoundGif}>
      <div className={styles.container}>
        <div
          className={styles.detectiveGif}
          aria-hidden='true'>
          <div className={styles.gif}>
            <iframe
              className={styles.giphyEmbed}
              src='https://giphy.com/embed/GFE5dagX3tKTqkRZg8'></iframe>
          </div>
        </div>

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
