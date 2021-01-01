import { colors } from "@material-ui/core";

const userPageStyle = (theme) => ({
  root: {},
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
});

export default userPageStyle;
