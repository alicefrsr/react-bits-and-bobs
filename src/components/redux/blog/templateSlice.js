// RTK slice template
// ------------------
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {},
});

export const {} = nameSlice.actions;

export default nameSlice.reducer;

// add it to the store
