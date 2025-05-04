import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;  // Expect token as payload
      state.isAuthenticated = true;
      state.token = token;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token); // Safe for client-side
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
