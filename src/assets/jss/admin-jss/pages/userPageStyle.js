import { colors } from "@material-ui/core";

const userPageStyle = (theme) => ({
  root: {
    "& .MuiFormHelperText-root": {
      color: colors.red[500],
    },
    "& .MuiTypography-h6": {
      fontSize: "24px",
      color: theme.palette.primary.main,
      textTransform: "uppercase",
      textAlign: "center",
    },
  },
  page: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  thead: {
    fontWeight: 600,
  },

  deleteIcon: {
    color: colors.red[500],
  },

  formControlRadio: {
    display: "block",
    marginTop: theme.spacing(1.5),
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default userPageStyle;
