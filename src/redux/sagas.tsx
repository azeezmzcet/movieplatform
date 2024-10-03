import { call, put, takeLatest } from "redux-saga/effects";
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

//Fetch movies saga        movielist
function* fetchMoviesSaga(): Generator {
  try {
    const response = yield call(
      axios.get,
      "http://127.0.0.1:8000/api/movieslisting"
    );
    yield put(fetchMoviesSuccess(response.data));
  } catch (error) {
    yield put(fetchMoviesFailure((error as Error).message));
  }
}

// Show movie (fetch movie by ID)
function* showMovieSaga(action: { payload: { id: unknown } }) {
  try {
    const { id } = action.payload;
    const response = yield call(
      axios.get,
      `http://127.0.0.1:8000/api/movieslisting/${id}`
    );
    yield put(showMovieSuccess(response.data));
  } catch (error) {
    yield put(showMovieFailure(error.message));
  }
}

// Update movie saga     movilstiing
function* updateMovieSaga(action: { payload: { id: unknown; data: unknown } }) {
  try {
    const { id, data } = action.payload;
    const response = yield call(
      axios.put,
      `http://127.0.0.1:8000/api/movieslisting/${id}`,
      data
    );
    yield put(updateMovieSuccess(response.data));
  } catch (error) {
    yield put(updateMovieFailure(error.message));
  }
}

// Delete movie saga    movielisting
function* deleteMovieSaga(action: { payload: { id: unknown } }) {
  try {
    const { id } = action.payload;
     yield call(
      axios.delete,
      `http://127.0.0.1:8000/api/movieslisting/${id}`
    );
    yield put(deleteMovieSuccess(id));
  } catch (error) {
    yield put(deleteMovieFailure((error as Error).message));
  }
}

export function* watchFetchMovies() {
  yield takeLatest(fetchMoviesRequest.type, fetchMoviesSaga);
  yield takeLatest(showMovieRequest.type, showMovieSaga);
  yield takeLatest(updateMovieRequest.type, updateMovieSaga);
  yield takeLatest(deleteMovieRequest.type, deleteMovieSaga);
}
