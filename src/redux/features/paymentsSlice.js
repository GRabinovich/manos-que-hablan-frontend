import { createSlice } from "@reduxjs/toolkit";

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    paymentsUsers: [],
    isLoadingPayments: false,
  },
  reducers: {
    listPayments: (state, { payload }) => {
      state.paymentsUsers = payload;
    },
    updateIsLoading: (state, { payload }) => {
      state.isLoadingPayments = payload;
    },
  },
});
export const { listPayments, updateIsLoading } = paymentsSlice.actions;
export default paymentsSlice.reducer;
