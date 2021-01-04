import {
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILED,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILED,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  DELETE_USER_SUCCESS,
} from "../constants/user.constants.js";

const initialState = {
  loading: false,
  userList: null,
  err: null,
  admin: null,
  errLogin: null,
  errAdd: null,
};

const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOGIN_REQUEST: {
      return { ...state, loading: true };
    }
    case ADMIN_LOGIN_SUCCESS: {
      return { ...state, loading: false, admin: payload };
    }
    case ADMIN_LOGIN_FAILED:
      return { ...state, loading: false, admin: null, errLogin: payload };
    case GET_USER_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case GET_USER_LIST_SUCCESS: {
      return { ...state, loading: false, userList: payload };
    }
    case GET_USER_LIST_FAILED: {
      return { ...state, loading: false, userList: null, err: payload };
    }

    case ADD_USER_SUCCESS: {
      const userList = state.userList;

      userList.push(payload);
      state.userList = userList;
      return { ...state };
    }
    case ADD_USER_FAILED: {
      return { ...state, errAdd: payload };
    }
    case DELETE_USER_SUCCESS: {
      let userList = state.userList;
      userList = userList.filter((item) => item.taiKhoan !== payload);
      state.userList = userList;
      // console.log(state.userList);

      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default UserReducer;
