import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../utils/server";


const initialState = {
    userData: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    loading: false,
    error: null,
    success: false,
};

// register user

export const registerUser = createAsyncThunk("user/registerUser", async(payload, {rejectWithValue}) => {
    try{
        const {data} = await axios.post(`${serverUrl}/api/user/register`, payload, {withCredentials: true});
        localStorage.setItem("userInfo",JSON.stringify(data) );
        return data;
    }
    catch(err){
        console.log(err);
        return rejectWithValue(err.response?.data?.message);
    }
});

// login user

export const loginUser = createAsyncThunk("user/login", async(payload, {rejectWithValue}) =>{
    try{
        const {data} = await axios.post(`${serverUrl}/api/user/login`, payload, {withCredentials: true});
        localStorage.setItem("userInfo", JSON.stringify(data));
        return data;
    }
    catch(err){
        console.log(err);
        return rejectWithValue(err.response?.data?.message);
    }
});


// logout user

export const logoutUser = createAsyncThunk("user/logout", async() =>{
    await axios.post(`${serverUrl}/api/user/logout`, {}, { withCredentials: true });
    localStorage.removeItem("userInfo");
    return;
});








const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) =>{
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) =>{
            state.loading = false;
            state.error = null;
            state.success = true;
            state.userData = action.payload;

        });
        builder.addCase(loginUser.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
            state.success = false;
            state.userData = null;
        });
        

        builder.addCase(registerUser.pending, (state, action) =>{
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) =>{
            state.loading = false;
            state.error = null;
            state.success = true;
            state.userData = action.payload;

        });
        builder.addCase(registerUser.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
            state.success = false;
            state.userData = null;
        });


        builder.addCase(logoutUser.pending, (state) => {
    state.loading = true;
});

builder.addCase(logoutUser.fulfilled, (state) => {
    state.loading = false;
    state.userData = null;
    state.error = null;
    state.success = false;
});

builder.addCase(logoutUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
});
    }
})


const userReducer = userSlice.reducer;
export default userReducer;