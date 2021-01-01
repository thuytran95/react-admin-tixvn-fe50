import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { capitalizeWords } from "../../utils";
import format from "date-format";
import { makeStyles } from "@material-ui/core";
import styles from "../../assets/jss/admin-jss/components/movieItemStyle";

const useStyles = makeStyles(styles);

export default function MovieItem(props) {
  const {
    maPhim,
    tenPhim,
    biDanh,
    hinhAnh,
    trailer,
    moTa,
    maNhom,
    ngayKhoiChieu,
    danhGia,
  } = props.movie;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={hinhAnh}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.root}>
          <Typography
            className={classes.typography_h2}
            gutterBottom
            variant="h5"
            component="h1"
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
          >
            {moTa}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          <CreateIcon />
        </Button>
        <Button className={classes.deleteIcon} size="small">
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
