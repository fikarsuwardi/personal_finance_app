import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'; // Gunakan instance axios yang sudah dikonfigurasi

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

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [], // Initial state adalah array kosong
    loading: false,
    error: null,
  },
  reducers: {},
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
      });
  },
});

export default transactionsSlice.reducer;
