import Axios from "axios";
import { createAction } from ".";
import { movieService } from "../../service";
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
  GET_INFOMATION_SHOWTIME_FAILED,
  GET_INFOMATION_BY_THEATER_CLUSTERS_FAILED,
  GET_INFOMATION_BY_THEATER_CLUSTERS_SUCESS,
  CREATE_SCHEDULE_FAILED,
  CREATE_SCHEDULE_SUCESS,
  GET_MOVIE_SCHEDULE_SUCESS,
  GET_MOVIE_SCHEDULE_FAILED,
} from "../constants/movie.constants";
import swal from "sweetalert";

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
        // console.log(err);
        swal("Thông báo!", `${err}`, "error");
        dispatch(createAction(GET_MOVIE_LIST_FAILED, err));
      });
  };
};

export const actAddMovieRequest = (data) => {
  return (dispatch) => {
    movieService
      .addMovie(data)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(ADD_MOVIE_SUCESS, res.data));

        swal("Thông báo!", "Thêm phim thành công !", "success");
      })
      .catch((err) => {
        // console.log(err.response.data);
        // window.alert(err.response.data);
        swal("Thông báo!", `${err.response.data}`, "error");
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
        dispatch(createAction(DELETE_MOVIE_SUCESS, id));

        swal("Thông báo!", "Xóa phim thành công !", "success");
      }
    } catch (err) {
      // console.log(err.response.data);
      console.log(err.response);
      dispatch(createAction(DELETE_MOVIE_FAILED, err));
      if (err.response?.data) {
      
        swal("Thông báo!", `${err.response.data}`, "error");
      } else {
     
        swal("Thông báo!", `${err}`, "error");
      }
    }
  };
};

export const actUpdateMovieRequest = (data) => {
  return async function (dispatch) {
    try {
      const admin = JSON.parse(localStorage.getItem("UserAdmin"));
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim",
        data,
        headers: {
          Authorization: `Bearer ${admin.accessToken}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        console.log(res.data);
        dispatch(createAction(UPDATE_MOVIE_SUCESS, res.data));

        swal("Thông báo!", "Cập nhật phim thành công !", "success");
      }
    } catch (err) {
      console.log(err);
      // window.alert("Cập nhật phim thất bại!");
      dispatch(createAction(UPDATE_MOVIE_FAILED, err));
      // console.log(err.response.data);
      swal("Thông báo!", "Cập nhật phim thất bại !", "error");
    }
  };
};
export const getShowScheduleInformation = (callback, errorCallback) => {
  return (dispatch) => {
    movieService
      .getShowScheduleInformation()
      .then((res) => {
        // console.log(res.data);
        dispatch(createAction(GET_INFOMATION_SHOWTIME_SUCESS, res.data));
        callback();
      })
      .catch((err) => {
        console.log(err);
        dispatch(createAction(GET_INFOMATION_SHOWTIME_FAILED, err));
        errorCallback();
      });
  };
};

export const getInformationByTheaterCluster = (id, callback, errorCallback) => {
  return (dispatch) => {
    movieService
      .getInformationByTheaterCusters(id)
      .then((res) => {
        dispatch(
          createAction(GET_INFOMATION_BY_THEATER_CLUSTERS_SUCESS, res.data)
        );
        callback();
      })
      .catch((err) => {
        // console.log(err);
        dispatch(createAction(GET_INFOMATION_BY_THEATER_CLUSTERS_FAILED, err));
        errorCallback();
      });
  };
};

export const actCreateMovieSchedule = (data) => {
  return async function (dispatch) {
    try {
      const admin = JSON.parse(localStorage.getItem("UserAdmin"));
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
        data,
        headers: {
          Authorization: `Bearer ${admin.accessToken}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        dispatch(createAction(CREATE_SCHEDULE_SUCESS, res.data));
        swal("Thông báo!", "Thêm lich thành công !", "success");
      }
    } catch (err) {
      console.log(err.response.data);
      dispatch(createAction(CREATE_SCHEDULE_FAILED, err));
      swal("Thông báo!", "Thêm lich thất bại !", "error");
    }
  };
};
export const getMovieSchedule = (id, callback, erroCallback) => {
  return (dispatch) => {
    movieService
      .getMovieSchedule(id)
      .then((res) => {
        // console.log(res.data);
        dispatch(createAction(GET_MOVIE_SCHEDULE_SUCESS, res.data));
        callback();
      })
      .catch((err) => {
        console.log(err);
        dispatch(createAction(GET_MOVIE_SCHEDULE_FAILED, err));
        erroCallback();
      });
  };
};
