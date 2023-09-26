// RTK store template
// ------------------
import { configureStore } from '@reduxjs/toolkit';

import nameReducer from '.features/name/nameSlice';
import anotherNameReducer from '.features/anotherName/anotherNameSlice';

const store = configureStore({
  reducer: {
    name: nameReducer,
    anotherName: anotherNameReducer,
  },
});

export default store;
