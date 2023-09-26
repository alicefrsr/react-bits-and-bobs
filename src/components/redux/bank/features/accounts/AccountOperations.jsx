import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deposit, withdraw, requestLoan, payLoan } from './accountSlice';

import styles from './AccountOperations.module.css';

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [currency, setCurrency] = useState('USD');

  const dispatch = useDispatch();
  const account = useSelector((store) => store.account);

  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    balance,
    isLoading,
  } = useSelector((store) => store.account);

  function handleDeposit() {
    if (!depositAmount) return;
    // instead of dispatch({ type: 'account/deposit', payload: amount })
    // dispatch(deposit(depositAmount));
    dispatch(deposit(depositAmount, currency));
    // 2 dispatches:
    // if amount in USD, deposit(depositAmount, currency) returns action + payload
    // if amount not in USD, deposit(depositAmount, currency) returns function, which takes in dispatch so it can use in the future, after the async function returns

    setDepositAmount('');
    setCurrency('USD');
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount('');
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount('');
    setLoanPurpose('');
  }

  function handlePayLoan() {
    if (!currentLoan) return;
    dispatch(payLoan());
  }

  return (
    <div className={styles.accountSection}>
      <h2>Your account operations</h2>
      <div className={styles.accountOps}>
        <div className={styles.section}>
          <label>Deposit</label>
          <input
            type='number'
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value='USD'>US Dollar</option>
            <option value='EUR'>Euro</option>
            <option value='GBP'>British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? 'Converting...' : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div className={styles.section}>
          <label>Withdraw</label>
          <input
            type='number'
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button className='btn' onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div className={styles.section}>
          <label>Loan Request</label>
          <input
            type='number'
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder='Loan amount'
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder='Loan purpose'
          />
          <button className='btn' onClick={handleRequestLoan}>
            Request loan {loanAmount}
          </button>
        </div>

        {currentLoan > 0 && (
          <div className={styles.section}>
            <span>
              Current loan: ${currentLoan} ({currentLoanPurpose})
            </span>
            <button className='btn' onClick={handlePayLoan}>
              Pay loan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
