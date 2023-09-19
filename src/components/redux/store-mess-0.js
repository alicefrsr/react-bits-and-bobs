import { combineReducers, createStore } from 'redux';

const initialStateAccount = { balance: 0, loan: 0, loanPurpose: '' };

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

// state domain: ACCOUNT
const accountReducer = (state = initialStateAccount, action) => {
  // actions dispatched to the store: type + payload
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose, // we're passing in an loan object: {amount: ..., purpose: ...}
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };

    default:
      return state; // don't throw new Error like we did in useReducer
  }
};

// state domain: CUSTOMER
const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// we don't dispatch action to the reducer, but to the store (store.dispatch())
// to use these reducers, we have to place them into the store
const store = createStore(rootReducer);

// instead of
// store.dispatch({ type: 'account/deposit', payload: 500 });
// ==v
store.dispatch(deposit(500));

// instead of
// store.dispatch({ type: 'account/withdraw', payload: 200 });
// ==v
store.dispatch(withdraw(200));

// instead of
// store.dispatch({
//   type: 'account/requestLoan',
//   payload: { amount: 1000, purpose: 'buy a car' },
// });
// ==v
store.dispatch(requestLoan(1000, 'buy a car'));

// instead of
// store.dispatch({ type: 'account/payLoan' });
// ==v
store.dispatch(payLoan());

//////////////////////////////
console.log(store.getState());
//////////////////////////////

// ACTION CREATORS (ACCOUNT)
function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}
function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount: amount, purpose: purpose },
  };
}
function payLoan() {
  return { type: 'account/payLoan' };
}

// ACTION CREATORS (CUSTOMER)
function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
  //createdAt: new Date().toISOString() is a side effect, doesn't belong in the reducer
}

function updateName(fullName) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
}

store.dispatch(createCustomer('Alice Fraser', '007'));
store.dispatch(deposit(10000));
store.dispatch(updateName('Alice Frazer'));

//////////////////////////////
console.log(store.getState());
//////////////////////////////
