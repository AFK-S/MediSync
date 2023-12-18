import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "./slice/AppSclice";
import UserReducer from "./slice/UserSlice";

const store = configureStore({
  reducer: {
    app: AppReducer,
    user: UserReducer,
  },
});

export default store;
