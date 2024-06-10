import { configureStore } from "@reduxjs/toolkit";
import selectedMonthSilce from "../slices/selectedMonthSilce";
import expensesListSlice from "../slices/expensesListSlice";
import expensesSlice from "../slices/expensesSlice";

const store = configureStore({
  reducer: {
    selectedMonth: selectedMonthSilce,
    expensesList: expensesListSlice,
    expenses: expensesSlice,
  },
});

export default store;
