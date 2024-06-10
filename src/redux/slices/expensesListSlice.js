import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expensesList: [],
};

const expensesListSlice = createSlice({
  name: "expensesList",
  initialState,
  reducers: {
    setExpensesList: (state, action) => {
      state.expensesList = action.payload;
    },
  },
});

export const { setExpensesList } = expensesListSlice.actions;
export default expensesListSlice.reducer;
