import Axios from "axios";
import * as yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

// schema to validate add movie
export const movieSchema = yup.object().shape({
  maPhim: yup.string().required("*Field is required"),
  tenPhim: yup.string().required("*Field is required"),
  biDanh: yup.string().required("*Field is required"),
  trailer: yup.string().required("*Field is required"),
  hinhAnh: yup.mixed().required("*Field is required").nullable(),
  // .required("A file is required")
  // .test(
  //   "fileFormat",
  //   "Unsupported Format",
  //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
  // ),

  moTa: yup.string().required("*Field is required"),
  ngayKhoiChieu: yup.date().required("*Field is required").nullable(),
  danhGia: yup.number().integer().positive().default(0),
  maNhom: yup.string().required("*Field is required"),
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
  getShowScheduleInformation(){
    return Axios({
      method:"GET",
      url:`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap`
    })
  }
  getInformationByTheaterCusters(id){
    return Axios({
      method:"GET",
      url:`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`
    })
  }

}


export default MovieService;
