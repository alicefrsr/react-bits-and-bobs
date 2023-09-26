import { useSelector } from 'react-redux';

import styles from './BalanceDisplay.module.css';

function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function BalanceDisplay() {
  const { balance } = useSelector((store) => store.account);
  console.log(`balance display: ${balance}`);

  return (
    <div className={styles.balance}>
      <span className={styles.text}>Current balance:</span>
      {formatCurrency(balance)}
    </div>
  );
}

export default BalanceDisplay;
