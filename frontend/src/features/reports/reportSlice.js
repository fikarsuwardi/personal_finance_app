import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { logout } from '../user/userSlice';

export const fetchReport = createAsyncThunk('reports/fetchReport', async (_, { getState, rejectWithValue }) => {
  const { user } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    const response = await axios.get('/api/reports', config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    report: {},
    loading: false,
    error: null,
  },
  reducers: {
    resetReportState: (state) => {
      state.report = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout, (state) => {
        state.report = {};
        state.loading = false;
        state.error = null;
      });
  },
});

export default reportSlice.reducer;
export const { resetReportState } = reportSlice.actions;
