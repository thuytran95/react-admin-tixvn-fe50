import { createAction } from ".";
import { userService } from "../../service";
import Axios from "axios";
import {
  GET_USER_LIST_FAILED,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_REQUEST,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILED,
  ADMIN_CLEAR_DATA,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "../constants/user.constants.js";
import setHeaders from "../../utils/setHeaders";
import swal from "sweetalert";
export const getUserListRequest = () => {
  return (dispatch) => {
    dispatch(createAction(GET_USER_LIST_REQUEST));
    userService
      .getUserList()
      .then((res) => {
        // console.log(res.data);
        dispatch(createAction(GET_USER_LIST_SUCCESS, res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(createAction(GET_USER_LIST_FAILED, err));
      });
  };
};

export const actLoginApi = (admin, history) => {
  return (dispatch) => {
    dispatch(createAction(ADMIN_LOGIN_REQUEST));
    userService
      .logIn(admin)
      .then((res) => {
        dispatch(createAction(ADMIN_LOGIN_SUCCESS, res.data));
        if (res.data.maLoaiNguoiDung === "QuanTri") {
          // setheader token
          setHeaders(res.data.accessToken);
          // luu trang thai login
          localStorage.setItem("UserAdmin", JSON.stringify(res.data));

          // redirect qua home
          history.replace("/");
        } else {
          return Promise.reject({
            response: { data: "Bạn không có quyền truy cập!" },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(createAction(ADMIN_LOGIN_FAILED, err));
      });
  };
};

export const actLogout = (history) => {
  localStorage.removeItem("UserAdmin");
  // chuyen huong ve trang login
  history.push("/login");
  return { type: ADMIN_CLEAR_DATA };
};

export const actTryLogin = (history) => {
  return (dispatch) => {
    if (!localStorage.getItem("UserAdmin")) {
      history.push("/login");
      return;
    }
    const admin = JSON.parse(localStorage.getItem("UserAdmin"));
    setHeaders(admin.accessToken);
    dispatch(createAction(ADMIN_LOGIN_SUCCESS, admin));
  };
};

export const actAddUserRequest = (data) => {
  return async function (dispatch) {
    try {
      const admin = JSON.parse(localStorage.getItem("UserAdmin"));
      const res = await Axios({
        method: "POST",
        url:
          "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
        data,
        headers: {
          Authorization: `Bearer ${admin.accessToken}`,
        },
      });

      if (res.status === 200 || res.statu === 201) {
        dispatch(createAction(ADD_USER_SUCCESS, data));

        swal("Thông báo!", "Thêm người dùng thành công !", "success");
      }
    } catch (error) {
      console.log(error);
    
      swal("Thông báo!", `${error.response.data}`, "error");
      dispatch(createAction(ADD_USER_FAILED, error));
    }
  };
};

export const actDeleteUserRequest = (data) => {
  return async function (dispatch) {
    try {
      const admin = JSON.parse(localStorage.getItem("UserAdmin"));
      const res = await Axios({
        method: "DELETE",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${data}`,
        headers: {
          Authorization: `Bearer ${admin.accessToken}`,
        },
      });
      if (res.status === 200 || res.status === 201) {
    
        swal("Thông báo!", "Xóa thành công !", "success");
        dispatch(createAction(DELETE_USER_SUCCESS, data));
      }
    } catch (err) {
      // console.log(err);
      swal("Thông báo!", `${err.response.data}`, "error");
      dispatch(createAction(DELETE_USER_FAILED, err));
    }
  };
};

export const actUpdateUserRequest = (data) => {
  return async function (dispatch) {
    try {
      const admin = JSON.parse(localStorage.getItem("UserAdmin"));
      const res = await Axios({
        method: "PUT",
        url:
          "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        headers: {
          Authorization: `Bearer ${admin.accessToken}`,
        },
        data,
      });

      if (res.status === 200 || res.status === 201) {
        swal("Thông báo!", "Cập nhật thành công !", "success");
        dispatch(createAction(UPDATE_USER_SUCCESS, res.data));
      }
    } catch (err) {
      swal("Thông báo!", `${err.response.data}`, "error");
      dispatch(createAction(UPDATE_USER_FAILED, err));
    }
  };
};
