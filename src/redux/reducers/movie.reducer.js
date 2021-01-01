import {
  GET_MOVIE_LIST_FAILED,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCESS,
} from "../constants/movie.constants";

const initialState = {
  loading: false,
  movieList: null,
  err: null,
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
    default:
      return { ...state };
  }
};

export default MovieReducer;
