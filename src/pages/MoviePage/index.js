import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import {
  Box,
  Button,
  colors,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Page } from "../../assets/jss/admin-jss/Page";
import { Loader } from "../../components/Loader";
import Toolbar from "./Toolbar";
import { getMovieListRequest } from "../../redux/actions/movie.action";
import MovieCard from "../../components/MovieCard";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { movieSchema } from "../../service/movie.service";
import {
  FormikTextField,
  FormikTextFieldMultiline,
} from "../../components/FormilkCustomLayout/FormikTextField";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { FormikSelect } from "../../components/FormilkCustomLayout/FormikSelect";
import { dataSelect } from "../UserPage/dataSelect";
import styles from "../../assets/jss/admin-jss/pages/moviePageStyle";
import styleCss from "./moviePageStyle.css";
import CustomImageInput from "../../components/FormilkCustomLayout/CustomImageInput/CustomImageInput";

const useStyles = makeStyles(styles);

const MoviePage = (props) => {
  const classes = useStyles();
  const { loading, movieList } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieListRequest());
  }, []);

  // set modal open

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // set pagination
  const [currentPage, setCurrentPage] = useState(0);

  const MOVIE_PER_PAGE = 8;
  const offset = currentPage * MOVIE_PER_PAGE;
  const currentPageData = movieList
    ?.slice(offset, offset + MOVIE_PER_PAGE)
    .map((movie) => (
      <Grid item key={movie.maPhim} lg={3} md={4} sm={6} xs={12}>
        <MovieCard className={classes.movieCard} movie={movie} />
      </Grid>
    ));

  const pageCount = Math.ceil(movieList?.length / MOVIE_PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  // xử lý form thêm phim
  const [initialValues, setInitialValues] = useState({
    maPhim: 0,
    tenPhim: "",
    biDanh: "",
    trailer: "",
    hinhAnh: {},
    moTa: "",
    maNhom: "GP01",
    ngayKhoiChieu: "",
    danhGia: 0,
  });
  const handleSubmit = (values) => {
    console.log(values);
    console.log(values.hinhAnh);
  };

  const renderHTML = () => {
    if (loading) return <Loader />;
    if (movieList) {
      return (
        <Page title="Movies" className={classes.root}>
          <Container maxWidth={false}>
            <Toolbar handleClickOpen={handleClickOpen} />
            <Box mt={3}>
              <Grid container spacing={3}>
                {currentPageData}
              </Grid>
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
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
              />
            </Box>
            <Dialog
              fullWidth
              open={open}
              onClose={handleClose}
              scroll="body"
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" className={classes.root}>
                Thêm phim
              </DialogTitle>
              <DialogContent>
                <Formik
                  initialValues={{
                    maPhim: 0,
                    tenPhim: "",
                    biDanh: "",
                    trailer: "",
                    hinhAnh: undefined,
                    moTa: "",
                    maNhom: "GP01",
                    ngayKhoiChieu: "",
                    danhGia: 0,
                  }}
                  validationSchema={movieSchema}
                  onSubmit={handleSubmit}
                >
                  {(formikProps) => {
                    // console.log(formikProps);
                    return (
                      <Form>
                        <div className="form-group">
                          <label>Mã phim</label>
                          <Field
                            name="maPhim"
                            className="form-control"
                            onChange={formikProps.handleChange}
                          />
                          <ErrorMessage name="maPhim">
                            {(message) => (
                              <div className="alert text-danger alert-validation ">
                                {message}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label>Tên phim</label>
                          <Field
                            name="tenPhim"
                            className="form-control"
                            onChange={formikProps.handleChange}
                          />
                          <ErrorMessage name="tenPhim">
                            {(message) => (
                              <div className="alert text-danger alert-validation ">
                                {message}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label>Bí danh</label>
                          <Field
                            name="biDanh"
                            className="form-control"
                            onChange={formikProps.handleChange}
                          />
                          <ErrorMessage name="biDanh">
                            {(message) => (
                              <div className="alert text-danger alert-validation ">
                                {message}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label>Trailer</label>
                          <Field
                            name="trailer"
                            className="form-control"
                            onChange={formikProps.handleChange}
                          />
                          <ErrorMessage name="trailer">
                            {(message) => (
                              <div className="alert text-danger alert-validation ">
                                {message}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label>Hình ảnh</label>
                          <Field
                            name="hinhAnh"
                            component={CustomImageInput}
                            tilte="Hình ảnh"
                            touched={formikProps.touched["file"]}
                            setFieldValue={formikProps.setFieldValue}
                            onBlur={formikProps.handleBlur}
                          />
                          <ErrorMessage name="hinhAnh">
                            {(message) => (
                              <div className="alert text-danger alert-validation ">
                                {message}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label>Mô tả</label>
                          <Field
                            as="textarea"
                            name="moTa"
                            type="text"
                            className="form-control"
                            onChange={formikProps.handleChange}
                          />
                          <ErrorMessage name="moTa">
                            {(message) => (
                              <div className="alert text-danger alert-validation ">
                                {message}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label>Ngày khởi chiếu</label>
                          <Field
                            type="text"
                            name="ngayKhoiChieu"
                            className="form-control"
                            onChange={formikProps.handleChange}
                          />
                          <ErrorMessage name="ngayKhoiChieu">
                            {(message) => (
                              <div className="alert text-danger alert-validation ">
                                {message}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label>Mã nhóm</label>
                          <Field
                            name="maNhom"
                            value="GP01"
                            className="form-control"
                            onChange={formikProps.handleChange}
                          />
                          <ErrorMessage name="maNhom">
                            {(message) => (
                              <div className="alert text-danger alert-validation ">
                                {message}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>

                        {/* <Grid container style={{ width: "100%" }} spacing={2}>
                          <Grid item xs={12}>
                            <FormikTextField
                              name="maPhim"
                              label="Mã phim"
                              type="text"
                              onChange={formikProps.onChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormikTextField
                              onChange={formikProps.onChange}
                              name="tenPhim"
                              label="Tên phim"
                              type="text"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormikTextField
                              onChange={formikProps.onChange}
                              name="biDanh"
                              label="Bí danh"
                              type="text"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormikTextField
                              onChange={formikProps.onChange}
                              name="trailer"
                              label="Trailer"
                              type="text"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormikTextField
                              onChange={formikProps.onChange}
                              name="hinhAnh"
                              label="Hình ảnh"
                              type="file"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormikTextFieldMultiline
                              onChange={formikProps.onChange}
                              name="moTa"
                              label="Mô tả"
                              type="text"
                              multiline
                              rows={4}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormikTextField
                              onChange={formikProps.onChange}
                              name="ngayKhoiChieu"
                              label="Ngày khởi chiếu"
                              type="text"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormikTextField
                              onChange={formikProps.onChange}
                              name="danhGia"
                              label="Đánh giá"
                              type="number"
                            />
                          </Grid>
                        </Grid>

                        <FormikSelect
                          onChange={formikProps.onChange}
                          name="maNhom"
                          items={dataSelect}
                          label="Mã nhóm"
                          required
                        /> */}

                        <div className={classes.buttonGroup}>
                          <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                          >
                            Thêm
                          </Button>
                          <Button
                            style={{
                              marginLeft: 10,
                              backgroundColor: colors.red[500],
                              color: "white",
                            }}
                            variant="contained"
                            onClick={handleClose}
                          >
                            Thoát
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </DialogContent>
            </Dialog>
          </Container>
        </Page>
      );
    }
  };

  return <>{renderHTML()}</>;
};

const mapStateToProps = (state) => {
  return { loading: state.movie.loading, movieList: state.movie.movieList };
};

export default connect(mapStateToProps)(MoviePage);
