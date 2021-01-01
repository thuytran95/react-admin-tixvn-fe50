import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import { Loader } from "../../components/Loader";
import { getUserListRequest } from "../../redux/actions/user.action";
import {
  Container,
  TablePagination,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  makeStyles,
  Card,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "../../assets/jss/admin-jss/Page";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { capitalizeWords } from "../../utils";
import styles from "../../assets/jss/admin-jss/pages/userPageStyle";
import Toolbar from "./Toolbar";

const useStyles = makeStyles(styles);

function UserPage(props) {
  const { loading, userList } = props;
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

  // handel modal
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderUserPage = () => {
    if (loading) return <Loader />;
    if (userList)
      return (
        <Page className={classes.page} title="Users">
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
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((user, index) => (
                            <TableRow key={index}>
                              <TableCell align="left">
                                {user.maLoaiNguoiDung === "KhachHang"
                                  ? "Khách Hàng"
                                  : "Admin"}
                              </TableCell>
                              <TableCell align="left">
                                {capitalizeWords(user.hoTen)}
                              </TableCell>
                              <TableCell align="left">
                                {user.taiKhoan}
                              </TableCell>
                              <TableCell align="left">{user.email}</TableCell>
                              <TableCell align="left">
                                <EditIcon color="primary" />
                                <DeleteIcon className={classes.deleteIcon} />
                              </TableCell>
                            </TableRow>
                          ))}

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
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Thêm người dùng</DialogTitle>
        <DialogContent>
          <DialogContentText>them nguoi dung o day</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    userList: state.user.userList,
  };
};

export default connect(mapStateToProps)(UserPage);
