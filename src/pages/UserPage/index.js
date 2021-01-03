import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { FormikTextField } from "./FormikTextField";
import { FormikSelect } from "./FormikSelect";
import { Loader } from "../../components/Loader";
import {
  actAddUserRequest,
  actDeleteUserRequest,
  getUserListRequest,
} from "../../redux/actions/user.action";
import {
  Container,
  TablePagination,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  makeStyles,
  Card,
  Grid,
  colors,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "../../assets/jss/admin-jss/Page";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { capitalizeWords } from "../../utils";
import styles from "../../assets/jss/admin-jss/pages/userPageStyle";
import Toolbar from "./Toolbar";
import { signUpUserSchema } from "../../service/user.service";
import { dataSelect, radioList } from "./dataSelect";
import { FormikRadioGroup } from "./FormikRadioGroup";

const useStyles = makeStyles(styles);

function UserPage(props) {
  const { loading, userList, errAdd } = props;
  const classes = useStyles();

  // call API
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserListRequest());
  }, []);

  // set Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, userList?.length - page * rowsPerPage);

  // set initialvalue in formik
  const [initialValue, setInitialValue] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDt: "",
    maNhom: "GP01",
    email: "",
    maLoaiNguoiDung: "",
  });

  // set titleModal
  const [titleModal, setTitleModal] = useState({ header: "", action: "" });

  // handle modal
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setTitleModal({ header: "Thêm người dùng", action: "THÊM" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitleModal({ header: "", action: "" });
    setInitialValue({
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDt: "",
      maNhom: "GP01",
      email: "",
      maLoaiNguoiDung: "",
    });
  };

  const handleSubmit = (values) => {
    // console.log(values);
    //tim vi tri phan tu
    const findIndex = userList.findIndex(
      (user) => user.taiKhoan === values.taiKhoan
    );
    dispatch(actAddUserRequest(values));
    // console.log(findIndex);
    // if (findIndex !== -1) {
    // } else {
    //   setOpen(false);
    // }

    if (errAdd) {
      setOpen(false);
    }
  };

  const handleDelete = (values) => {
    console.log(values);
    dispatch(actDeleteUserRequest(values));
  };

  const renderUserPage = () => {
    if (loading) return <Loader />;
    if (userList)
      return (
        <Page className={classes.page} title="User page">
          <Container maxWidth={false}>
            <Toolbar handleClickOpen={handleClickOpen} />
            <Box mt={3}>
              <Card className={classes.root}>
                <PerfectScrollbar>
                  <Box minWidth={1050}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.thead}>
                            Mã loại người dùng
                          </TableCell>
                          <TableCell className={classes.thead} align="left">
                            Họ tên
                          </TableCell>
                          <TableCell className={classes.thead} align="left">
                            Tài khoản
                          </TableCell>
                          <TableCell className={classes.thead} align="left">
                            Email
                          </TableCell>

                          <TableCell className={classes.thead} align="left">
                            Quản lý
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userList
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((user, index) => {
                            const {
                              taiKhoan,
                              matKhau,
                              hoTen,
                              email,
                              soDt,
                              maNhom,
                              maLoaiNguoiDung,
                            } = user;
                            if (!maNhom) {
                              user.maNhom = "GP01";
                            }
                            return (
                              <TableRow key={index}>
                                <TableCell align="left">
                                  {user.maLoaiNguoiDung === "KhachHang"
                                    ? "Khách Hàng"
                                    : "Quản trị"}
                                </TableCell>
                                <TableCell align="left">
                                  {capitalizeWords(hoTen)}
                                </TableCell>
                                <TableCell align="left">{taiKhoan}</TableCell>
                                <TableCell align="left">{email}</TableCell>
                                <TableCell align="left">
                                  <EditIcon
                                    color="primary"
                                    onClick={() => {
                                      setTitleModal({
                                        header: "Cập nhật thông tin người dùng",
                                        action: "Cập nhật",
                                      });
                                      setInitialValue({
                                        taiKhoan,
                                        matKhau,
                                        hoTen,
                                        soDt,
                                        maNhom,
                                        email,
                                        maLoaiNguoiDung,
                                      });
                                      setOpen(true);
                                    }}
                                  />
                                  <DeleteIcon
                                    className={classes.deleteIcon}
                                    onClick={() => {
                                      handleDelete(taiKhoan);
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}

                        {emptyRows > 0 && (
                          <TableRow style={{ height: 62 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Box>
                </PerfectScrollbar>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 30]}
                  component="div"
                  count={userList?.length}
                  page={page}
                  onChangePage={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Card>
            </Box>
          </Container>
        </Page>
      );
  };
  return (
    <div>
      {renderUserPage()}
      <Dialog
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
            initialValues={initialValue}
            validationSchema={signUpUserSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form className={classes.root}>
                <Grid container style={{ width: "100%" }} spacing={2}>
                  <Grid item xs={12}>
                    <FormikTextField
                      name="hoTen"
                      label="Họ tên"
                      type="text"
                      onChange={formikProps.onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikTextField
                      onChange={formikProps.onChange}
                      name="email"
                      label="Email"
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikTextField
                      onChange={formikProps.onChange}
                      name="soDt"
                      label="Số điện thoại"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikTextField
                      onChange={formikProps.onChange}
                      name="taiKhoan"
                      label="Tài khoản"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikTextField
                      onChange={formikProps.onChange}
                      name="matKhau"
                      label="Mật khẩu"
                      type="password"
                    />
                  </Grid>
                </Grid>
                <FormikRadioGroup
                  onChange={formikProps.onChange}
                  className={classes.formControlRadio}
                  name="maLoaiNguoiDung"
                  items={radioList}
                  label="Mã loại người dùng"
                  required
                />
                <FormikSelect
                  onChange={formikProps.onChange}
                  name="maNhom"
                  items={dataSelect}
                  label="Mã nhóm"
                  required
                  value={initialValue.maNhom}
                />
                <div className={classes.buttonGroup}>
                  <Button type="submit" color="primary" variant="contained">
                    {titleModal.action}
                  </Button>

                  <Button
                    style={{
                      marginLeft: 10,
                      backgroundColor: colors.red[500],
                      color: "white",
                    }}
                    onClick={handleClose}
                    variant="contained"
                  >
                    Thoát
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    userList: state.user.userList,
    errAdd: state.user.errAdd,
  };
};

export default connect(mapStateToProps)(UserPage);