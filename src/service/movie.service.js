import Axios from "axios";
class MovieService {
  getMovieList() {
    return Axios({
      method: "GET",
      url:
        " https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10",
    });
  }
}

export default MovieService;
