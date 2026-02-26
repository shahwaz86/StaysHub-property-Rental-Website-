import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../utils/server";

const initialState = {
  loadingInBooking: false,
  error: null,
  success: false,
  bookings: [],
};

// CREATE BOOKING
export const createBooking = createAsyncThunk(
  "booking/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/booking/create`,
        payload,
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// GET MY BOOKINGS
export const getMyBookings = createAsyncThunk(
  "booking/my",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/booking/my`,
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// CANCEL BOOKING
export const cancelBooking = createAsyncThunk(
  "booking/cancel",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/booking/cancel/${id}`,
        {},
        { withCredentials: true }
      );

      return data.booking; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createBooking.pending, (state) => {
        state.loadingInBooking = true;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.loadingInBooking = false;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loadingInBooking = false;
        state.error = action.payload;
      })

      // GET
      .addCase(getMyBookings.pending, (state) => {
        state.loadingInBooking = true;
      })
      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.loadingInBooking = false;
        state.bookings = action.payload;
      })

      // CANCEL
      .addCase(cancelBooking.fulfilled, (state, action) => {
         state.bookings = state.bookings.map((b) =>
            b._id === action.payload._id ? action.payload : b
  );
})
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;