import { configureStore } from "@reduxjs/toolkit";
import selectedMonthSilce from "../slices/selectedMonthSilce";

const store = configureStore({
  reducer: {
    selectedMonth: selectedMonthSilce,
  },
});

export default store;
