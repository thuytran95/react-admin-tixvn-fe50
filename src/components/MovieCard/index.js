import React, { memo } from "react";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia,
  makeStyles,
  Typography,
  Button,
  colors,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { capitalizeWords } from "../../utils";
import format from "date-format";
import movieCardStyle from "../../assets/jss/admin-jss/components/movieCardStyle";
import { useDispatch } from "react-redux";
import { actDeleteMovieRequest } from "../../redux/actions/movie.action";
import CreateShowtimes from "../CreateShowtimes";
import { Link } from "react-router-dom";

const useStyles = makeStyles(movieCardStyle);

const MovieCard = (props) => {
  const {
    className,
    movie,
    setInitialValues,
    setTitleModal,
    setOpen,
    setImage,
  } = props;
  const {
    tenPhim,
    hinhAnh,
    moTa,
    ngayKhoiChieu,
    danhGia,
    maPhim,
    maNhom,
  } = movie;

  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(actDeleteMovieRequest(id));
  };

  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)}>
      <CardActionArea>
        <CardMedia className={classes.media} image={hinhAnh} title={moTa} />
        <CardContent className={classes.root}>
          <Typography
            className={classes.typography_h2}
            gutterBottom
            variant="h4"
          >
            {capitalizeWords(tenPhim)}
          </Typography>

          <Typography
            className={classes.typography}
            variant="subtitle1"
            component="p"
          >
            Ngày khởi chiếu: {format("dd-MM-yyyy", new Date(ngayKhoiChieu))}
          </Typography>
          <Typography
            style={{ marginBottom: "10px" }}
            className={classes.typography}
            variant="subtitle1"
            component="p"
          >
            Đánh giá: {danhGia}
          </Typography>

          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {moTa}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <CreateShowtimes maPhim={maPhim} maNhom={maNhom} tenPhim={tenPhim} />
        <Button style={{ fontSize: "10px", outline: "none", border: "none" }}>
          <Link
            style={{
              textDecoration: "none",
              color: colors.amber[500],
              lineHeight: "unset",
            }}
            to={`/showschedule/${maPhim}`}
          >
            <ScheduleIcon />
          </Link>
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            setInitialValues(movie);
            setTitleModal({
              header: "Cập nhật thông tin phim",
              action: "Cập nhật",
            });
            setImage(hinhAnh);
            setOpen(true);
          }}
        >
          <CreateIcon />
        </Button>

        <Button
          className={classes.deleteIcon}
          style={{ marginLeft: 0 }}
          size="small"
          onClick={() => {
            console.log(maPhim);
            handleDelete(maPhim);
          }}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default memo(MovieCard);
