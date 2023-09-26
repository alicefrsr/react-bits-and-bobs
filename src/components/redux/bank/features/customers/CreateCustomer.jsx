import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCustomer } from './customerSlice';

import styles from './CreateCustomer.module.css';

function Customer() {
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');

  // dispatch data to the store: useDispatch: creates a subscription to the store
  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div className={styles.customerSection}>
      <h2>Create new customer</h2>
      <div className={styles.customer}>
        <div>
          <label>Full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button className='btn' onClick={handleClick}>
          Create new customer
        </button>
      </div>
    </div>
  );
}

export default Customer;
