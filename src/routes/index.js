import Dashboard from "../pages/Dashboard";
import UserPage from "../pages/UserPage";
import MoviePage from "../pages/MoviePage";
import MovieSchedule from "../pages/MovieSchedule";

const routeAdmin = [
  { exact: true, path: "/", component: Dashboard },
  { exact: false, path: "/dashboard", component: Dashboard },
  { exact: false, path: "/users", component: UserPage },
  { exact: false, path: "/movies", component: MoviePage },
  { exact: false, path: "/movie-schedule", component: MovieSchedule },
];

export { routeAdmin };
