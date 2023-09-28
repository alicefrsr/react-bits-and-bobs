// 'CLASSIC' REDUX

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

// state domain: ACCOUNT
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        isLoading: false,
        balance: state.balance + action.payload,
      };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    case 'account/convertingCurrency':
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state; // don't throw new Error like we did in useReducer
  }
}

// ACTION CREATORS (ACCOUNT)
// WE DON'T NEED THEM INTO THE STORE, WILL DISPATCH THEM INSIDE REACT COMPONENTS
export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };
  // api call for conversion, which means we are dispatching a function intead of the object
  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });
    // api call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    const convertedDeposit = data.rates.USD; //  ==> value we want to dispatch to the store
    console.log(convertedDeposit);
    // return action
    dispatch({ type: 'account/deposit', payload: convertedDeposit });
  };
}
export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}
export function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount: amount, purpose: purpose },
  };
}
export function payLoan() {
  return { type: 'account/payLoan' };
}

// // TESTING
// // instead of
// // store.dispatch({ type: 'account/deposit', payload: 500 });
// // ==v
// store.dispatch(deposit(500));
// ==> + in react, we use useDispatch to dispatch data to the store, not store.dispatch

// // instead of
// // store.dispatch({ type: 'account/withdraw', payload: 200 });
// // ==v
// store.dispatch(withdraw(200));

// // instead of
// // store.dispatch({
// //   type: 'account/requestLoan',
// //   payload: { amount: 1000, purpose: 'buy a car' },
// // });
// // ==v
// store.dispatch(requestLoan(1000, 'buy a car'));

// // instead of
// // store.dispatch({ type: 'account/payLoan' });
// // ==v
// store.dispatch(payLoan());
