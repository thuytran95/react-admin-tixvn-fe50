import { colors } from "@material-ui/core";

const moviePageStyle = (theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    "& .MuiTypography-h6": {
      fontSize: "24px",
      color: theme.palette.primary.main,
      textTransform: "uppercase",
      textAlign: "center",
    },
    "& .MuiFormHelperText-root": {
      color: colors.red[500],
    },
  },
  movieCard: {
    height: "100%",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(3),
  },
});

export default moviePageStyle;
