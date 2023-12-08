import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "./slice/AppSclice";
import AdminReducer from "./slice/AdminSlice";

const store = configureStore({
  reducer: {
    app: AppReducer,
    admin: AdminReducer,
  },
});

export default store;
