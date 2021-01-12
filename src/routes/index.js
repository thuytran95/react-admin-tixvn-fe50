import Dashboard from "../pages/Dashboard";
import UserPage from "../pages/UserPage";
import MoviePage from "../pages/MoviePage";

const routeAdmin = [
  { exact: true, path: "/", component: Dashboard },
  { exact: false, path: "/dashboard", component: Dashboard },
  { exact: false, path: "/users", component: UserPage },
  { exact: false, path: "/movies", component: MoviePage },
];

export { routeAdmin };
