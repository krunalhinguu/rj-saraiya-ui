import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    currentCustomerTab: 0,
    order: null,
  },
  reducers: {
    setCurrentCustomerTab(state, action) {
      state.currentCustomerTab = action.payload.tab;
    },
    setOrder(state, action) {
      state.order = action.payload.order;
      state.currentCustomerTab = 0;
    },
    clearOrder(state) {
      state.order = null;
    },
  },
});

export const { setCurrentCustomerTab, setOrder, clearOrder } =
  commonSlice.actions;

export default commonSlice.reducer;
