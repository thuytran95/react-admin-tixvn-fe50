import React, { useState } from "react";
import { connect } from "react-redux";
import { Link as RouterLink, withRouter } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Hidden,
  Box,
  AppBar,
  Badge,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import { NotificationsOutlined, Menu } from "@material-ui/icons";
import Logo from "../../assets/jss/admin-jss/Logo";
import { actLogout } from "../../redux/actions/user.action";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

const TopBar = (props) => {
  // console.log(props);
  const { onMobileNavOpen, fetchTryLogout } = props;
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar className={clsx(classes.root)} elevation={0}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsOutlined />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => fetchTryLogout(props.history)}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTryLogout: (history) => {
      dispatch(actLogout(history));
    },
  };
};

const ConnectedComponent = connect(null, mapDispatchToProps)(TopBar);

export default withRouter(ConnectedComponent);
