import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  encryptStorage,
  getLoalStorageItem,
  setLoalStorageItem,
} from "../../utils/secure-storage";

const isAuth = getLoalStorageItem("auth") || false;
const user = getLoalStorageItem("user") || {};

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: user || null,
    isAuthenticated: isAuth || false,
  },
  reducers: {
    login(state, action) {
      state.data = action.payload;
      state.isAuthenticated = true;

      // local storage set
      encryptStorage.setItem("auth", true);
      setLoalStorageItem("user", action.payload);
    },
    logout(state) {
      state.data = null;
      state.isAuthenticated = false;

      // local storage remove
      encryptStorage.removeItem("auth");
      encryptStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
