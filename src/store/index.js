import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import newsContent from "./newsContent";
import anouncementsContent from "./anouncementsContent";
import modal from "./modal";

const store = configureStore({
  reducer: {
    auth,
    newsContent,
    anouncementsContent,
    modal,
  },
});

export default store;
