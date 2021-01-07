import Axios from "axios";
import { createAction } from ".";
import { movieService } from "../../service";
import {
  ADD_MOVIE_FAILED,
  ADD_MOVIE_SUCESS,
  GET_MOVIE_LIST_FAILED,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCESS,
} from "../constants/movie.constants";

export const getMovieListRequest = () => {
  return (dispatch) => {
    dispatch(createAction(GET_MOVIE_LIST_REQUEST));
    movieService
      .getMovieList()
      .then((res) => {
        // console.log(res.data);
        dispatch(createAction(GET_MOVIE_LIST_SUCESS, res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(createAction(GET_MOVIE_LIST_FAILED, err));
      });
  };
};

export const actAddMovieRequest = (data) => {
  return (dispatch) => {
    movieService
      .addMovie(data)
      .then((res) => {
        console.log(res);
        dispatch(createAction(ADD_MOVIE_SUCESS, data));
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch(createAction(ADD_MOVIE_FAILED, err));
      });
  };
};
