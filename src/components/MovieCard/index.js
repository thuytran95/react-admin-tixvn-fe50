import React from "react";
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
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { capitalizeWords } from "../../utils";
import format from "date-format";
import movieCardStyle from "../../assets/jss/admin-jss/components/movieCardStyle";
import { useDispatch } from "react-redux";
import { actDeleteMovieRequest } from "../../redux/actions/movie.action";

const useStyles = makeStyles(movieCardStyle);

const MovieCard = (props) => {
  const { className, movie } = props;
  const { tenPhim, hinhAnh, moTa, ngayKhoiChieu, danhGia, maPhim } = movie;

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
        <Button size="small" color="primary">
          <CreateIcon />
        </Button>
        <Button
          className={classes.deleteIcon}
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

export default MovieCard;