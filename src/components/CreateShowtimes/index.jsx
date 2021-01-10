import React, { useState } from "react";
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
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import StickyHeadTable from "../StickyHeadTable";
import { Formik, Form, Field } from "formik";
// import StickyHeadTable from "../StickyHeadTable";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
}));
export default function CreateShowtimes() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectHeThongRap, setSelectheThongRap] = useState("");
  const [selectMaCumRap, setSelectMaCumRap] = useState("");
  const [selectMaRap, setSelectMaRap] = useState("");

  const updateSelectHeThongRap = (e)=>{
      setSelectheThongRap(e.target.value)
     
      
  }
  const updateSelectMaCumRap = (e)=>{
    setSelectMaCumRap(e.target.value)
}

const updateSelectMaRap = (e)=>{
    setSelectMaRap(e.target.value)
}



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // set initialvalue in formik
  const [initialValue, setInitialValue] = useState({
    maHeThongRap: "",
    maCumRap: "",
    maRap: "",
    ngayChieuGioChieu: "",
    thoiLuong: "GP01",
    maNhom: "",
    giaVe: "",
  });

  const renderHtml = () => {
    return (
      <Formik
        initialValues={{
          maHeThongRap: "",
          maCumRap: "",
          maRap: "",
          ngayChieuGioChieu: "",
          thoiLuong: "",
          maNhom: "",
          giaVe: "",
        }}
        onSubmit={(values) => {
          console.log(values, "Sss");
        }}
      >
        {({ handleChange }) => {
          return (
            <Form style={{ width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <FormControl fullWidth className={classes.input}>
                      <InputLabel id="label">Chọn hệ thống rạp</InputLabel>
                      <Select value={selectHeThongRap} name="maHeThongRap" displayEmpty  onChange={handleChange} 
                       onBlur={event => {
                        event.target.name = 'maHeThongRap';
                        updateSelectHeThongRap(event);
                    }}
                      >
                      <MenuItem value="" disabled>Chọn hệ thống rạp</MenuItem>
                        <MenuItem value="Ten">Ten</MenuItem>
                        <MenuItem value="Twenty">Twenty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth className={classes.input}>
                      <InputLabel id="label">Chọn mã cụm rạp</InputLabel>
                      <Select value={selectMaCumRap} name="maCumRap" displayEmpty onChange={updateSelectMaCumRap} >
                      <MenuItem value="" disabled>Chọn mã cụm rạp</MenuItem>
                        <MenuItem value="mạnh">mạnh</MenuItem>
                        <MenuItem value="được">được</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth className={classes.input}>
                      <InputLabel id="label">Chọn mã rạp</InputLabel>
                      <Select value={selectMaRap} name="maRap" displayEmpty onChange={updateSelectMaRap} >
                      <MenuItem value="" disabled>Chọn mã rạp</MenuItem>
                        <MenuItem value="Ten">Ten</MenuItem>
                        <MenuItem value="Twenty">Twenty</MenuItem>
                      </Select>
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
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.input} fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Chọn hời lượng phim"
                        variant="outlined"
                        name="thoiLuong"
                        type="number"
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.input} fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Mã nhóm mặc định"
                        variant="outlined"
                        name="maNhom"
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.input} fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Giá vé"
                        variant="outlined"
                        type="number"
                        name="giaVe"
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                  Primary
                </Button>
              </Grid>
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
        >
          Tạo Lich Chiếu
        </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">
                Thông tin lịch chiếu phim của phim the flast
              </h2>
              <hr />
              <Grid container spacing={3}>
                {renderHtml()}
                <Grid item xs={12}>
                  <Button size="small" variant="contained" color="secondary">
                    Thêm Lich Chiếu
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <StickyHeadTable />
                </Grid>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
