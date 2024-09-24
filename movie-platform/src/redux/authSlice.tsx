// authSlice.ts
import { createSlice,  PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<{ email: string; password: string }>) {
        state.loading = true;
        state.error = null;
      },
      loginSuccess(state, action: PayloadAction<{ token: string }>) {
        state.loading = false;
        state.token = action.payload.token;
        state.error = null;
      },
      loginFailure(state, action: PayloadAction<{ error: string }>) {
        state.loading = false;
        state.error = action.payload.error;
    },
    signupRequest: (state, action: PayloadAction<{ name: string; email: string; password: string; c_password: string }>) => {
      state.loading = true;
    },
    signupSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.token = action.payload;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, signupRequest, signupSuccess, signupFailure } = authSlice.actions;

export default authSlice.reducer;
