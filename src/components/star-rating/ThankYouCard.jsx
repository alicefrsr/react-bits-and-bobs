import CardBg from './CardBg';
import styles from './ThankYouCard.module.css';

const ThankYouCard = ({ rating }) => {
  const emoji = () => {
    switch (rating) {
      case 1:
        return '😰';
      case 2:
        return '😥';
      case 3:
        return '🙂';
      case 4:
        return '😊';
      case 5:
        return '🥰';
      default:
        return '';
    }
  };

  const message = () => {
    if (rating === 1 || rating === 2) {
      return "We are really sorry to hear we didn't do a better job. We'll try harder next time.";
    } else {
      return "We appreciate you taking the time to give us a rating. If you ever need more support, don't hesitate to get in touch!";
    }
  };

  return (
    <div>
      <CardBg>
        <div className={styles.imgContainer}>{emoji()}</div>
        <div className={styles.selected}>
          <p>You selected {rating} out of 5</p>
        </div>
        <h2 className={styles.thankyouTitle}>Thank you!</h2>
        <div className={styles.text}>{message()}</div>
      </CardBg>
    </div>
  );
};

export default ThankYouCard;
