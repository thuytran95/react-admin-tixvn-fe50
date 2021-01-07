import Axios from "axios";
import { createAction } from ".";
import { movieService } from "../../service";
import {
  ADD_MOVIE_FAILED,
  ADD_MOVIE_SUCESS,
  DELETE_MOVIE_SUCESS,
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
        window.alert("Thêm phim thành công");
      })
      .catch((err) => {
        // console.log(err.response.data);
        window.alert(err.response.data);
        dispatch(createAction(ADD_MOVIE_FAILED, err));
      });
  };
};

export const actDeleteMovieRequest = (id) => {
  return async function (dispatch) {
    try {
      const admin = JSON.parse(localStorage.getItem("UserAdmin"));
      const res = await Axios({
        method: "DELETE",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${id}`,
        headers: {
          Authorization: `Bearer ${admin.accessToken}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        // console.log(res.data);
        dispatch(DELETE_MOVIE_SUCESS, id);
        window.alert("Xóa phim thành công!");
      }
    } catch (err) {
      // console.log(err.response.data);
      window.alert(err.response.data);
    }
  };
};
