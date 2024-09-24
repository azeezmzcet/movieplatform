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

// Login saga
function* loginSaga(action: ReturnType<typeof loginRequest>) {
    try {
      const response = yield call(axios.post, 'http://127.0.0.1:8000/api/login', {
        email: action.payload.email,
        password: action.payload.password,
      });
      yield put(loginSuccess({ token: response.data.token }));
      localStorage.setItem('Token', response.data.token);
    } catch (error: any) {
      yield put(loginFailure({ error: 'Login failed. Please check email and password.' }));
    }
  }

// Signup saga
function* signupSaga(action: ReturnType<typeof signupRequest>) {
  try {
    const response = yield call(axios.post, "http://127.0.0.1:8000/api/register", {
      name: action.payload.name,
      email: action.payload.email,
      password: action.payload.password,
      c_password: action.payload.c_password,
    });
    localStorage.setItem("Token", response.data.tokenNmae);
    yield put(signupSuccess( response.data.tokenNmae ));
  } catch (error: any) {
    yield put(signupFailure(error.response?.data?.message || "Signup failed"));
  }
}

// Watcher saga for login and signup
export function* watchAuth() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(signupRequest.type, signupSaga);
}
