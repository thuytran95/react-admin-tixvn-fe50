import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },

  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },

  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },

  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const LayoutTheme = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <Navbar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardLayout({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => {
        if (localStorage.getItem("UserAdmin")) {
          return (
            <LayoutTheme>
              <Component {...propsComponent} />
            </LayoutTheme>
          );
        }
      }}
    />
  );
}
