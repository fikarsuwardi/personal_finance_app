import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { logout } from '../user/userSlice';

export const fetchBudgets = createAsyncThunk('budgets/fetchBudgets', async (_, { getState, rejectWithValue }) => {
  const { user } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    const response = await axios.get('/api/budgets', config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

export const addBudget = createAsyncThunk('budgets/addBudget', async (budgetData, { getState, rejectWithValue }) => {
  const { user } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    const response = await axios.post('/api/budgets', budgetData, config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

export const deleteBudget = createAsyncThunk('budgets/deleteBudget', async (budgetId, { getState, rejectWithValue }) => {
  const { user } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    await axios.delete(`/api/budgets/${budgetId}`, config);
    return budgetId;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

const budgetSlice = createSlice({
  name: 'budgets',
  initialState: {
    budgets: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetBudgetsState: (state) => {
      state.budgets = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBudget.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets.push(action.payload);
      })
      .addCase(addBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBudget.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = state.budgets.filter(budget => budget.id !== action.payload);
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout, (state) => {
        state.budgets = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export default budgetSlice.reducer;
export const { resetBudgetsState } = budgetSlice.actions;
