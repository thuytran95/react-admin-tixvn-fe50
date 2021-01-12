import React, { useState, useEffect, memo } from "react";
import format from "date-format";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  colors,
  Box,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import StickyHeadTable from "../StickyHeadTable";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  getShowScheduleInformation,
  getInformationByTheaterCluster,
  createSchedule,
  actCreateMovieSchedule,
} from "../../redux/actions/movie.action";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { FormikTextField } from "../FormilkCustomLayout/FormikTextField";
import { scheduleSchema } from "../../service/movie.service";
// import StickyHeadTable from "../StickyHeadTable";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    "& .MuiTypography-h6": {
      fontSize: "24px",
      color: theme.palette.primary.main,
      textTransform: "uppercase",
      textAlign: "center",
    },
    "& .MuiFormHelperText-contained": {
      color: colors.red[500],
      fontSize: "16px",
    },
  },

  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "60%",
  },
  input: {
    margin: "20px 0",
  },
  errors: {
    color: "red",
  },
}));

const ShowTimeSchema = Yup.object().shape({
  // maHeThongRap: Yup.string().required("Required"),
  // maCumRap: Yup.string().required("Required"),
  maRap: Yup.string().required("Required"),
  ngayChieuGioChieu: Yup.string().required("Required"),
  thoiLuong: Yup.string().required("Required"),
  giaVe: Yup.string().required("Required"),
});
function CreateShowtimes({ maNhom, maPhim, tenPhim }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [maHeThong, setMaHeThong] = useState(null);
  const [maCumR, setMaCumR] = useState(null);
  const [listRaps, setListRaps] = useState([]);
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem("UserAdmin"));

  const listHeThongRapChieu =
    useSelector((state) => state?.movie?.infomatinShowTime) || "";

  useEffect(() => {
    dispatch(
      getShowScheduleInformation(
        () => {
          setLoading(false);
        },
        () => {
          alert("lỗi rồi");
        }
      )
    );
  }, [open]);

  useEffect(() => {
    if (maHeThong) {
      dispatch(
        getInformationByTheaterCluster(
          maHeThong,
          () => {
            setLoading(false);
          },
          () => {
            alert("Lỗi hệ thống");
          }
        )
      );
    }
  }, [maHeThong]);

  const listCumRap =
    useSelector((state) => state?.movie?.cinemaInformationTheater) || [];

  useEffect(() => {
    const listRap = listCumRap
      .filter((item) => item.maCumRap === maCumR)
      .map((item) => item.danhSachRap);
    setListRaps(...listRap);
  }, [maCumR]);

  const [initialValue, setInitialValue] = useState({
    maHeThongRap: "",
    maCumRap: "",
    maRap: "",
    ngayChieuGioChieu: null,
    thoiLuong: "",
    maPhim: maPhim,
    giaVe: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInitialValue({
      maHeThongRap: "",
      maCumRap: "",
      maRap: 0,
      ngayChieuGioChieu: null,
      thoiLuong: 0,
      maPhim: maPhim,
      giaVe: 0,
    });
  };

  const handleSubmit = ({ maRap, ngayChieuGioChieu, giaVe, maPhim }) => {
    // console.log(values);
    const formatDate = format(
      "dd/MM/yyyy hh:mm:ss",
      new Date(ngayChieuGioChieu)
    );

    const data = { maRap, ngayChieuGioChieu: formatDate, giaVe, maPhim };
    console.log(data);
    dispatch(actCreateMovieSchedule(data));
    setOpen(false);
  };

  const renderHtml = () => {
    return (
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={scheduleSchema}
      >
        {(formikProps) => {
          // console.log(formikProps);
          return (
            <Form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <div className="form-group text-left">
                    <label>Mã hệ thống rạp</label>
                    <Field
                      as="select"
                      className="form-control"
                      name="maHeThongRap"
                      onChange={(e) => {
                        setMaHeThong(e.target.value);
                        formikProps.setFieldValue(
                          "maHeThongRap",
                          e.target.value
                        );
                      }}
                    >
                      <option value="">Chọn mã hệ thống rạp</option>
                      {listHeThongRapChieu?.map((item, index) => (
                        <option key={index} value={item.maHeThongRap}>
                          {item.maHeThongRap}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="maHeThongRap">
                      {(message) => (
                        <div className="alert text-danger alert-validation ">
                          {message}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <div className="form-group text-left">
                    <label>Mã cụm rạp</label>
                    <Field
                      as="select"
                      className="form-control"
                      name="maCumRap"
                      onChange={(e) => {
                        setMaCumR(e.target.value);
                        formikProps.setFieldValue("maCumRap", e.target.value);
                      }}
                    >
                      <option value="">Chọn mã cụm rạp</option>

                      {listCumRap?.map((item, index) => (
                        <option key={index} value={item.maCumRap}>
                          {item.tenCumRap}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="maCumRap">
                      {(message) => (
                        <div className="alert text-danger alert-validation ">
                          {message}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <div className="form-group text-left">
                    <label>Mã rạp</label>
                    <Field
                      as="select"
                      className="form-control"
                      name="maRap"
                      onChange={formikProps.handleChange}
                    >
                      <option value="">Chọn mã rạp</option>
                      {listRaps?.map((item, index) => (
                        <option key={index} value={item.maRap}>
                          {item.maRap}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="maRap">
                      {(message) => (
                        <div className="alert text-danger alert-validation ">
                          {message}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    style={{ marginTop: "10px" }}
                    name="maPhim"
                    label="Mã phim"
                    type="text"
                    value={formikProps.values.maPhim}
                    disabled
                    onChange={formikProps.onChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      name="ngayChieuGioChieu"
                      label="Ngày chiếu giờ chiếu"
                      inputVariant="outlined"
                      format="dd/MM/yyyy hh:mm"
                      value={formikProps.values.ngayChieuGioChieu}
                      onChange={(value) =>
                        formikProps.setFieldValue("ngayChieuGioChieu", value)
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      helperText={
                        formikProps.errors["ngayChieuGioChieu"]
                          ? formikProps.errors["ngayChieuGioChieu"]
                          : undefined
                      }
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={12}>
                  <FormikTextField
                    name="thoiLuong"
                    label="Thời lượng"
                    type="number"
                    onChange={formikProps.onChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormikTextField
                    name="giaVe"
                    label="Giá vé"
                    type="number"
                    onChange={formikProps.onChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ fontSize: "10px" }}
              >
                Thêm lich chiếu
              </Button>
            </Form>
          );
        }}
      </Formik>
    );
  };
  return (
    <>
      <div>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleOpen}
          style={{ fontSize: "10px", outline: "none", border: "none" }}
        >
          Tạo lịch chiếu
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          scroll="body"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          className={classes.root}
        >
          <DialogTitle id="scroll-dialog-title">
            Tạo lịch chiếu phim
            <br />
            {tenPhim}
          </DialogTitle>

          <DialogContent style={{ overflowY: "hidden" }}>
            <Box spacing={3}>
              {renderHtml()}

            
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
export default memo(CreateShowtimes);
