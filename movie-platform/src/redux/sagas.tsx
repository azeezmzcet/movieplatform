import {  call, put,takeLatest} from "redux-saga/effects";
import axios from "axios";
import {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  updateMovieRequest,
  updateMovieSuccess,
  updateMovieFailure,
  deleteMovieRequest,
  deleteMovieSuccess,
  deleteMovieFailure,
  showMovieRequest,
  showMovieSuccess,
  showMovieFailure,
} from "./movieSlices";

import { loginRequest, loginSuccess, loginFailure, signupRequest, signupSuccess, signupFailure } from "./authSlice";

// import {
//     signupRequest,
//     signupSuccess,
//     signupFailure,
//     loginRequest,
//     loginSuccess,
//     loginFailure,
//   } from '../redux/authSlice';

 




  //Signup saga
// function* signupSaga(action) {
//     try {
//       const response = yield call(axios.post, 'http://127.0.0.1:8000/api/register', action.payload);
//       yield put(signupSuccess(response.data));
//       // Optionally, save token to localStorage or navigate
//       localStorage.setItem("Token", response.data.tokenNmae);
      
//     } catch (error) {
//       yield put(signupFailure(error.message));
//     }
//   }
  
// //   // Login saga
// function* loginSaga(action: ReturnType<typeof loginRequest>) {
//     try {
//       const response = yield call(axios.post, 'http://127.0.0.1:8000/api/login', {
//         email: action.payload.email,
//         password: action.payload.password,
//       });
//       yield put(loginSuccess({ token: response.data.token }));
//       localStorage.setItem('Token', response.data.token);
//     } catch (error: any) {
//       yield put(loginFailure({ error: 'Login failed. Please check email and password.' }));
//     }
//   }
  

///////////////////
// function* loginSaga(action: ReturnType<typeof loginRequest>) {
//     try {
//       const response = yield call(axios.post, "http://127.0.0.1:8000/api/login", action.payload);
//       localStorage.setItem("Token", response.data.tokenNmae); // Save token
//       yield put(loginSuccess(response.data.tokenNmae));
//     } catch (error: any) {
//       yield put(loginFailure(error.response?.data?.message || "Login failed"));
//     }
//   }
  
//   // Signup Saga
//   function* signupSaga(action: ReturnType<typeof signupRequest>) {
//     try {
//       const response = yield call(axios.post, "http://127.0.0.1:8000/api/register", action.payload);
//       localStorage.setItem("Token", response.data.tokenNmae); // Save token
//       yield put(signupSuccess(response.data.tokenNmae));
//     } catch (error: any) {
//       yield put(signupFailure(error.response?.data?.message || "Signup failed"));
//     }
//   }
  


//Fetch movies saga        movielist
function* fetchMoviesSaga() {
  try {
    const response = yield call(axios.get, "http://127.0.0.1:8000/api/movieslisting");
    yield put(fetchMoviesSuccess(response.data));
  } catch (error) {
    yield put(fetchMoviesFailure(error.message));
  }
}



// Show movie (fetch movie by ID)
function* showMovieSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(axios.get, `http://127.0.0.1:8000/api/movieslisting/${id}`);
    yield put(showMovieSuccess(response.data));
  } catch (error) {
    yield put(showMovieFailure(error.message));
  }
}

// Update movie saga     movilstiing
function* updateMovieSaga(action) {
  try {
    const { id,data } = action.payload;
    const response = yield call(axios.put, `http://127.0.0.1:8000/api/movieslisting/${id}` ,data);
    yield put(updateMovieSuccess(response.data));
  } catch (error) {
    yield put(updateMovieFailure(error.message));
  }
}

// Delete movie saga    movielisting
function* deleteMovieSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(axios.delete, `http://127.0.0.1:8000/api/movieslisting/${id}`);
    yield put(deleteMovieSuccess(response.id));
  } catch (error) {
    yield put(deleteMovieFailure(error.message));
  }
}









// export default function* watchFetchMovies /*rootSaga*/() {
//     yield all([
//       takeEvery(fetchMoviesRequest.type, fetchMoviesSaga),
//       takeEvery(showMovieRequest.type, showMovieSaga),
//       takeEvery(updateMovieRequest.type, updateMovieSaga),
//       takeEvery(deleteMovieRequest.type, deleteMovieSaga),
//     //   takeEvery(signupRequest.type, signupSaga),
//     //   takeEvery(loginRequest.type, loginSaga),
//     ]);
//   }


export function* watchFetchMovies() {
    yield takeLatest(fetchMoviesRequest.type, fetchMoviesSaga);
    yield takeLatest (showMovieRequest.type, showMovieSaga);
    yield takeLatest  (updateMovieRequest.type, updateMovieSaga);
    yield takeLatest (deleteMovieRequest.type, deleteMovieSaga);
    // yield takeLatest(loginRequest.type, loginSaga);
    // yield takeLatest(signupRequest.type, signupSaga);
  }