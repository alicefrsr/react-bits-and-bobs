import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ReusableStarRatingApp.module.css';

const OtherComponentWhichNeedsToUseStarRating = () => {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <ReusableStarRating
        maxRating={10}
        size={24}
        starColor='blue'
        ratingColor='blue'
        onSetRating={setMovieRating}
      />
      <p style={{ paddingTop: '2rem' }}>(Outside of component:)</p>

      <p>
        This movie was rated <span style={{ color: 'blue', fontWeight: 'bold' }}>{movieRating}</span>
      </p>
    </div>
  );
};

const ReusableStarRatingApp = () => {
  useEffect(() => {
    document.title = 'Custom Star-rating component';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className={styles.app}>
      <h1>Customisable star-rating component</h1>

      <div className={styles.intro}>
        <div className={styles.description}>
          <h2>Default props:</h2>
          <p>The following props can be passed to the component to customise it. Defaults values apply when props omitted:</p>
          <div className={styles.code}>
            <p> maxRating=5</p>
            <p> defaultRating=0 </p>
            <p> starColor='#fcc419' </p>
            <p> ratingColor='#000'</p>
            <p> size=48</p>
            <p> className=''</p>
            <p> messages=[]</p>
            <p> onSetRating</p>
          </div>
        </div>
        <div className={styles.demo}>
          <div>
            <ReusableStarRating />
          </div>
        </div>
      </div>

      <ul className={styles.examples}>
        <li className={styles.example}>
          <div>
            <h3>Example 1</h3>
            <div className={styles.description}>
              <p></p>
              <div className={styles.code}>
                <p style={{ fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>Props:</p>
                <p> maxRating=&#123;3&#125;</p>
                <p> starColor=&#39;red&#39; </p>
                <p> size=&#123;32&#125; </p>
                <p> messages=&#123;[&#39;Terrible&#39;, &#39;Okay&#39;, &#39;Excellent&#39;]&#125; </p>
              </div>
            </div>
          </div>
          <div className={styles.demo}>
            <div className={styles.marginl}>
              <ReusableStarRating
                maxRating={3}
                starColor='red'
                size={32}
                messages={['Terrible', 'Okay', 'Excellent']}
              />
            </div>
          </div>
        </li>

        <li className={styles.example}>
          <div>
            <h3>Example 2</h3>
            <div className={styles.description}>
              <p>setState can be passed to onSetRating to be used anywhere outside the component:</p>
              <div className={styles.code}>
                <p style={{ fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>Props:</p>
                <p> maxRating=&#123;10&#125; </p>
                <p> size=&#123;24&#125; </p>
                <p> starColor=&#39;blue&#39; </p>
                <p> ratingColor=&#39;red&#39;</p>
                <p> onSetRating=&#123;setMovieRating&#125; </p>
              </div>
            </div>
          </div>
          <div className={styles.demo}>
            <OtherComponentWhichNeedsToUseStarRating />
          </div>
        </li>
      </ul>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
};

// REUSABLE COMPONENT
export const ReusableStarRating = ({
  maxRating = 5,
  defaultRating = 0,
  starColor = '#fcc419',
  ratingColor = '#000',
  size = 48,
  className = '',
  messages = [],
  onSetRating,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = rating => {
    setRating(rating);
    onSetRating(rating);
  };

  const textStyle = {
    lineHeight: '1',
    color: ratingColor,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div
      style={containerStyle}
      className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            starIsFull={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            starColor={starColor}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{messages.length === maxRating ? messages[tempRating ? tempRating - 1 : rating - 1] : tempRating || rating || ''}</p>
    </div>
  );
};

const Star = ({ onRate, starIsFull, onHoverIn, onHoverOut, starColor, size }) => {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'block',
    cursor: 'pointer',
  };
  return (
    <span
      role='button'
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}>
      {starIsFull ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill={starColor}
          stroke={starColor}>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke={starColor}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='{2}'
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
          />
        </svg>
      )}
    </span>
  );
};

// PROPTYPES
ReusableStarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  starColor: PropTypes.string,
  ratingColor: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  onSetRating: PropTypes.func,
};

export default ReusableStarRatingApp;
