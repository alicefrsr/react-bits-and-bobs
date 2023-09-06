import { useReducer } from 'react';
import styles from './BankAccountReduced.module.css';
import BackLink from '../BackLink';

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const reducer = (state, action) => {
  if (!state.isActive && action.type !== 'openAccount') return state;

  switch (action.type) {
    case 'openAccount':
      return { ...state, isActive: true, balance: 500 };

    case 'closeAccount':
      if (state.loan || state.balance !== 0) return state;
      else return initialState;

    case 'deposit':
      return { ...state, balance: state.balance + action.payload };

    case 'withdraw':
      return { ...state, balance: state.balance - action.payload };

    case 'requestLoan':
      if (state.loan > 0) return state;
      else
        return {
          ...state,
          loan: action.payload,
          balance: state.balance + action.payload,
        };
    case 'payLoan':
      // return { ...state, loan: 0, balance: state.balance - action.payload };
      return { ...state, loan: 0, balance: state.balance - state.loan };
    default:
      throw new Error('Unknown');
  }
};

function BankAccountReduced() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <main className={styles.app}>
      <BackLink />
      <div className={styles.account}>
        <h1>useReducer Bank Account</h1>
        <p>Balance: {balance}</p>
        <p>Loan: {loan}</p>

        <p>
          <button
            onClick={() => dispatch({ type: 'openAccount' })}
            disabled={isActive}
          >
            Open account
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: 'deposit', payload: 150 })}
            disabled={!isActive}
          >
            Deposit 150
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: 'withdraw', payload: 50 })}
            disabled={!isActive}
          >
            Withdraw 50
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: 'requestLoan', payload: 5000 })}
            disabled={!isActive}
          >
            Request a loan of 5000
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: 'payLoan', payload: 5000 })}
            disabled={!isActive}
          >
            Pay loan
          </button>
        </p>
        <p>
          <button
            onClick={() => {
              dispatch({ type: 'closeAccount' });
            }}
            disabled={!isActive}
          >
            Close account
          </button>
        </p>
      </div>
    </main>
  );
}
export default BankAccountReduced;
