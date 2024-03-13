import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import paymentsReducer from "./features/paymentsSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    payments: paymentsReducer,
  },
});

export default store;
