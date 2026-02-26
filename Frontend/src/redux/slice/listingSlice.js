import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../utils/server";

const initialState = {
  loading: false,
  success: false,
  error: null,
  listing: null,
  listings: [],
  singleListing: null,
};


//create listing
export const createListing = createAsyncThunk(
  "listing/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/listing/create`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Listing creation failed"
      );
    }
  }
);

//get all listings
export const getListings = createAsyncThunk(
  "listing/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/listing/get-all`,
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch listings"
      );
    }
  }
);

//get single listing by id

export const getSingleListing = createAsyncThunk(
  "listing/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/listing/get/${id}`,
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch listing");
    }
  }
);

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    resetListingState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    //create listing
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.listing = action.payload;
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // 🔹 GET ALL LISTINGS
       .addCase(getListings.pending, (state) => {
      state.loading = true;
    })
    .addCase(getListings.fulfilled, (state, action) => {
      state.loading = false;
       state.listings = action.payload.listings || [];
    })
    .addCase(getListings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // 🔹 GET SINGLE LISTING
    .addCase(getSingleListing.pending, (state) => {
    state.loading = true;
    })
    .addCase(getSingleListing.fulfilled, (state, action) => {
    state.loading = false;
    state.singleListing = action.payload;
    })
    .addCase(getSingleListing.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
    });
  },
});

export const { resetListingState } = listingSlice.actions;
export default listingSlice.reducer;