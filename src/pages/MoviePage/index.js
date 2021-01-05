import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Page } from "../../assets/jss/admin-jss/Page";
import { Loader } from "../../components/Loader";
import Toolbar from "./Toolbar";
import { getMovieListRequest } from "../../redux/actions/movie.action";
import styles from "../../assets/jss/admin-jss/pages/moviePageStyle";
import MovieCard from "../../components/MovieCard";

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
        <Page title="Movies">
          <Container maxWidth={false}>
            <Toolbar />
            <Box mt={3}>
              <Grid container spacing={3}>
                {movieList?.map((movie) => (
                  <Grid item key={movie.maPhim} lg={3} md={4} xs={12}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Page>
      );
    }
  };

  return <>{renderHTML()}</>;
};

const mapStateToProps = (state) => {
  return { loading: state.movie.loading, movieList: state.movie.movieList };
};

export default connect(mapStateToProps)(MoviePage);
