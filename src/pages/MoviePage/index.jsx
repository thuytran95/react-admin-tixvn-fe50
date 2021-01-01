import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Typography, Box, Grid, makeStyles } from "@material-ui/core";

import { Loader } from "../../components/Loader";
import MovieList from "../../components/MovieList";
import { getMovieListRequest } from "../../redux/actions/movie.action";
import styles from "../../assets/jss/admin-jss/pages/moviePageStyle";

const useStyles = makeStyles(styles);

const MoviePage = (props) => {
  const classess = useStyles();
  const { loading, movieList } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieListRequest());
  }, []);

  const renderHTML = () => {
    if (loading) return <Loader />;
    if (movieList) {
      return (
        <div className={classess.container}>
          <Typography variant="h3" component="h1">
            <Box textAlign="center" m={5}>
              DANH SÁCH PHIM
            </Box>
          </Typography>
          <MovieList movieList={movieList} />
        </div>
      );
    }
  };

  return <>{renderHTML()}</>;
};

const mapStateToProps = (state) => {
  return { loading: state.movie.loading, movieList: state.movie.movieList };
};

export default connect(mapStateToProps)(MoviePage);
