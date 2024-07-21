import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../features/transactions/transactionsSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    user: userReducer,
  },
});
