import { colors } from "@material-ui/core";

const movieCardStyle = (theme) => ({
  root: {
    overflow: "hidden",
  },
  media: {
    height: 280,
  },
  typography: {
    color: colors.amber[700],
    padding: "5px 0 0 0",
  },
  deleteIcon: {
    color: colors.red[700],
  },
  textAlign: {
    textAlign: "justify",
  },
  typography_h2: {
    fontWeight: 700,
    height: "30px",
    lineHeight: "20px",
    display: "-webkit-box",
    webkitLineClamp: 2,
    overFlow: "hidden",
    textOverflow: "ellipsis",
  },

  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  description: {
    textAlign: "justify",
    padding: " 0 5px 0 0",
    lineHeight: "20px",
    display: "-webkit-box",
    webkitLineClamp: 2,
    overFlow: "hidden",
    textOverflow: "ellipsis",
    height: " 55px",
  },
});

export default movieCardStyle;
