import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { BarChart, AccountCircle, Movie } from "@material-ui/icons";

import NavItem from "./NavItem";

const user = {
  avatar: AccountCircle,
  name: "Quan tri",
};

const items = [
  {
    href: "/dashboard",
    icon: BarChart,
    title: "Trang chủ",
  },
  {
    href: "/users",
    icon: AccountCircle,
    title: "Quản lý người dùng",
  },
  {
    href: "/movies",
    icon: Movie,
    title: "Quản lý phim",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100%-64px)",
  },

  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const Navbar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = () => {
    return (
      <Box height="100%" display="flex" flexDirection="column">
        <Box alignItems="center" display="flex" flexDirection="column" p={2}>
          <Avatar
            className={classes.avatar}
            component={RouterLink}
            src={user.avatar}
            to="/admin/dashboard"
          />
          <Typography className={classes.name} color="textPrimary" variant="h5">
            {user.name}
          </Typography>
        </Box>
        <Divider />
        <Box p={2}>
          <List>
            {items.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content()}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content()}
        </Drawer>
      </Hidden>
    </>
  );
};

Navbar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

Navbar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default Navbar;
