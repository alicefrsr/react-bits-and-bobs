import { useState, useEffect } from 'react';
import styles from './StarRatingApp.module.css';
import RatingCard from './RatingCard';
import ThankYouCard from './ThankYouCard';
import BackHomeLink from '../BackHomeLink';

function StarRatingApp() {
  useEffect(() => {
    document.title = 'Rating component | How did we do?';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  const [showThankYouCard, setShowThankYouCard] = useState(false);
  const [rating, setRating] = useState(null);

  const handleRating = (rating) => {
    setRating(rating);
  };

  const handleShowCard = (bool) => {
    setShowThankYouCard(bool);
  };

  return (
    <main className={styles.container}>
      <BackHomeLink />
      {showThankYouCard ? (
        <ThankYouCard rating={rating} />
      ) : (
        <RatingCard
          rating={rating} // state as props
          // to move state from RatingCard (where the event the select rating happens) UP to parent, so we can pass it down to TYCard comp
          onSelectRating={handleRating}
          // to move state from RatingCard (where the --submit-- event is) UP to parent
          onShowThankYouCard={handleShowCard}
        />
      )}
    </main>
  );
}

export default StarRatingApp;
