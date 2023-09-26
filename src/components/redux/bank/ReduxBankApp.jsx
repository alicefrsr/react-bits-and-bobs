import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import CreateCustomer from './features/customers/CreateCustomer';
import Customer from './features/customers/Customer';
import AccountOperations from './features/accounts/AccountOperations';
import BalanceDisplay from './features/accounts/BalanceDisplay';

import styles from './reduxBankApp.module.css';
import BackLink from '../../BackLink.jsx';

function ReduxBankApp() {
  const fullName = useSelector((state) => state.customer.fullName);

  useEffect(() => {
    document.title = 'Redux Bank Account';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);

  return (
    <div className={styles.app}>
      <BackLink />
      <h1>⚛️ The React-Redux Bank 🏦 </h1>
      {fullName === '' ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default ReduxBankApp;
