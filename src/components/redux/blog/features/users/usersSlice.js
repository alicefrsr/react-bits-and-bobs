import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    name: 'Brendan Eich',
  },
  {
    id: '2',
    name: 'Chris Lattner',
  },
  {
    id: '3',
    name: 'Guido van Rossum',
  },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

// export const {} = usersSlice.actions;

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
