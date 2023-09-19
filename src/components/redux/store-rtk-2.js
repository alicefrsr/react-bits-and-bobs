// Classic Redux (commented out) vs RTK
// ------------------------------------

// npm install @reduxjs/toolkit
// (--> RTK allows us to write code that mutates state inside reducers: converted to immutable logic by Immer library - can reduce code complexity)
// (--> action creators automatically created)
// (--> configureStore automatically combines reducers, adds thunk mw + sets up dev tools)

// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
