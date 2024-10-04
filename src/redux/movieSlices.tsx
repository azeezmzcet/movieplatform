// moviesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movies {
  id?: number;
  title?: string;
  director?: string;
  hero?: string;
  herione?: string | null;
  music_director?: string | null;
  rating?: string | null;
  story?: string | null;
}

interface MovieState {
  movies: Movies[];
  movieazeez: Movies | string;
  loading: boolean;
  error: string | null;
  

}

const initialState: MovieState = {
  movies: [],
  movieazeez: {},
  loading: false,
  error: null,
};
 
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Fetch movies actions
    fetchMoviesRequest(state) {
      state.loading = true;
    },
    fetchMoviesSuccess(state, action: PayloadAction<Movies[]>) {
      state.loading = false;
       state.movies = action.payload;
     
    },
    fetchMoviesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update movie actions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateMovieRequest(state, _action: PayloadAction<{ id: number; data: Movies }>) {
      state.loading = true;
    },
    updateMovieSuccess(state, action: PayloadAction<Movies>) {
      state.loading = false;
      state.movieazeez = action.payload;
    },
    updateMovieFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete movie actions
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteMovieRequest(state, _action: PayloadAction<{ id: number }>) {  
      state.loading = true;
      state.error = null;
    },
     
    deleteMovieSuccess(state, action: PayloadAction<{ id: number }>) {
      state.loading = false;
      state.movieazeez =action.payload ; //
    },
    deleteMovieFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Show movie actions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    showMovieRequest(state, _action: PayloadAction<{ id: number }>) {
      state.loading = false;
      state.error = null;
    },
    showMovieSuccess(state, action: PayloadAction<Movies>) {
      state.loading = false;
      state.movieazeez = action.payload;
     
    },
    showMovieFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = moviesSlice.actions;

export default moviesSlice.reducer;
