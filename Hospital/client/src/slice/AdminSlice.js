import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../config";

export const fetchAdmin = createAsyncThunk(
  "admin/fetchAdmin",
  async (cookies, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Allow all origins, consider tightening this in production
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
          "x-auth-token": cookies,
        },
      };
      const response = await axios.get(`${SERVER_URL}/api/auth/verify`, config);
      dispatch(setAdmin(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch admin data");
    }
  }
);

const adminInitialState = {
  user: null,
  loading: "idle",
  error: null,
};

const AdminSlice = createSlice({
  name: "admin",
  initialState: adminInitialState,
  reducers: {
    setAdmin: (state, action) => {
      state.user = action.payload;
    },
    logoutAdmin: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmin.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = null;
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export const { setAdmin, logoutAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;
