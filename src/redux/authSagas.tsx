import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} from "./authSlice";
import { PayloadAction } from "@reduxjs/toolkit";

// interface LoginResponse {
//   tokenNmae: string;
// }

// Login saga
function* loginSaga(
  action: PayloadAction<{ email: string; password: string }>
): Generator {
  try {
    const response: unknown = yield call(
      axios.post,
      "http://127.0.0.1:8000/api/login",
      {
        email: action.payload.email,
        password: action.payload.password,
      }
    );
    yield put(loginSuccess({ token: response.data.tokenNmae }));
    localStorage.setItem("Token", response.data.tokenNmae);
    window.location.replace("/"); //only things is to navigate homepage
  } catch (error: unknown) {
    yield put(
      loginFailure({
        error,
      })
    );
  }
}

// Signup saga
function* signupSaga(action: ReturnType<typeof signupRequest>): Generator {
  try {
    const response: unknown = yield call(
      axios.post,
      "http://127.0.0.1:8000/api/register",
      {
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        c_password: action.payload.c_password,
      }
    );

    yield put(signupSuccess({ token: response }));
    // localStorage.setItem("Token", response.data.tokenNmae);
    window.location.replace("/"); //only things is to navigate homepage
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle known Axios error
      yield put(
        signupFailure(error.response?.data?.message || "Signup failed")
      );
    } else {
      // Handle unknown error types
      yield put(signupFailure("An unknown error occurred during signup"));
    }
  }
}

// Watcher saga for login and signup
export function* watchAuth() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(signupRequest.type, signupSaga);
}
