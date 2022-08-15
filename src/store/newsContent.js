import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newsContent: [],
};

const newsContent = createSlice({
  name: "newsContent",
  initialState,
  reducers: {
    setNewsContent: (state, action) => {
      state.newsContent = action.payload;
    },
  },
});

export const { setNewsContent } = newsContent.actions;
export default newsContent.reducer;
