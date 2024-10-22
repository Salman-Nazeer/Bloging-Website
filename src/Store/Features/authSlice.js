import { createSlice } from "@reduxjs/toolkit";

// InitialState is defined two properties
const initialState = {
  // 1)status: A boolean indicating whether a user is logged in or not
  status: false,
  // 2)userData: This property will hold information about the authenticated user.
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      // login: This function is called when a user logs in.
      //        It updates the status to true and sets userData to the payload received in the action
      state.status = true;
      state.userData = action.payload.userData;
      // console.log(userData.$id)
    },
    logout(state) {
      // logout: This function is called when a user logs out.
      //         It resets the status to false and clears the userData.
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
