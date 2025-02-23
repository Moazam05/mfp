// userSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

const getInitialUsers = () => ({
  data: [],
});

// Find user based on email
const findUser = (users, email) => users.find((user) => user.email === email);

const userSlice = createSlice({
  name: "users",
  initialState: getInitialUsers(),
  reducers: {
    addUser(state, action) {
      state.data.push(action.payload);
    },
    removeUser(state, action) {
      state.data = state.data.filter((user) => user.email !== action.payload);
    },
    updateUser(state, action) {
      const user = findUser(state.data, action.payload.email);
      if (user) {
        Object.assign(user, action.payload);
      }
    },
  },
});

export const { addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;

// Base selector
const selectUsersData = (state) => state?.users?.data;

// Memoized selector using createSelector
export const selectUsers = createSelector(
  [selectUsersData],
  (data) => data || []
);
