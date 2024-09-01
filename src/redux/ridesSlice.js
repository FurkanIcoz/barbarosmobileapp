// src/redux/rideHistorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

export const fetchRideHistory = createAsyncThunk(
  'rideHistory/fetchRideHistory',
  async (_, { rejectWithValue }) => {
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'rides'));
      const rideHistory = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return rideHistory;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ridesSlice = createSlice({
  name: 'rideHistory',
  initialState: {
    rideHistory: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRideHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRideHistory.fulfilled, (state, action) => {
        state.rideHistory = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRideHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default ridesSlice.reducer;
