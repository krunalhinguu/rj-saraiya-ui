import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    lang: localStorage.getItem("i18nextLng"),
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload.toggle;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHeader, setLanguage } = navigationSlice.actions;

export default navigationSlice.reducer;
