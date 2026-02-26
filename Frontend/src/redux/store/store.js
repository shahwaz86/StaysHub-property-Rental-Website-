import { configureStore } from '@reduxjs/toolkit'
import listingReducer from '../slice/listingSlice';
import userReducer from '../slice/userSlice';
import bookingReducer from '../slice/bookingSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    listing: listingReducer,
    booking: bookingReducer,
  },
});