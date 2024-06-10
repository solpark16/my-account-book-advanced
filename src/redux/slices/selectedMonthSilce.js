import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMonth: window.localStorage.getItem("selectedMonth"),
};

const selectedMonthSlice = createSlice({
  name: "selectedMonth",
  initialState,
  reducers: {
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setSelectedMonth } = selectedMonthSlice.actions;
export default selectedMonthSlice.reducer;
