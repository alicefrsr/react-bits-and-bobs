import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // createCustomer(state, action) {
    //   (state.fullName = action.payload.fullName),
    //   (state.nationalID = action.payload.nationalID),
    //   (state.createdAt = action.payload.createdAt);
    // },
    createCustomer: {
      prepare(fullName, nationalID, createdAt) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;

// // state domain: CUSTOMER
// export default function customerReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'customer/createCustomer':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case 'customer/updateName':
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// // ACTION CREATORS (CUSTOMER)
// // WE DON'T NEED THEM INTO THE STORE, WILL DISPATCH THEM INSIDE REACT COMPONENTS
// export function createCustomer(fullName, nationalID) {
//   return {
//     type: 'customer/createCustomer',
//     payload: { fullName, nationalID, createdAt: new Date().toISOString() },
//   };
//   //createdAt: new Date().toISOString() is a side effect, doesn't belong in the reducer
// }

// export function updateName(fullName) {
//   return {
//     type: 'customer/updateName',
//     payload: fullName,
//   };
// }
