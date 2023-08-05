import { useState } from 'react';
import RatingCard from './RatingCard';
import ThankYouCard from './ThankYouCard';
import styles from './StarRatingApp.module.css';

function StarRatingApp() {
  const [showThankYouCard, setShowThankYouCard] = useState(false);
  const [rating, setRating] = useState(null);

  const handleRating = rating => {
    setRating(rating);
  };

  const handleShowCard = bool => {
    setShowThankYouCard(bool);
  };

  return (
    <main className={styles.container}>
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
