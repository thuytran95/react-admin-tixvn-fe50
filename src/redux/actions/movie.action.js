import { createAction } from ".";
import { movieService } from "../../service";
import {
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
