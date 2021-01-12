import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";
import ReactPaginate from "react-paginate";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DeleteIcon from "@material-ui/icons/Delete";
import { Pagination } from "@material-ui/lab";
import React, { memo, useEffect, useState } from "react";
import Toolbar from "../../pages/UserPage/Toolbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieSchedule } from "../../redux/actions/movie.action";
import { nonAccentVietnamese } from "../../utils";
import { Loader } from "../Loader";
function StickyHeadTable() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // set pagination
  const [currentPage, setCurrentPage] = useState(0);


  const MOVIE_PER_PAGE = 10;

  useEffect(() => {
    dispatch(
      getMovieSchedule(
        id,
        () => {
          setLoading(false);
        },
        () => {
          alert("lỗi rồi !");
        }
      )
    );
  }, []);
  const { lichChieu } =
    useSelector((state) => state?.movie?.movieScheduleList) || "";


  const [searchList, setSearchList] = useState(null);

  const handleSearch = (e) => {
    
    let keyword = e.target.value;
    if (keyword) {
      let result = [];

      for (let i in lichChieu) {
        let maHeThongRap = lichChieu[i].thongTinRap.maHeThongRap;

        // convert keyword - tenPhim
        keyword = nonAccentVietnamese(keyword).trim(); //loai bo space du truoc va sau keyword
        maHeThongRap = nonAccentVietnamese(maHeThongRap);

        if (maHeThongRap.indexOf(keyword) !== -1) {
          result.push(lichChieu[i]);
        }
      }
      // console.log(result);
      setSearchList(result);
      
    
    } else {
      setSearchList(null);
    }
  };

  const currentPageData = () => {
    console.log(searchList); 
    if (searchList) {
      return searchList?.slice(offset, offset + MOVIE_PER_PAGE).map((item,index) => (
        <TableRow key={index}>
          <TableCell className="" align="left">
            {item.maLichChieu}
          </TableCell>
          <TableCell className="" align="left">
            {item.thongTinRap.maHeThongRap}
          </TableCell>
          <TableCell className="" align="left">
            {item.thongTinRap.maCumRap}
          </TableCell>
          <TableCell className="" align="left">
            {item.ngayChieuGioChieu}
          </TableCell>
          <TableCell className="" align="left">
            {item.giaVe}
          </TableCell>
          <TableCell className="" align="left">
            {item.thoiLuong}
          </TableCell>
        </TableRow>
      ));
    } else {
      return lichChieu?.slice(offset, offset + MOVIE_PER_PAGE).map((item,index) => (
        <TableRow key={index}>
          <TableCell className="" align="left">
            {item.maLichChieu}
          </TableCell>
          <TableCell className="" align="left">
            {item.thongTinRap.maHeThongRap}
          </TableCell>
          <TableCell className="" align="left">
            {item.thongTinRap.maCumRap}
          </TableCell>
          <TableCell className="" align="left">
            {item.ngayChieuGioChieu}
          </TableCell>
          <TableCell className="" align="left">
            {item.giaVe}
          </TableCell>
          <TableCell className="" align="left">
            {item.thoiLuong}
          </TableCell>
        </TableRow>
      ));
    }
  };
  const pageCount = Math.ceil(lichChieu?.length / MOVIE_PER_PAGE);
  const pageCountList = Math.ceil(searchList?.length / MOVIE_PER_PAGE );
  const offset = currentPage * MOVIE_PER_PAGE;

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };




  if (loading) {
    return <Loader/>
  }

  return (
    <div style={{ padding: "20px" }}>
      <Toolbar   handleSearch={handleSearch} />
      <div style={{ marginTop: "20px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="">Mã Lich Chiếu</TableCell>
                <TableCell className="" align="left">
                  Hệ thông rạp
                </TableCell>
                <TableCell className="" align="left">
                  Cụm Rạp
                </TableCell>
                <TableCell className="" align="left">
                  Ngày giờ chiếu
                </TableCell>

                <TableCell className="" align="left">
                  Thời lượng phim
                </TableCell>
                <TableCell className="" align="left">
                  Giá vé
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{currentPageData()}</TableBody>
          </Table>
        </TableContainer>
      <div style={{marginTop:"20px",display:"flex",justifyContent:"center"}}>
      {!searchList ? (
                <ReactPaginate
                  previousLabel={<NavigateBeforeIcon />}
                  nextLabel={<NavigateNextIcon />}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                  style={{ width: "50%" }}
                />
              ) : (
                <ReactPaginate
                  previousLabel={<NavigateBeforeIcon />}
                  nextLabel={<NavigateNextIcon />}
                  pageCount={pageCountList}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                  style={{ width: "50%" }}
                />
              )}
      </div>
      </div>
    </div>
  );
}

export default memo(StickyHeadTable);
