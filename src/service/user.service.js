import Axios from "axios";
import * as yup from "yup";

// schema do minh tao ra de validation du lieu thu duoc tu form
export const signUpUserSchema = yup.object().shape({
  taiKhoan: yup.string().required("*Field is required"),
  matKhau: yup.string().required("*Field is required"),
  hoTen: yup.string().required("*Field is required"),
  email: yup.string().required("*Field is required").email("*Email is invalid"),
  soDt: yup
    .string()
    .required("*Field is required")
    .matches(/^[0-9]+$/), //viet bieu thuc chinh quy phai viet lien, khong co dau cach giua cac ky tu
  maNhom: yup.string().required("*Field is required"),
  maLoaiNguoiDung: yup.string().required("*Field is required"),
});

class UserService {
  signUp(data) {
    return Axios({
      method: "POST",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      data,
    });
  }

  logIn(data) {
    return Axios({
      method: "POST",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data,
    });
  }

  getUserList() {
    return Axios({
      method: "GET",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP10",
    });
  }
  addUser(data) {
    return Axios({
      method: "POST",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      data,
    });
  }
}

export default UserService;
