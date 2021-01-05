import React from "react";
import { Grid } from "@material-ui/core";
import MovieCard from "../MovieCard";
// import styles from "../../assets/jss/admin-jss/components/movieListStyle";

// const useStyles = makeStyles(styles);

export default function MovieList(props) {
  const { movieList } = props;
  // console.log(movieList);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <div>
      <Grid container>
        {movieList.map((movie, index) => {
          return (
            <Grid item sm={6} md={4} lg={3} key={index}>
              <MovieCard movie={movie} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
