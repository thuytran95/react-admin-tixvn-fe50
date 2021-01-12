import {
  ADD_MOVIE_FAILED,
  ADD_MOVIE_SUCESS,
  DELETE_MOVIE_FAILED,
  DELETE_MOVIE_SUCESS,
  GET_MOVIE_LIST_FAILED,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCESS,
  UPDATE_MOVIE_FAILED,
  UPDATE_MOVIE_SUCESS,
  GET_INFOMATION_SHOWTIME_SUCESS,
  GET_INFOMATION_BY_THEATER_CLUSTERS_SUCESS,
  CREATE_SCHEDULE_SUCESS,
  CREATE_SCHEDULE_FAILED,
} from "../constants/movie.constants";

const initialState = {
  loading: false,
  movieList: null,
  err: null,
  movieAdd: null,
  movieDelete: null,
  movieUpdate: null,
  newSchedule: null,
  errAdd: null,
  errDelete: null,
  errUpdate: null,
  errCreateSchedule: null,
  infomatinShowTime: "",
  cinemaInformationTheater: null,
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
      return { ...state, movieAdd: payload };
    }
    case ADD_MOVIE_FAILED:
      return { ...state, movie: null, errAdd: payload };
    case DELETE_MOVIE_SUCESS: {
      // tim vi tri phan tu xoa
      let movieList = state.movieList;
      movieList = movieList.filter((item) => item.maPhim !== payload);
      state.movieList = movieList;
      return { ...state };
    }
    case DELETE_MOVIE_FAILED:
      return { ...state, errDelete: payload };
    case UPDATE_MOVIE_SUCESS:
      return { ...state, movieUpdate: payload };
    case UPDATE_MOVIE_FAILED:
      return { ...state, errUpdate: payload };
    case GET_INFOMATION_SHOWTIME_SUCESS:
      return { ...state, infomatinShowTime: payload };
    case GET_INFOMATION_BY_THEATER_CLUSTERS_SUCESS:
      return { ...state, cinemaInformationTheater: payload };
    case CREATE_SCHEDULE_SUCESS:
      return { ...state, newSchedule: payload };
    case CREATE_SCHEDULE_FAILED:
      return { ...state, errCreateSchedule: payload };

    default:
      return { ...state };
  }
};

export default MovieReducer;
