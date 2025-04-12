// Redux Toolkit Imports
import { configureStore } from "@reduxjs/toolkit";
// Custom Imports
import { apiSlice } from "./api/apiSlice";
// import usersReducer from "./users/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // For API Integration

    // users: usersReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});
