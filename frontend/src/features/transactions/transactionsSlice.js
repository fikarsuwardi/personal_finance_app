import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { logout } from '../user/userSlice';

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async (_, { getState, rejectWithValue }) => {
  const { user } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    const response = await axios.get('/api/transactions', config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

export const addTransaction = createAsyncThunk('transactions/addTransaction', async (transactionData, { getState, rejectWithValue }) => {
  const { user } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    const response = await axios.post('/api/transactions', transactionData, config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

export const deleteTransaction = createAsyncThunk('transactions/deleteTransaction', async (transactionId, { getState, rejectWithValue }) => {
  const { user } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    await axios.delete(`/api/transactions/${transactionId}`, config);
    return transactionId;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetTransactionsState: (state) => {
      state.transactions = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.push(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout, (state) => {
        state.transactions = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export default transactionsSlice.reducer;
export const { resetTransactionsState } = transactionsSlice.actions;
