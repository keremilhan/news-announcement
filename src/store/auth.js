import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = false;
    },
  },
});

export const { loginUser, logoutUser } = auth.actions;
export default auth.reducer;
