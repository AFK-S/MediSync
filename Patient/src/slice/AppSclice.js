import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
  name: "app",
  initialState: {
    loading: false,
    appData: [],
    formData: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setData: (state, action) => {
      state.appData = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { setLoading, setData, setFormData } = AppSlice.actions;
export default AppSlice.reducer;
