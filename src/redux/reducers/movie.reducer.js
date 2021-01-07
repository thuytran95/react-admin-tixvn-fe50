import {
  ADD_MOVIE_FAILED,
  ADD_MOVIE_SUCESS,
  DELETE_MOVIE_SUCESS,
  GET_MOVIE_LIST_FAILED,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCESS,
} from "../constants/movie.constants";

const initialState = {
  loading: false,
  movieList: null,
  err: null,
  movie: null,
  errAdd: null,
};

const MovieReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_MOVIE_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_MOVIE_LIST_SUCESS:
      return { ...state, loading: false, movieList: payload };
    case GET_MOVIE_LIST_FAILED:
      return { ...state, loading: false, movieList: null, err: payload };
    case ADD_MOVIE_SUCESS: {
      const movieList = state.movieList;
      movieList.push(payload);
      state.userList = movieList;
      return { ...state, movie: payload };
    }
    case ADD_MOVIE_FAILED:
      return { ...state, movie: null, errAdd: payload };
    case DELETE_MOVIE_SUCESS: {
      // tim vi tri phan tu xoa
      const movieList = state.movieList;
      const index = movieList.findIndex((movie) => movie.id === payload);
      console.log(index);
      if (index !== -1) {
        movieList.slice(index);
      }
      state.movieList = movieList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default MovieReducer;
