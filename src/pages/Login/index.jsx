import React, { useState } from "react";
import { Loader } from "../../components/Loader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./style";
import { connect } from "react-redux";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import { actLoginApi } from "../../redux/actions/user.action";

function Login(props) {
  console.log(props);
  const classes = useStyles();

  const [admin, setAdmin] = useState({ taiKhoan: "", matKhau: "" });
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(admin);
    props.dispatch(actLoginApi(admin, history));
  };

  const renderLoginPage = () => {
    const { loading } = props;
    if (loading) return <Loader />;
    if (localStorage.getItem("UserAdmin")) return <Redirect to="/dashboard" />;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} color="primary">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Tài khoản"
              name="taiKhoan"
              autoComplete="taiKhoan"
              autoFocus
              onChange={(e) => setAdmin({ ...admin, taiKhoan: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="matKhau"
              label="Mật khẩu"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setAdmin({ ...admin, matKhau: e.target.value })}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ color: "white" }}
            >
              Đăng nhập
            </Button>
          </form>
        </div>
      </Container>
    );
  };

  return <>{renderLoginPage()}</>;
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    errLogin: state.user.errLogin,
  };
};

// const ConnectedComponent = connect(mapStateToProps)(Login);
// export default withRouter(ConnectedComponent);
export default connect(mapStateToProps)(Login);
