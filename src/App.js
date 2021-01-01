import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import Login from "./pages/Login";

import PageNotFound from "./pages/PageNotFound";
import DashboardLayout from "./layout/DashboardLayout";
import { routeAdmin } from "./routes";
import { useEffect } from "react";
import { actTryLogin } from "./redux/actions/user.action";
import { connect } from "react-redux";

function App(props) {
  const showLayoutAdmin = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <DashboardLayout
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  };
  useEffect(() => {
    // console.log(props);
    props.fetchTryLogin(props.history);
  }, []);

  return (
    <>
      <Switch>
        {showLayoutAdmin(routeAdmin)}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dangky"></Route>
        <Route path="">
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTryLogin: (history) => {
      dispatch(actTryLogin(history));
    },
  };
};

const connectedComponent = connect(null, mapDispatchToProps)(App);

export default withRouter(connectedComponent);
