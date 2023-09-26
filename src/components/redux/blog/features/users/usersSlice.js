import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    name: 'John Lennon',
  },
  {
    id: '2',
    name: 'Neil Young',
  },
  {
    id: '3',
    name: 'Bob Dylan',
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
