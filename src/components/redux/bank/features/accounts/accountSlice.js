import { createSlice } from '@reduxjs/toolkit';
// createSlice:
// 1. automatically creates ACTION CREATORS from our reducers
// 2. makes writing reducers easier: no more switch + default case is handled
// 3. we can mutate our state inside reducers (Immer lib)

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  // 1 reducer per action in the switch case
  // AND we can now write mutating logic
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      // -- isLoading async stuff --
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    // requestLoan(state, action) {
    //   // prepare
    //   if (state.loan > 0) return;
    //   state.loan = action.payload.amount;
    //   state.loanPurpose = action.payload.purpose;
    //   state.balance = state.balance + action.payload.amount;
    // },
    requestLoan: {
      prepare(amount, purpose) {
        // return a new obj which will become the payload object in the reducer
        return {
          payload: { amount, purpose },
        };
        // so we can access payload.amount, payload.purpose in the reducer
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan; // needs to come first (mutating state = order matters)
      state.loan = 0;
      state.loanPurpose = '';
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});
// console.log(accountSlice);

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// implementing Thunk for deposit, this will work as it is:
// (not the RTK way with createAsyncThunk (--> used in Pizza project + Redux Blog component))
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
export default accountSlice.reducer;

// // state domain: ACCOUNT
// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         isLoading: false,
//         balance: state.balance + action.payload,
//       };
//     case 'account/withdraw':
//       return { ...state, balance: state.balance - action.payload };
//     case 'account/requestLoan':
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case 'account/payLoan':
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: '',
//         balance: state.balance - state.loan,
//       };
//     case 'account/convertingCurrency':
//       return {
//         ...state,
//         isLoading: true,
//       };

//     default:
//       return state; // don't throw new Error like we did in useReducer
//   }
// }

// // ACTION CREATORS (ACCOUNT)
// // WE DON'T NEED THEM INTO THE STORE, WILL DISPATCH THEM INSIDE REACT COMPONENTS
// export function deposit(amount, currency) {
//   if (currency === 'USD') return { type: 'account/deposit', payload: amount };
//   // api call for conversion, which means we are dispatching a function intead of the object
//   return async function (dispatch, getState) {
//     dispatch({ type: 'account/convertingCurrency' });
//     // api call
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     console.log(data);
//     const convertedDeposit = data.rates.USD; //  ==> value we want to dispatch to the store
//     console.log(convertedDeposit);
//     // return action
//     dispatch({ type: 'account/deposit', payload: convertedDeposit });
//   };
// }
// export function withdraw(amount) {
//   return { type: 'account/withdraw', payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: 'account/requestLoan',
//     payload: { amount: amount, purpose: purpose },
//   };
// }
// export function payLoan() {
//   return { type: 'account/payLoan' };
// }

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
