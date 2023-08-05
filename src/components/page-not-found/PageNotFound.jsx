import styles from './PageNotFound.module.css';

const PageNotFound = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div>GIF</div>
        <div className={styles.pageNotFound}>
          <span>404</span> :page not found
        </div>
        <div
          className='detective-gif'
          aria-hidden='true'>
          <div
            className={styles.gif}
            style=''>
            <iframe
              className={styles.giphyEmbed}
              src='https://giphy.com/embed/GFE5dagX3tKTqkRZg8'></iframe>
          </div>
          <p>
            <a href='https://giphy.com/gifs/GFE5dagX3tKTqkRZg8'>via GIPHY</a>
          </p>
        </div>

        <div className={styles.message}>Sorry! We can't find the page you are looking for.</div>
      </div>
    </div>
  );
};

export default PageNotFound;
