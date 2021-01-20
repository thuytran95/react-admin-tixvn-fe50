import Axios from "axios";
import * as yup from "yup";
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

// schema to validate add movie
export const movieSchema = yup.object().shape({
  maPhim: yup.string().required("*Trường này bắt buộc nhập"),
  tenPhim: yup.string().required("*Trường này bắt buộc nhập"),
  biDanh: yup.string().required("*Trường này bắt buộc nhập"),
  trailer: yup.string().required("*Trường này bắt buộc nhập"),
  hinhAnh: yup.mixed().required("*Trường này bắt buộc nhập").nullable(),

  moTa: yup.string().required("*Trường này bắt buộc nhập"),
  ngayKhoiChieu: yup.date().required("*Trường này bắt buộc nhập").nullable(),
  danhGia: yup.number().integer().default(0),
  maNhom: yup.string().required("*Trường này bắt buộc nhập"),
});

export const scheduleSchema = yup.object().shape({
  maHeThongRap: yup.string().required("*Trường này bắt buộc nhập"),
  maCumRap: yup.string().required("*Trường này bắt buộc nhập"),
  maRap: yup.string().required("*Trường này bắt buộc nhập"),
  ngayChieuGioChieu: yup
    .date()
    .required("*Trường này bắt buộc nhập")
    .nullable(),
  thoiLuong: yup.number().required("*Trường này bắt buộc nhập"),
  giaVe: yup.number().required("*Trường này bắt buộc nhập"),
});

class MovieService {
  getMovieList() {
    return Axios({
      method: "GET",
      url:
        " https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10",
    });
  }

  addMovie(data) {
    return Axios({
      method: "POST",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
      data,
    });
  }
  getShowScheduleInformation() {
    return Axios({
      method: "GET",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap`,
    });
  }
  getInformationByTheaterCusters(id) {
    return Axios({
      method: "GET",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`,
    });
  }
  getMovieSchedule(id) {
    return Axios({
      method: "GET",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    });
  }
}

export default MovieService;
