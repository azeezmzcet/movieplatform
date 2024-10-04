// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  error: string | null | unknown;
  token: string | null | unknown;
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
     
    loginRequest(state, action: PayloadAction<{ token: string | unknown , email: string | unknown ; password : string | unknown }>) {
      state.loading = true;
      state.error = null;
     state.token = action.payload.token;
    },
    loginSuccess(state, action: PayloadAction<{ token: string | unknown  }>) {
      state.loading = false;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<{ error: unknown }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signupRequest: (state, _action) => {
      state.loading = true;
    },
    signupSuccess: (
      state,
      action: PayloadAction<{ token: unknown | string }>
    ) => {
      state.loading = false;
      state.token = action.payload.token;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} = authSlice.actions;

export default authSlice.reducer;
