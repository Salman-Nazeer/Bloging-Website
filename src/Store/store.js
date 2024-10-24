import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Features/authSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: Slice,
  },
});

export default store;
