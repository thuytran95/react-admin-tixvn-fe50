import { createAction } from ".";
import { userService } from "../../service";
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
} from "../constants/user.constants.js";
import setHeaders from "../../utils/setHeaders";

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

export const addUserRequest = (data) => {
  return (dispatch) => {
    userService
      .addUser(data)
      .then((res) => {
        if (!localStorage.getItem("UserAdmin")) {
          return;
        }
        const admin = JSON.parse(localStorage.getItem("UseAdmin"));
        setHeaders(admin.accessToken);
        console.log(res);
        dispatch(createAction(ADD_USER_SUCCESS, res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(createAction(ADD_USER_FAILED, err));
      });
  };
};
