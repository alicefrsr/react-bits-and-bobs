import styles from './CardBg.module.css';

const CardBg = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default CardBg;
