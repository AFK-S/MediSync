import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
  name: "app",
  initialState: {
    loading: false,
    appData: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setData: (state, action) => {
      state.appData = action.payload;
    },
  },
});

export const { setLoading, setData } = AppSlice.actions;
export default AppSlice.reducer;
