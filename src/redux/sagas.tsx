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
import { PayloadAction } from "@reduxjs/toolkit";



interface Movie {
  id: number;
  title: string;
  director: string;
  hero: string;
  herione: string | null;
  music_director: string | null;
  rating: string | null;
  story: string | null;
  }

interface MoviesResponse {
  data: Movie[];
}


interface MovieResponse {
  data: Movie;
}


//Fetch movies saga        movielist
function* fetchMoviesSaga(): Generator<unknown, void, MoviesResponse> {
  try {
    const response: MoviesResponse = yield call(
      axios.get,
      "http://127.0.0.1:8000/api/movieslisting"
    );
    yield put(fetchMoviesSuccess(response.data));
  } catch (error) {
    yield put(fetchMoviesFailure((error as Error).message));
  }
}

// Show movie (fetch movie by ID)
function* showMovieSaga(action: PayloadAction<{ id: number | unknown }>):Generator<unknown, void, MovieResponse> {
  try {
    const { id } = action.payload;
    const response: MovieResponse = yield call(
      axios.get,
      `http://127.0.0.1:8000/api/movieslisting/${id}`
    );
    yield put(showMovieSuccess(response.data));
  } catch (error) {
    yield put(showMovieFailure((error as Error).message));
  }
}

// Update movie saga     movilstiing
function* updateMovieSaga(action: PayloadAction<{ id: number ; data: unknown | string }>):Generator<unknown, void, MovieResponse> {
  try {
    const { id, data } = action.payload;
    const response = yield call(
      axios.put,
      `http://127.0.0.1:8000/api/movieslisting/${id}`,
      data
    );
    yield put(updateMovieSuccess(response.data));
  } catch (error) {
    yield put(updateMovieFailure((error as Error).message));
  }
}

// Delete movie saga    movielisting
function* deleteMovieSaga(action: PayloadAction<{ id: number }>) {
  try {
    const { id } = action.payload;
     yield call(
      axios.delete,
      `http://127.0.0.1:8000/api/movieslisting/${id}`
    );
    yield put(deleteMovieSuccess({id:Number(id)}));
  } catch (error) {
    yield put(deleteMovieFailure((error as Error).message));
  }
}

export function* watchFetchMovies() {
  yield takeLatest(showMovieRequest.type, showMovieSaga);
  yield takeLatest(fetchMoviesRequest.type, fetchMoviesSaga);
  yield takeLatest(updateMovieRequest.type, updateMovieSaga);
  yield takeLatest(deleteMovieRequest.type, deleteMovieSaga);
}
