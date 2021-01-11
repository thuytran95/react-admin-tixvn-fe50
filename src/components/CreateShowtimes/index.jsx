import React, { useState, useEffect, memo } from "react";
import format from "date-format";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import StickyHeadTable from "../StickyHeadTable";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  getShowScheduleInformation,
  getInformationByTheaterCluster,
  createSchedule,
} from "../../redux/actions/movie.action";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import StickyHeadTable from "../StickyHeadTable";

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxHeight: "90vh",
    maxWidth: "90vh",

    overflowY: "overlay",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
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

  const handleSelectMaHeThongRap = (event) => {
    setMaHeThong(event.target.value);
  };

  const handleSelectMaCumRap = (event) => {
    setMaCumR(event.target.value);
  };
  useEffect(() => {
    if (maHeThong) {
      dispatch(
        getInformationByTheaterCluster(
          maHeThong,
          () => {
            setLoading(false);
          },
          () => {
            alert("lỗi rồi");
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
  // const listRap = listCumRap
  //   .filter((item) => item.maCumRap === maCumR)
  //   .map((item) => item.danhSachRap);

  // console.log(listRap, "1234");

  // set initialvalue in formik
  const [initialValue, setInitialValue] = useState({
    maHeThongRap: "",
    maCumRap: "",
    maRap: "",
    ngayChieuGioChieu: "",
    thoiLuong: "",
    maNhom: "",
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
      maRap: "",
      ngayChieuGioChieu: "",
      thoiLuong: "",
      maNhom: "",
      giaVe: "",
    });
  };

  const renderHtml = () => {
    return (
      <Formik
        initialValues={initialValue}
        onSubmit={({ ngayChieuGioChieu, maRap, giaVe }) => {
          // format lich chieu ve dinh dang tren api yeu cau
          const formatDate = format("dd/MM/yyyy", new Date(ngayChieuGioChieu));
          let dataTaoLich = {
            maPhim,
            ngayChieuGioChieu: formatDate,
            maRap,
            giaVe,
          };
          console.log(JSON.stringify(dataTaoLich, null, 2));
          // dispatch(createSchedule(JSON.stringify(dataTaoLich, null, 2),()=>{setLoading(false)},()=>{alert('lỗi rồi !')}))
        }}
        validationSchema={ShowTimeSchema}
        render={({ handleChange }) => {
          return (
            <Form style={{ width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <FormControl
                      className={classes.input}
                      fullWidth
                      margin="normal"
                    >
                      <InputLabel>Chọn hệ thống rạp</InputLabel>
                      <Select
                        onChange={handleSelectMaHeThongRap}
                        name="maHeThongRap"
                      >
                        {listHeThongRapChieu.map((item, index) => (
                          <MenuItem key={index} value={item.maHeThongRap}>
                            {item.maHeThongRap}
                          </MenuItem>
                        ))}

                        {/* <MenuItem value="advance">Advance</MenuItem>
                        <MenuItem value="enterprise">Enterprise</MenuItem> */}
                      </Select>
                      <FormHelperText className={classes.errors}>
                        <ErrorMessage name="maHeThongRap" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      className={classes.input}
                      fullWidth
                      margin="normal"
                    >
                      <InputLabel>Chọn mã cụm rạp</InputLabel>
                      <Select
                        disabled={maHeThong ? false : true}
                        onChange={handleSelectMaCumRap}
                        name="maCumRap"
                      >
                        {listCumRap?.map((item, index) => (
                          <MenuItem key={index} value={item.maCumRap}>
                            {item.tenCumRap}
                          </MenuItem>
                        ))}

                        {/* <MenuItem value="advance">Advance</MenuItem>
                        <MenuItem value="enterprise">Enterprise</MenuItem> */}
                      </Select>
                      <FormHelperText className={classes.errors}>
                        <ErrorMessage name="maCumRap" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      className={classes.input}
                      fullWidth
                      margin="normal"
                    >
                      <InputLabel>Mã Rạp</InputLabel>
                      <Select
                        disabled={maCumR ? false : true}
                        onChange={handleChange}
                        name="maRap"
                      >
                        {listRaps?.map((item, index) => (
                          <MenuItem key={index} value={item.maRap}>
                            {item.maRap}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText className={classes.errors}>
                        <ErrorMessage name="maRap" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <FormControl className={classes.input} fullWidth>
                      <TextField
                        id="datetime-local"
                        label="Chọn ngày giờ chiếu"
                        type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
                        name="ngayChieuGioChieu"
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <FormHelperText className={classes.errors}>
                        <ErrorMessage name="ngayChieuGioChieu" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.input} fullWidth>
                      <TextField
                        label="Chọn thời lượng phim"
                        variant="outlined"
                        name="thoiLuong"
                        type="number"
                        onChange={handleChange}
                      />
                      <FormHelperText className={classes.errors}>
                        <ErrorMessage name="thoiLuong" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.input} fullWidth>
                      <TextField
                        label="Mã nhóm mặc định"
                        variant="outlined"
                        name="maNhom"
                        value={maNhom}
                        disabled
                        onChange={handleChange}
                      />
                      <FormHelperText className={classes.errors}>
                        <ErrorMessage name="maNhom" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.input} fullWidth>
                      <TextField
                        label="Giá vé"
                        variant="outlined"
                        type="number"
                        name="giaVe"
                        onChange={handleChange}
                      />
                      <FormHelperText className={classes.errors}>
                        <ErrorMessage name="giaVe" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <FormControl className={classes.input} fullWidth>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ fontSize: "10px" }}
                  >
                    Thêm lich chiếu
                  </Button>
                </FormControl>
              </Grid>
            </Form>
          );
        }}
      />
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
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle
            style={{ textAlign: "center" }}
            ogTitle
            id="scroll-dialog-title"
          >
            Thông tin lịch chiếu phim của phim : {tenPhim} {maPhim}
          </DialogTitle>

          <DialogContent style={{ overflowY: "hidden" }}>
            <Grid container spacing={3}>
              {renderHtml()}

              <Grid item xs={12}>
                <StickyHeadTable />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
export default memo(CreateShowtimes);
