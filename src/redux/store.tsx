import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movieSlices";
import { watchFetchMovies } from "./sagas";
import createSagaMiddleware from "@redux-saga/core";

import authReducer from "./authSlice";
import { watchAuth } from "./authSagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchMovies);
sagaMiddleware.run(watchAuth);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
