import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  anouncementsContent: [],
};

const anouncementsContent = createSlice({
  name: "anouncementsContent",
  initialState,
  reducers: {
    setAnouncementsContent: (state, action) => {
      state.anouncementsContent = action.payload;
    },
  },
});

export const { setAnouncementsContent } = anouncementsContent.actions;
export default anouncementsContent.reducer;
