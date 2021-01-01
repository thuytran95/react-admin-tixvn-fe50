import Dashboard from "../pages/Dashboard";
import MoviePage from "../pages/MoviePage";
import UserPage from "../pages/UserPage";

const routeAdmin = [
  { exact: true, path: "/", component: Dashboard },
  { exact: false, path: "/dashboard", component: Dashboard },
  { exact: false, path: "/users", component: UserPage },
  { exact: false, path: "/movies", component: MoviePage },
];

export { routeAdmin };
