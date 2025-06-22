import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  access_token: string | null;
  refresh_token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: typeof window !== "undefined" && !!localStorage.getItem("access_token"),
  access_token: typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
  refresh_token: typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { access, refresh } = action.payload;
      state.isAuthenticated = true;
      state.access_token = access;
      state.refresh_token = refresh;

      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.access_token = null;
      state.refresh_token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
