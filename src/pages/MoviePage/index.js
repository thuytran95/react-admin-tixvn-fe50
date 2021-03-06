import React, { useEffect, useState } from "react";
import format from "date-format";
import { connect, useDispatch, useSelector } from "react-redux";
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
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Page } from "../../assets/jss/admin-jss/Page";
import { Loader } from "../../components/Loader";
import Toolbar from "./Toolbar";
import {
  actAddMovieRequest,
  actUpdateMovieRequest,
  getMovieListRequest,
} from "../../redux/actions/movie.action";
import MovieCard from "../../components/MovieCard";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { movieSchema } from "../../service/movie.service";
import { Field, Form, Formik, ErrorMessage } from "formik";
import CustomImageInput from "../../components/FormilkCustomLayout/CustomImageInput/CustomImageInput";
import {
  FormikTextField,
  FormikTextFieldMultiline,
} from "../../components/FormilkCustomLayout/FormikTextField";
import { nonAccentVietnamese } from "../../utils";
import styles from "../../assets/jss/admin-jss/pages/moviePageStyle";
import styleCss from "./moviePageStyle.css";
const useStyles = makeStyles(styles);

const MoviePage = (props) => {
  const classes = useStyles();
  const { loading, movieList } = props;

  const movieAdd = useSelector((state) => state.movie.movieAdd);
  const movieUpdate = useSelector((state) => state.movie.movieUpdate);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieListRequest());
  }, [movieAdd, movieUpdate]);

  // xử lý form thêm phimNf
  const [initialValues, setInitialValues] = useState({
    maPhim: 0,
    tenPhim: "",
    biDanh: "",
    trailer: "",
    hinhAnh: undefined,
    moTa: "",
    maNhom: "GP01",
    ngayKhoiChieu: null, // if date is defined as '' yup will throw a invalid date error
    danhGia: 0,
  });

  // handle modal
  const [titleModal, setTitleModal] = useState({ header: "", action: "" });

  // set modal open
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setTitleModal({ header: "Thêm phim", action: "Thêm" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitleModal({ header: "", action: "" });
    setInitialValues({
      maPhim: 0,
      tenPhim: "",
      biDanh: "",
      trailer: "",
      hinhAnh: undefined,
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: null, // if date is defined as '' yup will throw a invalid date error
      danhGia: 0,
    });
  };

  // set show the image when upate movie
  const [image, setImage] = useState(null);

  const handleSubmit = (values) => {
    // console.log(values);
    // console.log(values.hinhAnh.name);

    // chuyen doi sang form data --> yeu cau tren api
    let form_data = new FormData();
    for (let key in values) {
      // format ngay chieu ve dung dinh dang tren api
      if (key === "ngayKhoiChieu") {
        const formatDate = format("dd/MM/yyyy", new Date(values[key]));
        console.log(formatDate);
        form_data.append(key, formatDate);
      } else {
        form_data.append(key, values[key]);
      }
    }
    // console.log(form_data);
    dispatch(actAddMovieRequest(form_data));
    setOpen(false);
  };

  const handleUpdate = (values) => {
    // console.log(values);
    const newValue = { ...values };
    for (let key in values) {
      if (key === "ngayKhoiChieu") {
        const formatDate = format("dd/MM/yyyy", new Date(values[key]));
        newValue.ngayKhoiChieu = formatDate;
      }
    }
    dispatch(actUpdateMovieRequest(newValue));
    setOpen(false);
  };

  const [searchList, setSearchList] = useState(null);

  const handleSearch = (e) => {
    console.log(e.target.value);
    let keyword = e.target.value;
    if (keyword) {
      let result = [];

      for (let i in movieList) {
        let { tenPhim } = movieList[i];

        // convert keyword - tenPhim
        keyword = nonAccentVietnamese(keyword).trim(); //loai bo space du truoc va sau keyword
        tenPhim = nonAccentVietnamese(tenPhim);

        if (tenPhim.indexOf(keyword) !== -1) {
          result.push(movieList[i]);
        }
      }
      // console.log(result);
      setSearchList(result);
    } else {
      setSearchList(null);
    }
  };

  // set pagination
  const [currentPage, setCurrentPage] = useState(0);

  const MOVIE_PER_PAGE = 8;
  const offset = currentPage * MOVIE_PER_PAGE;

  const currentPageData = () => {
    if (searchList) {
      return searchList.map((movie) => (
        <Grid item key={movie.maPhim} lg={3} md={4} sm={6} xs={12}>
          <MovieCard
            className={classes.movieCard}
            movie={movie}
            setInitialValues={setInitialValues}
            setTitleModal={setTitleModal}
            setImage={setImage}
            setOpen={setOpen}
          />
        </Grid>
      ));
    } else {
      return movieList?.slice(offset, offset + MOVIE_PER_PAGE).map((movie) => (
        <Grid item key={movie.maPhim} lg={3} md={4} sm={6} xs={12}>
          <MovieCard
            className={classes.movieCard}
            movie={movie}
            setInitialValues={setInitialValues}
            setTitleModal={setTitleModal}
            setImage={setImage}
            setOpen={setOpen}
          />
        </Grid>
      ));
    }
  };

  const pageCount = Math.ceil(movieList?.length / MOVIE_PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const renderHTML = () => {
    if (loading) return <Loader />;
    if (movieList) {
      return (
        <Page title="Movies" className={classes.root}>
          <Container maxWidth={false}>
            <Toolbar
              handleClickOpen={handleClickOpen}
              handleSearch={handleSearch}
            />
            <Box mt={3}>
              <Grid container spacing={3}>
                {currentPageData()}
              </Grid>
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
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
                ""
              )}
            </Box>
            <Dialog
              className={classes.root}
              fullWidth
              open={open}
              onClose={handleClose}
              scroll="body"
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" className={classes.root}>
                {titleModal.header}
              </DialogTitle>
              <DialogContent>
                <Formik
                  initialValues={initialValues}
                  validationSchema={movieSchema}
                  onSubmit={
                    titleModal.action === "Thêm" ? handleSubmit : handleUpdate
                  }
                >
                  {(formikProps) => {
                    // console.log(formikProps);
                    return (
                      <Form>
                        <Grid container style={{ width: "100%" }} spacing={2}>
                          <Grid item xs={12}>
                            <FormikTextField
                              name="maPhim"
                              label="Mã phim"
                              type="text"
                              onChange={formikProps.handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormikTextField
                              name="tenPhim"
                              label="Tên phim"
                              type="text"
                              onChange={formikProps.handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormikTextField
                              name="biDanh"
                              label="Bí danh"
                              type="text"
                              onChange={formikProps.handleChange}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <FormikTextField
                              name="trailer"
                              label="Trailer"
                              type="text"
                              onChange={formikProps.handleChange}
                            />
                          </Grid>
                          {titleModal.action === "Thêm" ? (
                            <Grid item xs={12}>
                              <div className="form-group">
                                <label>Hình ảnh</label>
                                <Field
                                  name="hinhAnh"
                                  component={CustomImageInput}
                                  tilte="Hình ảnh"
                                  touched={formikProps.touched["file"]}
                                  setFieldValue={formikProps.setFieldValue}
                                  onBlur={formikProps.handleBlur}
                                  errorMessage={
                                    formikProps.errors["hinhAnh"]
                                      ? formikProps.errors["hinhAnh"]
                                      : undefined
                                  }
                                />
                              </div>
                            </Grid>
                          ) : (
                            <Grid
                              item
                              xs={12}
                              style={{ height: "500px", marginBottom: "50px" }}
                            >
                              <Grid item xs={12}>
                                <FormikTextField
                                  name="hinhAnh"
                                  label="Hinh ảnh"
                                  type="text"
                                  disabled
                                  value={null}
                                />
                              </Grid>
                              <img
                                src={image}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Grid>
                          )}

                          <Grid item xs={12}>
                            <FormikTextFieldMultiline
                              rows={3}
                              name="moTa"
                              label="Mô tả"
                              type="text"
                              onChange={formikProps.handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                name="ngayKhoiChieu"
                                label="Ngày khởi chiếu"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                value={formikProps.values.ngayKhoiChieu}
                                onChange={(value) =>
                                  formikProps.setFieldValue(
                                    "ngayKhoiChieu",
                                    value
                                  )
                                }
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                                errorMessage={
                                  formikProps.errors["ngayKhoiChieu"]
                                    ? formikProps.errors["ngayKhoiChieu"]
                                    : undefined
                                }
                              />
                            </MuiPickersUtilsProvider>
                          </Grid>

                          <Grid item xs={12}>
                            <FormikTextField
                              name="danhGia"
                              label="Đánh giá"
                              type="text"
                              onChange={formikProps.handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <div className="form-group text-left">
                              <label>Mã nhóm:</label>
                              <Field
                                as="select"
                                className="form-control"
                                name="maNhom"
                                onChange={formikProps.handleChange}
                              >
                                <option>GP01</option>
                                <option>GP02</option>
                                <option>GP03</option>
                                <option>GP04</option>
                                <option>GP05</option>
                                <option>GP06</option>
                                <option>GP07</option>
                                <option>GP08</option>
                                <option>GP09</option>
                                <option>GP10</option>
                              </Field>
                              <ErrorMessage name="maNhom">
                                {(message) => (
                                  <div className="alert text-danger alert-validation ">
                                    {message}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>
                          </Grid>
                        </Grid>

                        <div className={classes.buttonGroup}>
                          <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                          >
                            {titleModal.action}
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
