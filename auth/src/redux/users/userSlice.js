// userSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

// Load initial state from localStorage if available
const getInitialUsers = () => {
  try {
    const persistedUsers = localStorage.getItem("users");
    return persistedUsers ? JSON.parse(persistedUsers) : { data: [] };
  } catch (error) {
    console.error("Error loading users from localStorage:", error);
    return { data: [] };
  }
};

// Find user based on email
const findUser = (users, email) => users.find((user) => user.email === email);

// Helper function to save state to localStorage
const saveToLocalStorage = (users) => {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage:", error);
  }
};

const userSlice = createSlice({
  name: "users",
  initialState: getInitialUsers(),
  reducers: {
    addUser(state, action) {
      state.data.push(action.payload);
      saveToLocalStorage(state);
    },
    removeUser(state, action) {
      state.data = state.data.filter((user) => user.email !== action.payload);
      saveToLocalStorage(state);
    },
    updateUser(state, action) {
      const user = findUser(state.data, action.payload.email);
      if (user) {
        Object.assign(user, action.payload);
        saveToLocalStorage(state);
      }
    },
    // Optional: Add a clear users action for log out
    clearUsers(state) {
      state.data = [];
      saveToLocalStorage(state);
    },
  },
});

export const { addUser, removeUser, updateUser, clearUsers } =
  userSlice.actions;
export default userSlice.reducer;

// Base selector
const selectUsersData = (state) => state?.users?.data;

// Memoized selector using createSelector
export const selectUsers = createSelector(
  [selectUsersData],
  (data) => data || []
);
