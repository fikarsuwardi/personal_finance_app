import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import transactionsReducer from '../features/transactions/transactionsSlice';
import budgetsReducer from '../features/budgets/budgetSlice';
import reportsReducer from '../features/reports/reportSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
    budgets: budgetsReducer,
    reports: reportsReducer,
  },
});
